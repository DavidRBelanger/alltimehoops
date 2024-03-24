from nba_api.stats.endpoints import shotchartleaguewide
from firebase_admin import credentials, firestore
import firebase_admin
import pandas as pd
import time

# Assuming creds are defined elsewhere (e.g., separate config file)
# Replace with your actual credentials path
credentials_path = 'C:/Users/drbx3/Documents/Github/alltimehoops/basketballstats-f03ae-firebase-adminsdk-kibsb-7c4fc56f29.json'


def get_shot_chart_data(season):
  try:
    shot_chart = shotchartleaguewide.ShotChartLeagueWide(season=season, league_id='00')
    chart_df = shot_chart.get_data_frames()[0]

    # Upload all data points (assuming no filtering needed)
    shot_data = chart_df.to_dict('records')

    return shot_data
  except Exception as e:  # Catch any errors occurring within this function
    print(f"Error retrieving data for season {season}: {e}")
    return None  # Return None to indicate an error and skip data upload


# Load the service account key
cred = credentials.Certificate(credentials_path)

# Initialize the Firebase Admin SDK
app = firebase_admin.initialize_app(cred)

# Get a reference to the Firestore service
db = firestore.client()

seasons = range(1996, 2023)

for year in seasons:
  season = f"{year}-{str(year+1)[2:]}"

  print("Fetching shot chart data...")
  shot_data_by_area = get_shot_chart_data(season)

  if shot_data_by_area is not None:  # Only proceed if data was retrieved successfully
    print("Uploading data to Firestore...")
    season_doc = db.collection('shot_charts').document(season)
    season_doc.set({"shots": shot_data_by_area})

    print(f"Uploaded shot chart data for season {season} to Firestore")

  print("Sleeping for 600 ms...")
  time.sleep(0.6)  # Sleep for 600 ms to avoid hitting rate limits
