import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/StatLeadersStyle.css';

function AdvancedStatLeadersTile({ year, setIsLoading }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      const stats = ['GP', 'MIN', 'FGM', 'FGA', 'FG3M', 'FG3A', 'FTM', 'FTA', 'FT_PCT', 'OREB', 'DREB', 'TOV', 'EFF', 'FG3_PCT'];

      for (let stat of stats) {
        const docRef = doc(firestore, 'nba_leaders2', year, 'Totals_' + stat + '_Leader', 'Totals_' + stat + '_Leader');       
        const docSnap = await getDoc(docRef);        
        if (docSnap.exists()) {
          newData.push({ ...docSnap.data(), stat }); // Add the stat to the data
        } 
      }
      setIsLoading(false);
      setData(newData);
      
    };

    fetchData();
  }, [year]); // Remove data from the dependency array

  return (
    <div className="stat-leader-tile">
      <h1>Advanced Stat Leaders</h1>
      {data.map((item, index) => (
        <p key={index}>
          {(item.stat === 'GP') ? 'GP: ' :
          (item.stat === 'MIN') ? 'MIN: ' :
          (item.stat === 'FGM') ? 'FGM: ' :
          (item.stat === 'FGA') ? 'FGA: ' :
          (item.stat === 'FG3M') ? 'FG3M: ' :
          (item.stat === 'FG3A') ? 'FG3A: ' :
          (item.stat === 'FTM') ? 'FTM: ' :
          (item.stat === 'FTA') ? 'FTA: ' :
          (item.stat === 'FT_PCT') ? 'FT%: ' :
          (item.stat === 'FG3_PCT') ? 'FG3%: ' : 
          (item.stat === 'OREB') ? 'OREB: ' :
          (item.stat === 'DREB') ? 'DREB: ' :
          (item.stat === 'TOV') ? 'TOV: ' :
          (item.stat === 'EFF') ? 'EFF: ' : ''}
          {item.name} {" "}  ({item.value})
        </p>
      ))}
    </div>
  );
}

export default AdvancedStatLeadersTile;
