import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/StatLeadersStyle.css';
import Loader from './Loader';
import { Oval } from 'react-loader-spinner';
/**
 * Last Verified: 3/21/2024 - David Belanger
 * Authors: David Belanger
 *
 * StatLeadersTile is a React component that fetches and displays NBA stat leaders for a given year.
 *
 * Props:
 * - year: The year for which the stat leaders should be fetched.
 * - setIsLoading: A function to set the loading state of the parent component.
 *
 * State:
 * - data: An array to store the fetched stat leaders data. It's initially an empty array.
 *
 * The component uses the useEffect hook to fetch the data when it mounts and whenever the `year` prop changes.
 * It calls an asynchronous function `fetchData`:
 *
 * fetchData Function:
 * This function fetches the data for the stat leaders from Firestore. It constructs a document reference and fetches the document.
 * If the document exists and the data does not already exist in `newData`, it adds the document data to `newData`.
 * After fetching the data for each stat and mode, it sets the loading state to false.
 * Finally, it sets the `data` state to `newData`.
 *
 * Render:
 * The component renders a div with the class "stat-leader-tile". It displays a title and a list of stat leaders.
 * Each stat leader is displayed with the stat, the player's name, and the player's value for that stat.
 */


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