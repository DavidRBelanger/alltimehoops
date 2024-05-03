from nba_api.stats.endpoints import leaguestandings
from google.cloud import firestore

db = firestore.Client()

years = range(1951, 2023) 

for year in years:
    standings = leaguestandings.LeagueStandings(season=str(year))
    standings_data = standings.get_data_frames()[0]
    if not standings_data.empty:
        eastern_standings = standings_data[standings_data['Conference'] == 'East'][['TeamName', 'WINS', 'LOSSES', 'PlayoffRank', 'WinPCT']].to_dict('records')
        western_standings = standings_data[standings_data['Conference'] == 'West'][['TeamName', 'WINS', 'LOSSES', 'PlayoffRank', 'WinPCT']].to_dict('records')
        standings_doc = db.collection('nba_standings').document(str(year))
        standings_doc.set({ 
            'easternStandings': eastern_standings,
            'westernStandings': western_standings
        })
        print(f"Added {year} standings to Firestore.")