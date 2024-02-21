const headers = new Headers({
    "Content-Type": "application/json",
    'Host': 'stats.nba.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:61.0) Gecko/20100101 Firefox/61.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Referer': 'https://stats.nba.com/',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'x-nba-stats-origin': 'stats',
    'x-nba-stats-token': 'true'
})

const options = {
    method: 'GET',
    headers,
}

  async function getYearData(year, category) {
    console.log("getYearData called")
    let fullYear = year + "-" + (year + 1).toString().slice(-2); //changes year to be in xxxx-xx format
      await fetch(`https://stats.nba.com/stats/leagueleaders?ActiveFlag=&LeagueID=00&PerMode=Totals&Scope=S&Season=${year}&SeasonType=Regular+Season&StatCategory=${category}`, options) 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log("finished fetching data");
        })
        .catch(error => {
            console.error('Error:', error.message);
            console.log("error should've been thrown")
        });
    console.log("finished running");
}