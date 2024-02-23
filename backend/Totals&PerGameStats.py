# This script is used to update the firebase firestore database
# The years range must be changed from 2023-2024 to update the 
# next year.
#
# GOOGLE_CREDENTIALS needed, file is on .gitignore, ask @davidrbelanger for it.
#
# Created February 23rd 2024

import requests
import json
from google.cloud import firestore

db = firestore.Client()

basic_stats = ['PTS', 'REB', 'AST', 'BLK', 'STL']

advanced_stats = ['GP', 'MIN', 'FGM', 'FGA', 'FG3M', 'FG3A', 'FTM', 'FTA', 'FT_PCT', 'FG3_PCT', 'TOV', 'EFF']

years = range(1951, 2023) # CHANGE RANGE HERE TO UPDATE LIST!

per_modes = ['Totals', 'PerGame']

for year in years:
    year_doc = db.collection('nba_leaders').document(str(year))
    for per_mode in per_modes:
        for stat in basic_stats:
            response = requests.get(f"https://stats.nba.com/stats/leagueleaders?LeagueID=00&PerMode={per_mode}&Scope=S&Season={year}-{str(year+1)[-2:]}&SeasonType=Regular+Season&StatCategory={stat}")
            print(response.status_code)
            print(response.text)
            try:
                data = response.json()
            except json.decoder.JSONDecodeError:
                print("Failed to decode JSON from response")
                continue
            player_stats = data['resultSet']['rowSet']
            if player_stats:
                leader = player_stats[0]
                leader_dict = dict(zip(data['resultSet']['headers'], leader))
                stat_doc = year_doc.collection(f"{per_mode}_{stat}_Leader").document()
                stat_doc.set({
                    'name': leader_dict['PLAYER'],
                    'value': leader_dict[stat]
                })
                print(f"Added {year} {per_mode} {stat} leader to Firestore.")

    for stat in advanced_stats:
        response = requests.get(f"https://stats.nba.com/stats/leagueleaders?LeagueID=00&PerMode=Totals&Scope=S&Season={year}-{str(year+1)[-2:]}&SeasonType=Regular+Season&StatCategory={stat}")
        print(response.status_code)
        try:
            data = response.json()
        except json.decoder.JSONDecodeError:
            print("Failed to decode JSON from response")
            continue
        player_stats = data['resultSet']['rowSet']
        if player_stats:
            leader = player_stats[0]
            leader_dict = dict(zip(data['resultSet']['headers'], leader))
            stat_doc = year_doc.collection(f"Totals_{stat}_Leader").document()
            stat_doc.set({
                'name': leader_dict['PLAYER'],
                'value': leader_dict[stat]
            })
            print(f"Added {year} Totals {stat} leader to Firestore.")