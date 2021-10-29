import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const app = firebase.initializeApp(
    {
        apiKey: "",
        authDomain: "",
        databaseURL: "",        
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
      }
    )
//console.log(auth);
 const auth = app.auth();

 const picsStorage = firebase.storage();

 const picFireStore = firebase.firestore();

 
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, picsStorage, picFireStore, timestamp};
export default app