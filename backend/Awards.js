const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = require('C:/Users/drbx3/Documents/Github/alltimehoops/basketballstats-f03ae-firebase-adminsdk-983h4-6d9d2ff860.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const collectionRef = db.collection('nba_awards');

// Read the JSON file
let rawData = fs.readFileSync('C:\\Users\\drbx3\\Downloads\\csvjson.json');
let data = JSON.parse(rawData);

async function writeData() {
  for (let i = 0; i < data.length; i++) {
    if (data[i]['winner'] === "TRUE") {
      const docRef = collectionRef.doc((data[i]['season'] - 1).toString());
      let awardData = {};
      awardData[data[i]['award']] = data[i];
      try {
        await docRef.set(awardData, { merge: true });
        
      } catch (error) {
        console.error("Error writing document for year", data[i]['season'], error);
      }
    }
  }
}

writeData().catch(error => console.error(error));