import {Reducer} from 'redux'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import { createStore, combineReducers } from 'redux'
import { firebaseReducer, FirebaseReducer, FirestoreReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import firebase from 'firebase';
import { CartStateType } from '../model/DomainModels';
import { cartReducer } from '../reducers/Cart';

const firebaseConfig = {
    apiKey: "AIzaSyCQyvVWaa4R-FxZ05zGSktssnKtwGtRLa8",
    authDomain: "slashiee.firebaseapp.com",
    databaseURL: "https://slashiee.firebaseio.com",
    projectId: "slashiee",
    storageBucket: "slashiee.appspot.com",
    messagingSenderId: "326027994327",
    appId: "1:326027994327:web:5a227f71ef8b92ca523c92",
    measurementId: "G-9DBHG304Z8"
}

// Optional: If you use the user profile option
interface Profile {
  name: string;
  email: string;
}

// Optional: You can define the schema of your Firebase Redux store.
// This will give you type-checking for state.firebase.data.todos and state.firebase.ordered.todos
interface Schema {
  markets: Market;
}

// If you have a todos collection, you might have this type
interface Market {
  id: string;
  name: string;
}

// with both reducer types
export interface RootState {
  firebase: FirebaseReducer.Reducer<Profile, Schema>;
  firestore: Reducer<FirestoreReducer.Reducer>;
  cart: CartStateType;
}
interface Categories {
  img_url : string;
  name: string;

}
export interface Markets {
  name : string;
  opening_hour: [] ;
  id: string;
  [key: string]: string | number | [] | null;
  imageUrl:string;
  serviceOffering: string;
  terms: string;
  free_delivery: string;

}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  markets: 'Markets'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer as any,
  cart: cartReducer
})

// Create store with reducers and initial state
const initialState = {}
export const firebaseStore = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: firebaseStore.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

export default rrfProps;