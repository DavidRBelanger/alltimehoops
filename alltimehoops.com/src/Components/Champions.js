import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import '../Styles/ChampionsStyle.css'; 

function Champions({ year, setIsLoading }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(collection(firestore, 'nba_champions_mvps'), year.toString());
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setData(docSnap.data());
            } else {
                console.error('Champions Tile Document does NOT exist in database for year: ', year);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [year]);

    const flipResult = (result) => {
        //used to flip the series result so that the 4 wins always comes first, purely for aesthetics
        const [first, second] = result.split('–');
        return parseInt(first) < parseInt(second) ? `${second}-${first}` : result;
    };


    return (
        <div className="champion-tile">
            {data && (
                <p>
                    In the {data["Year"]}-{data["Year"]+1} NBA Finals, the {data["NBA Champion"]} {data["Final Sweep ?"].toLowerCase() === 'true' ? `swept the ${data["NBA Vice-Champion"]} 4-0` : `beat the ${data["NBA Vice-Champion"]} ${flipResult(data["Result"])}`}.
                </p>
            )}
        </div>
    );
}

export default Champions;