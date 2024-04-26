from nba_api.stats.static import players
from nba_api.stats.endpoints import commonplayerinfo
from firebase_admin import credentials, firestore
import firebase_admin

credentials_path = 'C:/Users/drbx3/Documents/VSProjects/alltimehoopsbackup/basketballstats-f03ae-firebase-adminsdk-kibsb-116082bca7.json'
app = firebase_admin.initialize_app(credentials.Certificate(credentials_path))
db = firestore.client()

collectionRef = db.collection('nba_players')

def get_player_data():
    player_dict = players.get_players()

    for player in player_dict:
        player_info = commonplayerinfo.CommonPlayerInfo(player_id=player['id']).get_dict()

        player_name = player['full_name']
        player_id = player['id']
        position = player_info['resultSets'][0]['rowSet'][0][player_info['resultSets'][0]['headers'].index('POSITION')]

        player_data = ({
            'name': player_name,
            'id': player_id,
            'position': position
        })

        try:
            collectionRef.document(player_name).set(player_data)
            print(f"Added {player_name} to the database")
            print(f"Data: {player_data}")
        except Exception as e:
            print(f"Failed to add {player_name} to the database. Error: {e}")


all_player_data = get_player_data()
