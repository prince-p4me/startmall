import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, RouteProps, useLocation} from "react-router";
import {isEmpty, isLoaded} from "react-redux-firebase";
import {RootState} from "../model/DomainModels";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  isAllowed: boolean;
  restrictedPath: string;
  authenticationPath: string;
}

export const getDefaultProtectedRouteProps = () => {

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: false,
    isAllowed: true,
    authenticationPath: "/login",
    restrictedPath: ""
  };
  return defaultProtectedRouteProps;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {

  const currentLocation = useLocation();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const isAuthenticated = isLoaded(auth) && !isEmpty(auth as any);

  console.log("Redirecting to others site");
  let redirectPath = "";

  if (!isAuthenticated && currentLocation.pathname != props.authenticationPath) {
    redirectPath = props.authenticationPath
    console.log("Not Authenticate.. redirecting to " + redirectPath);
  }
  if (isAuthenticated && !props.isAllowed) {
    redirectPath = currentLocation.pathname;
    console.log(" Authenticated.. redirecting to " + redirectPath);
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{pathname: redirectPath}}/>;
    return <Route {...props} component={renderComponent} render={undefined}/>;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
