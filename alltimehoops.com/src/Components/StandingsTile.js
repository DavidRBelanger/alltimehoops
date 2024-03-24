
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore'; 
import '../Styles/StandingsStyles.css';
/**
 * Last Verified: 3/21/2024 - David Belanger
 * Authors: David Belanger
 *
 * StandingsTile is a React component that fetches and displays NBA standings for a given year.
 *
 * Props:
 * - year: The year for which the standings should be fetched.
 * - setIsLoading: A function to set the loading state of the parent component.
 *
 * State:
 * - easternStandings: An array to store the fetched standings data for the Eastern conference. It's initially an empty array.
 * - westernStandings: An array to store the fetched standings data for the Western conference. It's initially an empty array.
 * - displayEast: A boolean to determine whether to display the Eastern or Western standings. It's initially false.
 *
 * The component uses the useEffect hook to fetch the data when it mounts and whenever the `year` prop changes.
 * It calls an asynchronous function `fetchData`:
 *
 * fetchData Function:
 * This function fetches the data for the standings from Firestore. It constructs a document reference and fetches the document.
 * If the document exists, it adds the document data to the `easternStandings` and `westernStandings` states.
 * After fetching the data, it sets the loading state to false.
 *
 * handleEast Function:
 * This function sets the `displayEast` state to true.
 *
 * handleWest Function:
 * This function sets the `displayEast` state to false.
 *
 * Render:
 * The component renders a div with the class "standings-tile". It displays a title, buttons to switch between the conferences, and a table of standings.
 * The standings table displays the team name, record, and rank for each team.
 */

function StandingsTile({ year, setIsLoading }) {
    const [easternStandings, setEasternStandings] = useState([]);
    const [westernStandings, setWesternStandings] = useState([]);
    const [displayEast, setDisplayEast] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const collectionRef = collection(firestore, 'nba_standings');
            const docRef = doc(collectionRef, year);

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setEasternStandings(data.easternStandings);
                setWesternStandings(data.westernStandings);
            }
        };

        fetchData();
        setIsLoading(false);

    }, [year]);

    const handleEast = () => {
        setDisplayEast(true);
    };

    const handleWest = () => {
        setDisplayEast(false);
    };

    const displayedStandings = displayEast ? easternStandings : westernStandings;
    const conferenceName = displayEast ? 'Eastern' : 'Western';

    if (displayedStandings.length === 0 || !displayedStandings) {
        return null;
    }

    return (
        <div className="standings-tile">
            <h1>{year.substring(0, 4)}-{parseInt(year.substring(2,4))+1} NBA Standings</h1>
            <div className="standings-buttons">
                <button onClick={handleWest} disabled={!displayEast}>Western</button>
                <button onClick={handleEast} disabled={displayEast}>Eastern</button>
            </div>
            <h2>{conferenceName} Standings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Record</th>
                        <th>Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedStandings.map((team, index) => (
                        <tr key={index}>
                            <td>{team.TeamName}</td>
                            <td>{team.WINS}-{team.LOSSES}</td>
                            <td>{team.PlayoffRank}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StandingsTile;