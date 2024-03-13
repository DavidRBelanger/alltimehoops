

// LIBRARY IMPORTS
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeNotableOccurrences(year) {
    try {
        const url = `https://en.wikipedia.org/wiki/${year}%E2%80%93${(year + 1).toString().slice(-2)}_NBA_season`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const sectionHeading = $('span#Notable_occurrences');
        const section = sectionHeading.parent();
        const notableOccurrencesList = section.nextUntil('h2').filter('ul');
        const notableOccurrences = [];
        notableOccurrencesList.find('li').each((index, element) => {
            const notation = $(element).text().trim();
            notableOccurrences.push(notation); //adds 
        });
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

scrapeAllSeasons()
    .then(results => {
        results.forEach(({ year, notableOccurrences, error }) => {
            if (error) {
                
            } else {
                
                notableOccurrences.forEach(notation => 
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
