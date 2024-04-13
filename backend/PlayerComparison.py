import time
from nba_api.stats.endpoints import (playercareerstats, commonallplayers, playerawards,
                                     commonplayerinfo, playerdashboardbyyearoveryear,
                                     leaguedashplayerstats, leaguegamefinder,
                                     teamplayerdashboard, commonteamroster, playergamelog)
from nba_api.stats.static import teams
from firebase_admin import credentials, firestore
import firebase_admin
import pandas as pd
import numpy as np

# Load the service account key
credentials_path = 'C:/Users/drbx3/Documents/VSProjects/alltimehoopsbackup/basketballstats-f03ae-firebase-adminsdk-kibsb-116082bca7.json'
cred = credentials.Certificate(credentials_path)

# Initialize the Firebase Admin SDK
app = firebase_admin.initialize_app(cred)

# Get a reference to the Firestore service
db = firestore.client()

def calculate_career_averages(career_data):
    # Convert list of dicts to DataFrame
    career_df = pd.DataFrame(career_data)
    # Calculate the mean of each numeric column
    career_averages = career_df.select_dtypes(include=[np.number]).mean()
    # Convert Series to dict
    return career_averages.to_dict()

def fetch_league_leaders(player_id, season):
    # Fetch league-wide player stats for the given season
    league_stats = leaguedashplayerstats.LeagueDashPlayerStats(season=season, per_mode_detailed='PerGame')
    league_stats_df = league_stats.get_data_frames()[0]
    # Find the player's stats for the season
    player_stats = league_stats_df[league_stats_df['PLAYER_ID'] == player_id]
    # Check if the player led the league in points per game, assists, or rebounds
    led_in_ppg = (player_stats['PTS_RANK'].values[0] == 1)
    led_in_assists = (player_stats['AST_RANK'].values[0] == 1)
    led_in_rebounds = (player_stats['REB_RANK'].values[0] == 1)
    # If the player led the league in any category, record the season
    ppg_season = season if led_in_ppg else None
    assists_season = season if led_in_assists else None
    rebounds_season = season if led_in_rebounds else None
    return ppg_season, assists_season, rebounds_season

def fetch_leaders():
    # Initialize dictionaries to store the leaders for each category
    points_leaders = {}
    assists_leaders = {}
    rebounds_leaders = {}
    # Loop through each season from 1951 to 2022
    for season in range(1951, 2023):
        # Convert season to a string
        season_str = str(season)
        # Fetch the leader for each category and add the season to their list in the corresponding dictionary
        points_leader = db.collection('nba_leaders2').document(season_str).collection('PerGame_PTS_Leader').document('PerGame_PTS_Leader').get().to_dict()['name']
        assists_leader = db.collection('nba_leaders2').document(season_str).collection('PerGame_AST_Leader').document('PerGame_AST_Leader').get().to_dict()['name']
        rebounds_leader = db.collection('nba_leaders2').document(season_str).collection('PerGame_REB_Leader').document('PerGame_REB_Leader').get().to_dict()['name']
        points_leaders.setdefault(points_leader, []).append(season_str)
        assists_leaders.setdefault(assists_leader, []).append(season_str)
        rebounds_leaders.setdefault(rebounds_leader, []).append(season_str)
    return points_leaders, assists_leaders, rebounds_leaders

def was_player_on_championship_team(year, player_id):
    # Get all games in the season
    games = leaguegamefinder.LeagueGameFinder(season_nullable=str(year)).get_data_frames()[0]
    # Filter for playoff games
    playoff_games = games[games['GAME_ID'].str.contains('004')]
    # Sort the games by date
    playoff_games = playoff_games.sort_values('GAME_DATE')
    # Get the last game of the playoffs
    last_playoff_game = playoff_games.iloc[-1]
    # Get the team that won the last game
    winning_team_id = last_playoff_game['TEAM_ID']
    # Get all teams the player has played for in the season
    player_games = playergamelog.PlayerGameLog(player_id=player_id, season=str(year)).get_data_frames()[0]
    player_teams = set(player_games['TEAM_ID'])
    # Check if the player was on the winning team
    was_on_team = winning_team_id in player_teams
    return was_on_team

def generate_champions_list():
    # Get a list of all teams and their IDs
    all_teams = teams.get_teams()
    champions = []
    for year in range(1980, 2023):
        try:
            # Get the team that won the championship
            champion_team_name = teams.find_teams_by_championship_year(year+1)
            if champion_team_name is not None:
                # Find the team's ID
                for team in all_teams:
                    if team['full_name'] == champion_team_name:
                        team_id = team['id']
                        break
                # Fetch the team's roster
                roster = commonteamroster.CommonTeamRoster(team_id=team_id, season=str(year)).get_data_frames()[0]
                # Add each player to the champions list
                for index, player in roster.iterrows():
                    # Check if the player is already in the champions list
                    for champion in champions:
                        if champion['id'] == player['PLAYER_ID']:
                            # If the player is already in the list, add the year to their list of championship years
                            champion['years'].append(year)
                            break
                    else:
                        # If the player is not in the list, add a new object for them
                        champions.append({
                            'name': player['PLAYER'],
                            'id': player['PLAYER_ID'],
                            'years': [year]
                        })
        except Exception as e:
            print(f"An error occurred for year {year}: {e}")
    return champions

champion_list = generate_champions_list()

def create_player_profile(player_id):
    # Get player info
    player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id).get_data_frames()[0]
    career_data = playercareerstats.PlayerCareerStats(player_id=player_id, per_mode36='PerGame').get_data_frames()[0]
    # Get player awards
    player_awards = playerawards.PlayerAwards(player_id=player_id).get_data_frames()[0]
    ppg_seasons = []
    apg_seasons = []
    rpg_seasons = []
    # Get the list of seasons the player played
    seasons_played = career_data['SEASON_ID'].tolist()
    for season in seasons_played:
        # Fetch the seasons the player led in points, assists, and rebounds
        ppg_season, apg_season, rpg_season = fetch_league_leaders(player_id, season)
        # If the player led the league in any category, add the season to the corresponding list
        if ppg_season:
            ppg_seasons.append(ppg_season)
        if apg_season:
            apg_seasons.append(apg_season)
        if rpg_season:
            rpg_seasons.append(rpg_season)
    career_averages = calculate_career_averages(career_data)
    teams_played = list(set(career_data['TEAM_ID'].tolist()))
    player_profile = {
        'id': player_id,
        'name': player_info['DISPLAY_FIRST_LAST'].values[0],
        'position': player_info['POSITION'].values[0],
        'height': player_info['HEIGHT'].values[0],
        'weight': player_info['WEIGHT'].values[0],
        'nationality': player_info['COUNTRY'].values[0],
        'draft_year': player_info['DRAFT_YEAR'].values[0],
        'draft_round': player_info['DRAFT_ROUND'].values[0],
        'draft_number': player_info['DRAFT_NUMBER'].values[0],
        'career_averages': career_averages,
        'awards': player_awards['DESCRIPTION'].tolist(),
        'points_leader_seasons': ppg_seasons,
        'assists_leader_seasons': apg_seasons,
        'rebounds_leader_seasons': rpg_seasons,
        'championship_teams': [team for team in champion_list if player_id in team['id']]
    }
    return player_profile

all_players = commonallplayers.CommonAllPlayers().get_data_frames()[0]

for player in all_players.iterrows():
    player_id = player[1]['PERSON_ID']
    player_profile = create_player_profile(player_id)
    print(player_profile)
    time.sleep(1)
