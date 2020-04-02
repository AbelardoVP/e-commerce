import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDcYnUVy8jSPZ_lTAIkdP6PxWAIM2kRoVg",
    authDomain: "e-commerce-react-app-ddf99.firebaseapp.com",
    databaseURL: "https://e-commerce-react-app-ddf99.firebaseio.com",
    projectId: "e-commerce-react-app-ddf99",
    storageBucket: "e-commerce-react-app-ddf99.appspot.com",
    messagingSenderId: "514929606349",
    appId: "1:514929606349:web:f4cd2dad1e01eaae93b384"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// google pop up for auth
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;