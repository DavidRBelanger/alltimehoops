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