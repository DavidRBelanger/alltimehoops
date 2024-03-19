
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/StatLeadersStyle.css';
import Loader from './Loader';
import { Oval } from 'react-loader-spinner';

function StatLeadersTile({ year, setIsLoading }) {
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
    }, [year]);


    return (
        //essentially this code will display each stat if the stat exists from the data.
        <div className="stat-leader-tile">
            <h1>Stat Leaders</h1>
            {data.map((item, index) => (
                <p key={index}>
                    {item.mode === 'PerGame' ? (
                        //not sure why default formatter does this
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