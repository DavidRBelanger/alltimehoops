import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/AllStarStyles.css';

/**
 * Last Verified: 3/21/2024 - David Belanger
 * Authors: David Belanger
 *
 * AllStarsTile is a React component that fetches and displays a list of NBA All Stars for a given year.
 *
 * Props:
 * - year: The year for which the All Stars should be fetched.
 * - setIsLoading: A function to set the loading state of the parent component.
 *
 * State:
 * - players: An array to store the fetched players data. It's initially an empty array.
 *
 * The component uses the useEffect hook to fetch the data when it mounts and whenever the `year` prop changes.
 * It calls an asynchronous function `fetchData`:
 *
 * fetchData Function:
 * This function fetches the data for the All Stars from Firestore. It constructs a document reference and fetches the document.
 * If the document exists, it adds the document data to the `players` state.
 * After fetching the data, it sets the loading state to false.
 *
 * Render:
 * The component renders a div with the class "all-star-tile". It displays a title and a list of teams.
 * For each team, it displays a list of players who are part of that team.
 */



function AllStarsTile({ year, setIsLoading }) {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');

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
                setSelectedTeam(uniqueTeams[0]); // Set the selected team here
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [year]);

    const handleTeamChange = (team) => {
        setSelectedTeam(team);
    };

    const displayedPlayers = players.filter(player => player.team === selectedTeam);

    return (
        <div className="all-star-tile">
            <h1>All Stars</h1>
            <div className="standings-buttons">
                {teams.map((team, index) => {
                    const teamName = team.replace('Team ', ''); 
                    return (
                        <button key={index} onClick={() => handleTeamChange(team)} disabled={team === selectedTeam}>{teamName}</button>
                    );
                })}
            </div>
            <div className="teams">
                {displayedPlayers.map((player, index) => (
                    <p key={index}>{player.player}</p>
                ))}
            </div>
        </div>
    );
}
export default AllStarsTile;