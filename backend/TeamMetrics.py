# THIS CODE IS UNUSED, DOESN'T CONTAIN DATA FROM 1951-1996, AND IS NOT USED IN THE PROJECT


from nba_api.stats.endpoints import leaguedashteamstats
from google.cloud import firestore
import time

db = firestore.Client()

years = range(1951, 2023) # CHANGE RANGE HERE TO UPDATE LIST!

for year in years:
    print('year:', year)
    season = f"{year}-{str(year+1)[2:]}"  # format the season as "YYYY-YY"
    team_stats = leaguedashteamstats.LeagueDashTeamStats(season=season)
    team_stats_data = team_stats.get_data_frames()[0]
    if not team_stats_data.empty:
        team_stats_data = team_stats_data[['TEAM_ID', 'W', 'L', 'W_PCT', 'MIN', 'FGM', 'FGA', 'FG_PCT', 'FG3M', 'FG3A', 'FG3_PCT', 'FTM', 'FTA', 'FT_PCT', 'OREB', 'DREB', 'REB', 'AST', 'TOV', 'STL', 'BLK', 'PTS', 'OFF_RATING', 'DEF_RATING']].to_dict('records')
        stats_doc = db.collection('nba_metrics').document(str(year))
        stats_doc.set({ # Add the stats to the firestore database
            'teamStats': team_stats_data,
        })
        print(f"Added {year} team stats to Firestore.")
    time.sleep(0.25)  # to avoid hitting rate limits