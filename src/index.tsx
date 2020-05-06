import React, { } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import rrfProps, { firebaseStore } from "./services/FirebaseIniti";

// type Props ={
//   children: ReactNode
// }

// const AuthIsLoaded : Component<Props> = ({children = {}}) => {

//       const auth = useSelector<RootState>(
//         state => state.firebase.auth
//       ) as FirestoreReducer.Reducer;
//       if (!isLoaded(auth)) return <div>splash screen...</div>;
//       return {children};
// }


// // A wrapper for <Route> that redirects to the login
// // screen if you're not yet authenticated or if auth is not
// // yet loaded
// export const PrivateRoute: React.FC = ({ children, ...rest })  =>{
//   const auth = useSelector<RootState>(state => state.firebase.auth)
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isLoaded(auth) && !isEmpty(auth) ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }


ReactDOM.render(
  <Provider store={firebaseStore}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
