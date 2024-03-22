/**
 * Last Verified: 3/21/2024 - David Belanger
 * Authors: David Belanger
 *
 * AwardsTile is a React component that fetches and displays a list of NBA awards for a given year.
 *
 * Props:
 * - year: The year for which the awards should be fetched.
 * - setIsLoading: A function to set the loading state of the parent component.
 *
 * State:
 * - data: An object to store the fetched awards data. It's initially null.
 *
 * The component uses the useEffect hook to fetch the data when it mounts and whenever the `year` prop changes.
 * It calls an asynchronous function `fetchData`:
 *
 * fetchData Function:
 * This function fetches the data for the awards from Firestore. It constructs a document reference and fetches the document.
 * If the document exists, it adds the document data to the `data` state.
 * After fetching the data, it sets the loading state to false.
 *
 * Render:
 * The component renders a div with the class "awards-tile". It displays a list of awards.
 * For each award, it displays a header with the award name and the player who won it.
 * If the award did not exist for the given year, it displays 'Award Did Not Exist'.
 */

import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/AwardsTile.css';

function AwardsTile({ year, setIsLoading }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(collection(firestore, 'nba_awards'), year);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setData(docSnap.data());
            } 
            setIsLoading(false);
        };
        fetchData();
        

    }, [year]);

    return (
        <div className="awards-tile">
            <h1>MVP: {(data && data['nba mvp'] && data['nba mvp'].player) || 'Award Did Not Exist'}</h1>
            <h1>ROTY: {(data && data['nba roy'] && data['nba roy'].player) || 'Award Did Not Exist'}</h1>
            <h1>MIP: {(data && data['mip'] && data['mip'].player) || 'Award Did Not Exist'}</h1>
            <h1>DPOY: {(data && data['dpoy'] && data['dpoy'].player) || 'Award Did Not Exist'}</h1>
            <h1>6MOTY: {(data && data['smoy'] && data['smoy'].player) || 'Award Did Not Eixst'}</h1>
        </div>
    );
}

export default AwardsTile;