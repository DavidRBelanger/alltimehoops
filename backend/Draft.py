from nba_api.stats.endpoints import drafthistory
from google.cloud import firestore
import time

db = firestore.Client()

years = range(1950, 2023) # CHANGE RANGE HERE TO UPDATE LIST!

for year in years:
    draft = drafthistory.DraftHistory(league_id='00', season_year_nullable=year)
    draftData = draft.get_data_frames()[0]
    if not draftData.empty:
        draftPicks = draftData[['PLAYER_NAME', 'TEAM_NAME', 'OVERALL_PICK']].to_dict('records')
        draftDoc = db.collection('nba_drafts').document(str(year+1))
        draftDoc.set({ 
            'picks': draftPicks
        })
        print(f"Added {year} draft picks to Firestore.")