import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import firebase from 'firebase';
import { RootState } from '../model/DomainModels';
import { cartReducer, shopReducer } from '../reducers/Cart';
import { invoiceReducer } from '../reducers/Invoices';
import { wishListReducer } from '../reducers/WishList';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  enableRedirectHandling: process.env.REACT_APP_ENABLE_REDIRECT_HANDLING,
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
  invoice: invoiceReducer,
  wishList: wishListReducer,
})

const localReducer = combineReducers({
  firebase: firebaseReducer,
  cart: cartReducer,
  shop: shopReducer,
})

// Create store with reducers and initial state
const initialState = {}
export const firebaseStore = createStore(rootReducer, initialState, composeWithDevTools())

export type CartState = ReturnType<typeof localReducer>;

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: firebaseStore.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

export default rrfProps;
