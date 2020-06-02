import {  Reducer } from "redux";
import {  FirebaseReducer } from "react-redux-firebase";
import { CartStateType } from "../model/DomainModels";

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
interface RootState {
  firebase: FirebaseReducer.Reducer<Profile, Schema>;
  cart: Reducer<CartStateType>;
}

// const rootReducer = combineReducers({
//   firebase: firebaseReducer,
//   cart: cartReducer
// });

// const rootReducer = ({ cart });


// export type CartState = ReturnType<typeof rootReducer>;

// export default rootReducer;
