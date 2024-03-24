import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/ChampionsStyle.css'; // You may need to create this CSS file

function Champions({ year, setIsLoading }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(collection(firestore, 'nba_champions_mvps'), year.toString());
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setData(docSnap.data());
            }
            setIsLoading(false);
        };
        fetchData();
    }, [year]);

    return (
        <div className="champion-tile">
            {data && (
                <p>
                    In the {data["Year"]-1}-{data["Year"]} NBA Finals, the {data["NBA Champion"]} {data["Final Sweep ?"].toLowerCase() === 'true' ? `swept the ${data["NBA Vice-Champion"]} 4-0` : `beat the ${data["NBA Vice-Champion"]} ${data["Result"]}`}.
                </p>
            )}
        </div>
    );
}

export default Champions;