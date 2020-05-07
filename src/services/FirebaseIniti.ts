import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import { createStore, combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import firebase from 'firebase';
import { RootState } from '../model/DomainModels';
import { cartReducer, shopReducer } from '../reducers/Cart';
import addressReducer from '../reducers/Address';

const firebaseConfig = {
  apiKey: "AIzaSyCQyvVWaa4R-FxZ05zGSktssnKtwGtRLa8",
  authDomain: "slashiee.firebaseapp.com",
  databaseURL: "https://slashiee.firebaseio.com",
  projectId: "slashiee",
  storageBucket: "slashiee.appspot.com",
  messagingSenderId: "326027994327",
  appId: "1:326027994327:web:5a227f71ef8b92ca523c92",
  measurementId: "G-9DBHG304Z8",
  enableRedirectHandling: false
}

// 255334572519

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  presence: 'presence',
  sessions: 'sessions',
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
  cart: cartReducer,
  shop: shopReducer,
  address: addressReducer
})

const localReducer = combineReducers({
  firebase: firebaseReducer,
  cart: cartReducer,
  shop: shopReducer,
  address: addressReducer
})

// Create store with reducers and initial state
const initialState = {}
export const firebaseStore = createStore(rootReducer, initialState)

export type CartState = ReturnType<typeof localReducer>;

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: firebaseStore.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

export default rrfProps;