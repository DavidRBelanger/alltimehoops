const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

// THIS IS FOR LAPTOP const serviceAccount = require('C:/Users/drbx3/Documents/Fall 2023-2024/alltimehoops/basketballstats-f03ae-firebase-adminsdk-983h4-6d9d2ff860.json');
// THIS IS FOR PC 
const serviceAccount = require('C:/Users/drbx3/Documents/VSProjects/alltimehoops/basketballstats-f03ae-firebase-adminsdk-983h4-8fbf803424.json');
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const collectionRef = db.collection('nba_awards');

const readlineSync = require('readline-sync');


async function writeData() {
  let MVP = "";
  let fMVP = "";
  let champ = "";
  let ROTY = "";

  let year1 = 1951;

  let year2 = 2023;
  let options = {
    limit: /^([^\n]*\n){5}[^\n]*$/,
    limitMessage: 'Input must be exactly 6 lines'
  };


  for (let i = year1; i <= year2; i++) {

    // Collect user input
    MVP = readlineSync.question("Who was the MVP of the NBA in " + i + "? ");
    fMVP = readlineSync.question("Who was the Finals MVP of the NBA in " + i + "? ");
    champ = readlineSync.question("Who won the NBA Championship in " + i + "? ");
    ROTY = readlineSync.question("Who was the Rookie of the Year in the NBA in " + i + "? ");

    let player;
    while (true) {
      player = readlineSync.question("Enter a player for the All-NBA First Team (or -1 to finish): ");
      if (player === '-1') break;
      all_nba_first_team.push(player);
    }
    player = "";
    while (true) {
      player = readlineSync.question("Enter a player for the All-NBA First Team (or -1 to finish): ");
      if (player === '-1') break;
      all_nba_second_team.push(player);
    }
    // Create document reference
    const docRef = collectionRef.doc(i.toString());

    // Use async/await to wait for data writing
    try {
      await docRef.set({
        MVP: MVP,
        fMVP: fMVP,
        champ: champ,
        ROTY: ROTY,
        all_nba_first_team: all_nba_first_team,
        all_nba_second_team: all_nba_second_team
      });
      console.log("Data written for year", i);
    } catch (error) {
      console.error("Error writing document for year", i, error);
    }
  }
}


writeData().catch(error => console.error(error));