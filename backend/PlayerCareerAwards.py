from nba_api.stats.endpoints import playercareerstats, playerawards
from nba_api.stats.static import players
from firebase_admin import credentials, firestore, initialize_app
import numpy as np

# Load the service account key
credentials_path = 'C:/Users/drbx3/Documents/VSProjects/alltimehoopsbackup/basketballstats-f03ae-firebase-adminsdk-kibsb-116082bca7.json'
cred = credentials.Certificate(credentials_path)

# Initialize the Firebase Admin SDK
app = initialize_app(cred)

# Get a reference to the Firestore service
db = firestore.client()

# Get a list of all players
all_players = players.get_players()

for player in all_players:
    print(f"Calculating averages and fetching awards for player {player['full_name']}...")

    try:
        # Fetch player career stats
        career_stats = playercareerstats.PlayerCareerStats(player_id=player['id'])

        # Get career totals regular season data
        career_totals_regular_season = career_stats.career_totals_regular_season.get_data_frame()

        # Convert the DataFrame to a dictionary
        stats_dict = career_totals_regular_season.to_dict('records')[0]

        # Calculate averages for numerical columns
        averages_dict = {key: value / stats_dict['GP'] for key, value in stats_dict.items() if isinstance(value, (int, float, np.number))}

        # Fetch player awards
        awards = playerawards.PlayerAwards(player_id=player['id'])

        # Get awards data
        awards_data = awards.get_data_frames()[0]

        # Organize awards data
        awards_dict = {}
        for _, row in awards_data.iterrows():
            award_name = row['DESCRIPTION']
            award_year = row['SEASON']
            if award_name not in awards_dict:
                awards_dict[award_name] = []
            awards_dict[award_name].append(award_year)

        # Update career averages and awards in Firestore
        db.collection('player_career_averages').document(player['full_name']).update({"career_averages": averages_dict, "awards": awards_dict})

        print(f"Updated averages and awards for player {player['full_name']}")

    except Exception as e:
        print(f"Error calculating averages or fetching awards for player {player['full_name']}: {e}")