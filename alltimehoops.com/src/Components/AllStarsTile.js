import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/AllStarStyles.css';

function AllStarsTile({ year, setIsLoading }) {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);

    year = (parseInt(year) + 1).toString();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const docRef = doc(collection(firestore, 'nba_allstars'), year);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setPlayers(data.players);
                const uniqueTeams = [...new Set(data.players.map(player => player.team))];
                setTeams(uniqueTeams);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [year]);

    // Group players by team
    const playersByTeam = teams.reduce((acc, team) => {
        acc[team] = players.filter(player => player.team === team);
        return acc;
    }, {});

    const maxPlayers = Math.max(...Object.values(playersByTeam).map(players => players.length));

    return (
        <div className="all-star-tile">
            <h1>All Stars</h1>
            <table>
                <thead>
                    <tr>
                        {teams.map((team, index) => {
                            const teamName = team.replace('Team ', '');
                            return <th key={index}>{teamName}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: maxPlayers }).map((_, index) => (
                        <tr key={index}>
                            {teams.map((team, teamIndex) => {
                                const player = playersByTeam[team][index] || { player: '\u00A0' };
                                return <td key={teamIndex}>{player.player}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllStarsTile;