const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = require('C:/Users/drbx3/Documents/Github/alltimehoops/basketballstats-f03ae-firebase-adminsdk-983h4-6d9d2ff860.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const collectionRef = db.collection('nba_allstars');

let rawData = fs.readFileSync('C:\\Users\\drbx3\\Downloads\\All-Star Selections.json');
let data = JSON.parse(rawData);

async function writeData() {
    let yearData = {};

    for (let i = 0; i < data.length; i++) {
        let player = data[i];
        let year = player.season;

        if (!year) {
            
            continue;
        }

        if (!yearData[year]) {
            yearData[year] = [];
        }


        yearData[year].push(player);
    }

    for (let year in yearData) {
        const docRef = collectionRef.doc(year);

        const doc = await docRef.get();

        if (!doc.exists) {
            await docRef.set({ players: yearData[year] });
        } else {
            await docRef.update({ players: yearData[year] });
        }

        
    }
}

writeData().catch(error => console.error(error));