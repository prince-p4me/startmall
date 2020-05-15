import React, { ComponentType, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps, useLocation } from "react-router";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { RootState } from "../model/DomainModels";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  isAllowed: boolean;
  restrictedPath: string;
  authenticationPath: string;
}

// const test: ProtectedRouteProps = {
//   isAuthenticated: false,
//   isAllowed: false,
//   restrictedPath: "string;",
//   authenticationPath: "string;"
// };

export function getDefaultProtectedRouteProps() {

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: false,
    isAllowed: true,
    authenticationPath: "/login",
    restrictedPath: ""
  };
  return defaultProtectedRouteProps;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {

  const currentLocation = useLocation();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  var isAuthenticated = isLoaded(auth) && !isEmpty(auth as any);

  console.log("Redirecting to others site");
  let redirectPath = "";
  const currentPath = currentLocation.pathname;

  if (!isAuthenticated && currentLocation.pathname != props.authenticationPath) {
    redirectPath = props.authenticationPath
    // console.log("CURRENT_LOCATION")
    // console.log(currentLocation)
      // redirectPath = props.authenticationPath+"?current=" + currentPath;
    console.log("Not Authenticate.. redirecting to " + redirectPath);
  }
  if (isAuthenticated && !props.isAllowed) {
    redirectPath = currentLocation.pathname;
    console.log(" Authenticated.. redirecting to " + redirectPath);
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath}} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};


export default ProtectedRoute;

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//     var userRef = app.dataInfo.child(app.users);

//     var useridRef = userRef.child(app.userid);

//     useridRef.set({
//       locations: "",
//       theme: "",
//       colorScheme: "",
//       food: ""
//     });

//   } else {
//     // User is signed out.
//     // ...
//   }
//   // ...
// });

// export const PrivateRoute: Route<RouteProps> = ({children, ...rest }) => {
//   const auth = useSelector<RootState>(state => state.firebase.auth);
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isLoaded(auth) && !isEmpty(auth as any) ? (
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
// };

// export const PrivateRoute2: React.SFC<RouteProps> = ({
//   component: Component,
//   ...rest
// }: {
//   component: ComponentType<RouteProps>;
// }) => {
//   const auth = useSelector<RootState>(state => state.firebase.auth);

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isLoaded(auth) && !isEmpty(auth as any) ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };
