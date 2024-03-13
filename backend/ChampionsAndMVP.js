const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = require('C:/Users/drbx3/Documents/Fall 2023-2024/alltimehoops/basketballstats-f03ae-firebase-adminsdk-983h4-6d9d2ff860.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const collectionRef = db.collection('nba_champions_mvps');


let rawData = fs.readFileSync('C:/Users/drbx3/Downloads/NBA Finals and MVP.json');
let data = JSON.parse(rawData);

async function writeData() {
  for (let year in data) {
    // Create firebase docref
    const docRef = collectionRef.doc(data[year]['Year'].toString());

    try {
      await docRef.set(data[year]);
      
    } catch (error) {
      console.error("Error writing document for year", data[year]['Year'], error);
    }
  }
}

writeData().catch(error => console.error(error));