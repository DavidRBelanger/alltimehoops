import getPlayers from './functions.js';

function App() {
  return (
    <div className="App">
      <input id="input-field"></input>
      <button onClick={getPlayers('davis')}>Get Davis</button>
    </div>
  );
}

function PlayerList() {
  return (
    <div>
      <h1>Player List</h1>
    </div>
  );
}

function Player() {

  return (
    <div>
      
    </div>
  );
}

export default App;
