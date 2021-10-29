import { useState, useEffect } from 'react';
import { picsStorage, picFireStore, timestamp } from '../firebase';

import { useAuth } from "../contexts/AuthContext"

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useAuth()

  useEffect(() => {
    // references
    const storageRef = picsStorage.ref(file.name);
    const collectionRef = picFireStore.collection('PICS');
    
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      const createdBy  = currentUser.uid;
      await collectionRef.add({ url, createdAt, createdBy });
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;