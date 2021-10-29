import { useState, useEffect } from 'react';
import { picFireStore } from '../firebase';

import { useAuth } from "../contexts/AuthContext"

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  
  const { currentUser } = useAuth()

  useEffect(() => {
    const unsub = picFireStore.collection(collection)
      .where('createdBy', '==', currentUser.uid)
      .orderBy('createdAt')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        });
        setDocs(documents);
      });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection]);

  return { docs };
}

export default useFirestore;