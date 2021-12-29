import { useState, useEffect } from 'react';
import { picsStorage, picFireStore, timestamp } from '../firebase';

import { useAuth } from "../contexts/AuthContext"

const retrieveFileType = (extension) => {
  let type = 'ANY'
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        type = 'IMAGE'
        break;
      case 'doc':
      case 'docx':
      case 'txt':
        type = 'WORD'  
        break;
      case 'pdf':
        type = 'PDF'  
        break;
    
      default:
        break;
    }

    return type;
}

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useAuth()

  useEffect(() => {
  

    const ext = file.name.split('.');
    const fileType =retrieveFileType(ext[ext.length - 1]);
    // references
    const storageRef = picsStorage.ref(file.name);
    const collectionRef = picFireStore.collection('PICS');
   
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(Math.floor(percentage));
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      const createdBy  = currentUser.uid;
      const fileName = file.name;
      await collectionRef.add({ url, createdAt, createdBy, fileName, fileType });
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;