
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/StandingsStyles.css';


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
            <h1>{year.substring(0, 4)}-{(parseInt(year.substring(2, 4)) + 1).toString().padStart(2, '0')} NBA Standings</h1>
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