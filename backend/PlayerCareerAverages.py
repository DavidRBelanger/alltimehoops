from nba_api.stats.endpoints import playerawards, commonallplayers
import pandas as pd

# Get all players
all_players = commonallplayers.CommonAllPlayers().get_data_frames()[0]

# Find LeBron James
lebron = all_players[all_players['DISPLAY_FIRST_LAST'] == 'Wilt Chamberlain'].iloc[0]

# Get LeBron's awards
awards = playerawards.PlayerAwards(player_id=lebron['PERSON_ID'])
awards_df = awards.get_data_frames()[0]

# Print all unique award descriptions
print(awards_df['DESCRIPTION'].unique())