// Purpose: This file contains the functions that are used to fetch data from the API.


function getPlayers(name) {
    let players = getPlayersFromAPI(name);
    console.log(players);
}

//this is used to get the list of players from API given their name.
//the api automatically handles the search feature
function getPlayersFromAPI(name) {
    let players = [];
    fetch('https://www.balldontlie.io/api/v1/players?per_page=10search=' + name)
        .then(response => response.json())
        .then(data => {
            players = data.data;
        }
        )
    return players;
}


