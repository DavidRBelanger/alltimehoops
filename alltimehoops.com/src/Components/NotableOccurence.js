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
