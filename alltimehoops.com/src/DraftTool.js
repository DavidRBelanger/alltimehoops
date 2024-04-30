import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import Nav from './Components/Nav.js';
import './Styles/DraftTool.css';

let players = [];

function searchPlayers(name) {
  let results = [];
  players.forEach((player) => {
    if (player.name.toLowerCase().includes(name.toLowerCase())) {
      results.push(player);
    }
  });
  return results;
}

const Draft = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const collectionRef = collection(firestore, 'nba_players');
    getDocs(collectionRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        players.push(doc.data());
      });
    });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchResults(searchPlayers(searchTerm));
  };

  return (
    <div id="main-draft-container">
      <Nav Title="Draft Tool" />
      <div id="main-container">
        <div id="players-container">
          <h2>Players</h2>
          <form onSubmit={handleSearch}>
            <input type="text" placeholder="Player Name..." onChange={e => setSearchTerm(e.target.value)}/>
            <input type="submit" value="Search"/>
          </form>
          <div id="players-list-container">
            {searchResults.map((player, index) => (
              <div key={index}>{player.name}</div>
            ))}
          </div>
        </div>
        <div id="draft-container">
          <h2>Draft</h2>
        </div>
      </div>
    </div>
  )
};

export default Draft;