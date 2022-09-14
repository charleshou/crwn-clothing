import { initializeApp } from "firebase/app";
import {
  getAuth,
  // eslint-disable-next-line
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  // eslint-disable-next-line
  getFireStore,
  doc,
  getDoc,
  // eslint-disable-next-line
  setDoc,
  getFirestore,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEmV8XzvfejE6ahNJeuboIOqlfw8KYF2I",
  authDomain: "crwn-clothing-db-8dfd4.firebaseapp.com",
  projectId: "crwn-clothing-db-8dfd4",
  storageBucket: "crwn-clothing-db-8dfd4.appspot.com",
  messagingSenderId: "327267237582",
  appId: "1:327267237582:web:e65b95ecce0b7dd41eda9f",
};

// Initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  console.log(`userAuth is ${userAuth}`);
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //if user data does not exist
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;

  //if user data exists
  //return userDocRef
};
