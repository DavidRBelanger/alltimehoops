from nba_api.stats.endpoints import shotchartdetail
from firebase_admin import credentials, firestore
import firebase_admin
import pandas as pd
import json


credentials_path = 'C:\\Users\\drbx3\\Documents\\VSProjects\\alltimehoops\\Keys\\basketballstats-f03ae-firebase-adminsdk-kibsb-f21440148b.json'

cred = credentials.Certificate(credentials_path)

app = firebase_admin.initialize_app(cred)

db = firestore.client()

def get_shots_data(season):
    shot_chart = shotchartdetail.ShotChartDetail(
        team_id=0, 
        player_id=0, 
        season_type_all_star='Regular Season', 
        season_nullable=season  
    )

    shot_data = shot_chart.get_data_frames()[0]

    made_shots = shot_data[shot_data['SHOT_MADE_FLAG'] == 1]

    location_counts = made_shots.groupby(['LOC_X', 'LOC_Y']).size()

    location_counts_df = location_counts.reset_index()

    location_counts_df.rename(columns={0: 'SHOT_COUNT'}, inplace=True)

    location_counts_df.sort_values('SHOT_COUNT', ascending=False, inplace=True)

    location_counts_df = location_counts_df.head(200)

    shots_dict = location_counts_df.to_dict('records')

    return shots_dict

seasons = range(2022, 2023)  

for year in seasons:
    season = f"{year}-{str(year+1)[2:]}"
    try:
        print(f"Fetching shot data for season {season}...")
        shots_data = get_shots_data(season)

        print("Uploading data to Firestore...")
        season_doc = db.collection('nba_shots').document(str(year))
        season_doc.set({"shots": shots_data})

        print(f"Uploaded shot data for season {season} to Firestore")
    except json.JSONDecodeError:
        print(f"Failed to fetch data for season {season}")