const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const prompt = require('prompt-sync')();
const serviceAccount = require('C:/Users/drbx3/Documents/Fall 2023-2024/alltimehoops/basketballstats-f03ae-firebase-adminsdk-983h4-6d9d2ff860.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const nba_awards = db.collection('nba_awards');

let year = 1951;

let championship = '';

let finalsMVP = '';

let regularSeasonMVP = '';

let rookieOfTheYear = '';

let allStarEastTeams = {};

let allStarWestTeams = {};

let allNBAFirstTeams = {};

let allNBASecondTeams = {};

let allNBAThirdTeams = {};

let offseasonMoves = {};

while (year != -1) {
    console.log("Year: " + year + ". Is this okay? (y/n)");
    let response = prompt('Response:');
    if (response === 'n') {
      break;
    }

    console.log("Who won the Chip?");
    championship = prompt('Championship:');

    console.log("Who won the Finals MVP?");
    finalsMVP = prompt('Finals MVP:');

    console.log("Who won the Regular Season MVP?");
    regularSeasonMVP = prompt('Regular Season MVP:');

    console.log("Who won the Rookie of the Year?");
    rookieOfTheYear = prompt('Rookie of the Year:');

    console.log("Who made the All-NBA First Team?");
    while (true) {
      let player = prompt('Player:');
      if (player === '') {
        break;
      }
      allNBAFirstTeams.push(player);
    }

    console.log("Who made the All-NBA Second Team?");
    while (true) {
      let player = prompt('Player:');
      
      if (player === '') {
        break;
      }
      allNBASecondTeams.push(player);
    }

    console.log("Who made the All-NBA Third Team?");
    while (true) {
      let player = prompt('Player:');
      if (player === '') {
        break;
      }
      allNBAThirdTeams.push(player);
    }

    console.log("Who made the All-Star Eastern Team?");
    
    while (true) {
      let player = prompt('Player:');
      if (player === '') {
        break;
      }
      allStarEastTeams.push(player);
    }

    console.log("Who made the All-Star Western Team?");

    while (true) {
      let player = prompt('Player:');
      if (player === '') {
        break;
      }
      allStarWestTeams.push(player);
    }

    console.log("What were the offseason moves?");
    
    while (true) {
      console.log("Who was traded? -1 to exit.");
      let player = prompt('Player:');
      if (player == -1) {
        break;
      }
      console.log("What Team did they go to?");
      let team = prompt('Team:');

      console.log("Main Description of the trade?");
      let description = prompt('Description:');

      offseasonMoves.push({player, team, description});

      
    }

    const yearRef = nba_awards.doc(year.toString());

    setData(finalsMVP, mvp, rookieOfTheYear, allStarEastTeams, allStarWestTeams, allNBAFirstTeams, allNBASecondTeams, allNBAThirdTeams, offseasonMoves);

    year++;
}

async function setData(championship, fmvp, mvp, roty, anba_f, anba_s, anba_t, astar_east, astar_west, offseason_moves) {
  const yearRef = nba_awards.doc(year.toString());

  await yearRef.set({
    championship: championship,
    fmvp: fmvp,
    mvp: mvp,
    roty: roty,
    anba_f: anba_f,
    anba_s: anba_s,
    anba_t: anba_t,
    astar_east: astar_east,
    astar_west: astar_west,
    offseason_moves: offseason_moves
  });
}