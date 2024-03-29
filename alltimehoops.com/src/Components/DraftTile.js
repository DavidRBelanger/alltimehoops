import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/DraftStyles.css';
/**
 * Last Verified: 3/21/2024 - David Belanger
 * Authors: David Belanger
 *
 * DraftTile is a React component that fetches and displays a list of NBA Draft picks for a given year.
 *
 * Props:
 * - year: The year for which the draft picks should be fetched.
 * - setIsLoading: A function to set the loading state of the parent component.
 *
 * State:
 * - picks: An array to store the fetched draft picks data. It's initially an empty array.
 * - currentIndex: A number to store the current index of the displayed draft picks. It's initially 0.
 *
 * The component uses the useEffect hook to fetch the data when it mounts and whenever the `year` prop changes.
 * It calls an asynchronous function `fetchData`:
 *
 * fetchData Function:
 * This function fetches the data for the draft picks from Firestore. It constructs a document reference and fetches the document.
 * If the document exists, it adds the document data to the `picks` state.
 * After fetching the data, it sets the loading state to false.
 *
 * handleNext Function:
 * This function increments the `currentIndex` state by 15.
 *
 * handleBack Function:
 * This function decrements the `currentIndex` state by 15, but not less than 0.
 *
 * Render:
 * The component renders a div with the class "draft-tile". It displays a title, a list of draft picks, and buttons to navigate through the list.
 * For each draft pick, it displays the player name, team name, and the overall pick.
 *
 * 
 * TODO: Move buttons to bottom, see how it looks. check if it messes with min-size
 * 
 */


function DraftTile({ year, setIsLoading }) {
    const [picks, setPicks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);



    useEffect(() => {
        const fetchData = async () => {
            const collectionRef = collection(firestore, 'nba_drafts');
            const docRef = doc(collectionRef, year);

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setPicks(data.picks);
            } else {
                console.log('No such document!');
            }
            
        };

        fetchData();
        setIsLoading(false);
        setCurrentIndex(0);

    }, [year]);

    const handleNext = () => {
        setCurrentIndex(prevIndex => prevIndex + 15);
    };

    const handleBack = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 15, 0));
    };

    return (
        <div className="draft-tile">
            <h1>{year} NBA Draft</h1>
            <div className="draft-buttons">
                <button onClick={handleBack} disabled={currentIndex === 0}>Back &lt;&lt;</button>
                <button onClick={handleNext} disabled={currentIndex + 15 >= picks.length}>&gt;&gt; Next</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Team</th>
                        <th>Pick</th>
                    </tr>
                </thead>
                <tbody>
                    {picks.slice(currentIndex, currentIndex + 15).map((pick, index) => (
                        <tr key={index}>
                            <td>{pick.PLAYER_NAME}</td>
                            <td>{pick.TEAM_NAME}</td>
                            <td>{pick.OVERALL_PICK === 0 ? 'TP' : pick.OVERALL_PICK}</td> {/* TP = Territorial Pick */ }
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}

export default DraftTile;