import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import '../Styles/DraftStyles.css';

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
                
            }
            
        };

        fetchData();
        setIsLoading(false);

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
                            <td>{pick.OVERALL_PICK === 0 ? 'TP' : pick.OVERALL_PICK}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}

export default DraftTile;