

// WEB SCRAPING IMPORTS
const axios = require('axios');
const cheerio = require('cheerio');

// FIREBASE IMPORTS

const { initializeApp , applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// THIS IS FOR LAPTOP
const serviceAccount = require('C:/Users/drbx3/Documents/Fall 2023-2024/alltimehoops/basketballstats-f03ae-firebase-adminsdk-983h4-6d9d2ff860.json');

// THIS IS FOR PC
//const serviceAccount = require('C:/Users/drbx3/Documents/VSProjects/alltimehoops/basketballstats-f03ae-firebase-adminsdk-983h4-8fbf803424.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const collectionRef = db.collection('nba_summaries');



async function scrapeNotableOccurrences(year) { //async function that scrapes a given year's notable occurences
    try {

        //gets the current year's url
        const url = `https://en.wikipedia.org/wiki/${year}%E2%80%93${(year + 1).toString().slice(-2)}_BAA_season`; 
        
        //gets the response from the url
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        //gets the section header
        const sectionHeading = $('span#Notable_occurrences');
        const section = sectionHeading.parent();
        const notableOccurrencesList = section.nextUntil('h2').filter('ul');

        //array of the occurrences
        const notableOccurrences = [];
        notableOccurrencesList.find('li').each((index, element) => {
            const notation = removeBrackets($(element).text().trim());
            notableOccurrences.push(notation);  
        });

        //returns the year and the occurences
        return { year, notableOccurrences };
    } catch (error) {
        console.error(`Error fetching or parsing data for ${year}:`, error);
        return { year, error: 'Data not available' };
    }
}


function removeBrackets(text) {
    return text.replace(/\[\d+\]/g, '');
}


async function scrapeAllSeasons() {
    const startYear = 1946;
    const endYear = 1948;

    const promises = [];
    for (let year = startYear; year <= endYear; year++) {
        promises.push(scrapeNotableOccurrences(year));
    }

    return Promise.all(promises);
}

scrapeAllSeasons()
    .then(results => {
        results.forEach(({ year, notableOccurrences, error }) => {
            if (error) {
                
            } else {
                
                const docRef = collectionRef.doc(year.toString());
                docRef.set({ notableOccurrences });
                
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
