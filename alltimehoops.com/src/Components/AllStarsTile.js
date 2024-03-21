import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/AllStarStyles.css';

function AllStarsTile({ year, setIsLoading }) {
    const [players, setPlayers] = useState([]);

    year = (parseInt(year) + 1).toString();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); 
            const docRef = doc(collection(firestore, 'nba_allstars'), year);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setPlayers(data.players);
                setIsLoading(false);
            } else {
               
                setIsLoading(false);
            }
        };

        fetchData();
    }, [year]);


    const teams = [...new Set(players.map(player => player.team))];

    return (
        <div className="all-star-tile">
            <h1>All Stars</h1>
            <div className="teams">
                {teams.map((team, index) => (
                    <div key={index} className={`team team${index + 1}`}>
                        <h2>{team}</h2>
                        {players.filter(player => player.team === team).map((player, index) => {
                            return (
                                <p key={index}>{player.player}</p>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllStarsTile;