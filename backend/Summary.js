

// LIBRARY IMPORTS
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeNotableOccurrences(year) { //async function that scrapes a given year's notable occurences
    try {

        //gets the current year's url
        const url = `https://en.wikipedia.org/wiki/${year}%E2%80%93${(year + 1).toString().slice(-2)}_NBA_season`; 
        
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
            const notation = $(element).text().trim();
            notableOccurrences.push(notation);  
        });

        //returns the year and the occurences
        return { year, notableOccurrences };
    } catch (error) {
        console.error(`Error fetching or parsing data for ${year}:`, error);
        return { year, error: 'Data not available' };
    }
}

async function scrapeAllSeasons() {
    const startYear = 1951;
    const endYear = 2022;

    const promises = [];
    for (let year = startYear; year <= endYear; year++) {
        promises.push(scrapeNotableOccurrences(year));
    }

    return Promise.all(promises);
}



//EXAMPLE USAGE!!
scrapeAllSeasons()
    .then(results => {
        results.forEach(({ year, notableOccurrences, error }) => {
            if (error) {
                console.log(`No data available for ${year}`);
            } else {
                console.log(`Notable Occurrences for the ${year}–${year + 1} NBA season:`);
                notableOccurrences.forEach(notation => console.log(notation));
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
