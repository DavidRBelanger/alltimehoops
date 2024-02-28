const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('C:/Users/drbx3/Documents/Fall 2023-2024/alltimehoops/basketballstats-f03ae-firebase-adminsdk-983h4-6d9d2ff860.json');

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

  let all_nba_first_team = [];

  let all_nba_second_team = [];

  let year1 = 1951;

  let year2 = 2023;


  for (let i = year1; i <= year2; i++) {
    // Open Wikipedia page in a separate process (unchanged)

    // Collect user input
    MVP = readlineSync.question("Who was the MVP of the NBA in " + i + "?");
    fMVP = readlineSync.question("Who was the Finals MVP of the NBA in " + i + "?");
    champ = readlineSync.question("Who won the NBA Championship in " + i + "?");
    ROTY = readlineSync.question("Who was the Rookie of the Year in the NBA in " + i + "?");

    let userInput = "";
    while (userInput !== "-1") {
      const name = readlineSync.question("Enter the name for All-NBA First Team in " + i + ": ");
      const team = readlineSync.question("Enter the team for All-NBA First Team in " + i + ": ");
      all_nba_first_team.push({ name, team });
      userInput = readlineSync.question("Enter -1 to stop or any other key to continue: ");
    }

    userInput = "";
    while (userInput !== "-1") {
      const name = readlineSync.question("Enter the name for All-NBA Second Team in " + i + ": ");
      const team = readlineSync.question("Enter the team for All-NBA Second Team in " + i + ": ");
      all_nba_second_team.push({ name, team });
      userInput = readlineSync.question("Enter -1 to stop or any other key to continue: ");
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