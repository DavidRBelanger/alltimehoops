import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/StatLeadersStyle.css';
/**
 * 
 * Last Verified: 3/21/2024 - David Belanger
 * Authors: David Belanger
 * 
 * 
 * AdvancedStatLeadersTile is a React component that fetches and displays advanced statistics for NBA leaders.
 *
 * Props:
 * - year: The year for which the statistics should be fetched.
 * - setIsLoading: A function to set the loading state of the parent component.
 *
 * State:
 * - data: An array to store the fetched statistics data. It's initially an empty array.
 *
 * The component uses the useEffect hook to fetch the data when it mounts and whenever the `year` prop changes.
 * It calls an asynchronous function `fetchData`:
 *
 * fetchData Function:
 * This function fetches the data for various statistics from Firestore. The statistics are defined in the `stats` array.
 * For each statistic, it constructs a document reference and fetches the document.
 * If the document exists, it adds the document data and the statistic name to the `newData` array.
 * After fetching all the data, it sets the loading state to false and updates the `data` state with `newData`.
 *
 * Render:
 * The component renders a div with the class "stat-leader-tile". It displays a title and a list of statistics.
 * For each item in the `data` array, it displays a paragraph with the statistic name and the leader's name and value for that statistic.
 */




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
          newData.push({ ...docSnap.data(), stat });
        } 
      }
      setIsLoading(false);
      setData(newData);
      
    };

    fetchData();
  }, [year]); 

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
          (item.stat === 'FG3_PCT') ? 'FG3%: ' : 
          (item.stat === 'FTM') ? 'FTM: ' :
          (item.stat === 'FTA') ? 'FTA: ' :
          (item.stat === 'FT_PCT') ? 'FT%: ' :
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
