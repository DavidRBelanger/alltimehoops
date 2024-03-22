/**
 * Last Verified: 3/21/2024 - David Belanger
 * Authors: David Belanger
 *
 * NotableOccurence is a React component that fetches and displays a notable occurrence from the NBA for a given year.
 *
 * Props:
 * - year: The year for which the notable occurrence should be fetched.
 * - occurenceNum: The index of the occurrence to be fetched.
 * - setIsLoading: A function to set the loading state of the parent component.
 *
 * State:
 * - data: An object to store the fetched notable occurrences data. It's initially null.
 *
 * The component uses the useEffect hook to fetch the data when it mounts and whenever the `year` prop changes.
 * It calls an asynchronous function `fetchData`:
 *
 * fetchData Function:
 * This function fetches the data for the notable occurrences from Firestore. It constructs a document reference and fetches the document.
 * If the document exists, it adds the document data to the `data` state.
 * After fetching the data, it sets the loading state to false.
 *
 * Render:
 * The component renders a div with the class "notable-occurences". It displays the notable occurrence.
 * If the data is not yet fetched or the occurrence does not exist, it returns null and does not render anything.
 */

import { useEffect, useState } from 'react';
import { doc, getDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';
import '../Styles/NotableOccurences.css';

function NotableOccurence({ year, occurenceNum, setIsLoading }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(collection(firestore, 'nba_summaries'), year);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data().notableOccurrences); 
      } else {
      }
      setIsLoading(false);
    };
    fetchData();
    

  }, [year]);


  

  if (!(data && data[occurenceNum])) {
    return null; 
  }
  return (
    <div className="notable-occurences">
      <p>{data && data[occurenceNum]}</p>
    </div>
  );
}

export default NotableOccurence;
