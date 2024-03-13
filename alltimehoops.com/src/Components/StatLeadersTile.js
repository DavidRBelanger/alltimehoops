
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import '../Styles/StatLeadersStyle.css';
import Loader from './Loader';
import { Oval } from 'react-loader-spinner';

function StatLeadersTile({ year , setIsLoading}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const newData = [];
            const stats = ['PTS', 'AST', 'TRB', 'STL', 'BLK'];
            const modes = ['PerGame', 'Totals'];

            for (let mode of modes) {
                for (let stat of stats) {
                    const docRef = doc(collection(doc(collection(firestore, 'nba_leaders2'), year), mode + "_" + stat + "_Leader"), mode + "_" + stat + "_Leader");
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        // Check if the data for this stat and mode has already been fetched
                        if (!newData.some(item => item.stat === stat && item.mode === mode)) {
                            newData.push({ ...docSnap.data(), stat: stat, mode: mode });
                        }
                    }
                    setIsLoading(false);
                }
            }

            setData(newData);
            

        };

        fetchData();
    }, [year]); // Remove data from the dependency array


    return (
        <div className="stat-leader-tile">
                <h1>Stat Leaders</h1>
                {data.map((item, index) => (
                    <p key={index}>
                        {item.mode === 'PerGame' ? (
                            item.stat === 'PTS' ? 'PPG: ' :
                                item.stat === 'AST' ? 'APG: ' :
                                    item.stat === 'TRB' ? 'RPG: ' :
                                        item.stat === 'STL' ? 'SPG: ' :
                                            item.stat === 'BLK' ? 'BPG: ' : ''
                        ) : (
                            item.stat === 'PTS' ? 'Points: ' :
                                item.stat === 'AST' ? 'Assists: ' :
                                    item.stat === 'TRB' ? 'Rebounds: ' :
                                        item.stat === 'STL' ? 'Steals: ' :
                                            item.stat === 'BLK' ? 'Blocks: ' : ''
                        )}
                        {item.name}
                        {" "}(
                        {item.value}
                        )
                    </p>
                ))}
        </div>
    );
}

export default StatLeadersTile;