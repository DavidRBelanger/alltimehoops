import requests
import json
from google.cloud import firestore

db = firestore.Client()

basicStats = ['PTS', 'REB', 'AST', 'BLK', 'STL']

advancedStats = ['GP', 'MIN', 'FGM', 'FGA', 'FG3M', 'FG3A', 'FTM', 'FTA', 'FT_PCT', 'FG3_PCT', 'TOV', 'EFF']

years = range(1946, 1951) # CHANGE RANGE HERE TO UPDATE LIST!

perModes = ['Totals', 'PerGame']

for year in years:
    for perMode in perModes:
        for stat in basicStats:
            response = requests.get(f"https://stats.nba.com/stats/leagueleaders?LeagueID=00&PerMode={perMode}&Scope=S&Season={year}-{str(year+1)[-2:]}&SeasonType=Regular+Season&StatCategory={stat}")
            print(response.status_code)
            try:
                data = response.json()
            except json.decoder.JSONDecodeError: # If the response is not JSON
                print("Failed to decode JSON from response")
                continue
            playerStats = data['resultSet']['rowSet']
            if playerStats:
                leader = playerStats[0]
                leaderDictionary = dict(zip(data['resultSet']['headers'], leader))
                leaderDoc = db.collection('nba_leaders2').document(str(year)).collection(f"{perMode}_{stat}_Leader").document(f"{perMode}_{stat}_Leader")
                leaderDoc.set({ # Add the leader to the firestore database
                    'name': leaderDictionary['PLAYER'],
                    'value': leaderDictionary[stat]
                })
                print(f"Added {year} {perMode} {stat} leader to Firestore.")

    for stat in advancedStats:
        response = requests.get(f"https://stats.nba.com/stats/leagueleaders?LeagueID=00&PerMode=Totals&Scope=S&Season={year}-{str(year+1)[-2:]}&SeasonType=Regular+Season&StatCategory={stat}")
        print(response.status_code)
        try:
            data = response.json()
        except json.decoder.JSONDecodeError:
            print("Failed to decode JSON from response")
            continue
        playerStats = data['resultSet']['rowSet']
        if playerStats:
            leader = playerStats[0]
            leaderDictionary = dict(zip(data['resultSet']['headers'], leader)) # dictionary from headers and data
            leaderDoc = db.collection('nba_leaders2').document(str(year)).collection(f"Totals_{stat}_Leader").document(f"Totals_{stat}_Leader")
            leaderDoc.set({
                'name': leaderDictionary['PLAYER'],
                'value': leaderDictionary[stat]
            })
            print(f"Added {year} Totals {stat} leader to Firestore.")