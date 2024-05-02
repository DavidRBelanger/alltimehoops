import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/AllStarStyles.css';

function AllRookieTile({ year, setIsLoading }) {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(1);

    year = (parseInt(year)).toString();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const docRef = doc(firestore, 'nba_allnba', year);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const seasonData = docSnap.data();
                const allRookiePlayers = seasonData.players.filter(player => player.type === 'All-Rookie');

                // Separate players into teams
                const teams = {};
                allRookiePlayers.forEach(player => {
                    const teamNumber = player.number_tm;
                    if (!teams[teamNumber]) {
                        teams[teamNumber] = [];
                    }
                    teams[teamNumber].push(player);
                });

                setTeams(Object.values(teams));
            } else {
                console.log('No such document!');
            }

            setIsLoading(false);
        };

        fetchData();
    }, [year]);

    return (
        <div className="all-star-tile">
            <h1>All Rookie</h1>
            <div className="all-buttons">

            {teams.map((team, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTeam(index + 1)}
                        disabled={selectedTeam === index + 1}>
                        Team {index + 1}
                    </button>
                ))}
            </div>
            <div className="all-players">
                {teams[selectedTeam - 1]?.map((player, playerIndex) => (
                    <div className="individual-player">

                    <p key={playerIndex}>{player.player}</p>
                    <p key={playerIndex}>{player.tm}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllRookieTile;