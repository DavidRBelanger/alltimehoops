from nba_api.stats.endpoints import playercareerstats, commonallplayers
from firebase_admin import credentials, firestore
import firebase_admin
import time
import pandas as pd


def calculate_career_averages(career_data):
    # Convert list of dicts to DataFrame
    career_df = pd.DataFrame(career_data)

    # Calculate the mean of each numeric column
    career_averages = career_df.select_dtypes(include=[pd.number]).mean()

    # Calculate percentages
    career_averages['FG_PCT'] = career_df['FGM'].sum() / career_df['FGA'].sum() if career_df['FGA'].sum() != 0 else 0
    career_averages['FG3_PCT'] = career_df['FG3M'].sum() / career_df['FG3A'].sum() if career_df['FG3A'].sum() != 0 else 0
    career_averages['FT_PCT'] = career_df['FTM'].sum() / career_df['FTA'].sum() if career_df['FTA'].sum() != 0 else 0

    # Convert Series to dict
    return career_averages.to_dict()


# Load the service account key
credentials_path = 'C:/Users/drbx3/Documents/VSProjects/alltimehoopsbackup/basketballstats-f03ae-firebase-adminsdk-kibsb-116082bca7.json'
cred = credentials.Certificate(credentials_path)

# Initialize the Firebase Admin SDK
app = firebase_admin.initialize_app(cred)

# Get a reference to the Firestore service
db = firestore.client()

# Get all players
all_players = commonallplayers.CommonAllPlayers().get_data_frames()[0]

for index, player in all_players.iterrows():
    print(f"Fetching data for player {player['DISPLAY_FIRST_LAST']}...")

    try:
        # Get player career stats
        career = playercareerstats.PlayerCareerStats(player_id=player['PERSON_ID'])
        career_df = career.get_data_frames()[0]

        # Convert DataFrame to list of dicts
        career_data = career_df.to_dict('records')

        # Calculate career averages
        career_averages = calculate_career_averages(career_data)

        # Upload data to Firestore
        player_doc = db.collection('player_career_averages').document(player['DISPLAY_FIRST_LAST'])
        player_doc.set({
            "seasons": career_data,
            "career_averages": career_averages  # Add career averages to the document
        })

        print(f"Uploaded data for player {player['DISPLAY_FIRST_LAST']} to Firestore")

    except Exception as e:
        print(f"Error fetching data for player {player['DISPLAY_FIRST_LAST']}: {e}")

    # Sleep to avoid hitting rate limits
    time.sleep(0.2)

