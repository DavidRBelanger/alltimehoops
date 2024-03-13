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
        setData(docSnap.data().notableOccurrences); // Access the "notableOccurrences" field
      } else {
      }
      setIsLoading(false);
    };
    fetchData();
    

  }, [year]);


  // Assuming you want to display the first notable occurrence

  if (!(data && data[occurenceNum])) {
    return null; // If there is no data, return null
  }
  return (
    <div className="notable-occurences">
      <p>{data && data[occurenceNum]}</p>
    </div>
  );
}

export default NotableOccurence;
