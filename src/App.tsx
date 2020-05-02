import Menu from "./components/Menu";
import Page from "./pages/Page";
import React from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import MainTabs from "./components/MainTabs";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import ShopMain from "./containers/ShopMain";
import OrderComplete from "./pages/OrderComplete";
import Login from "./pages/Login";

const App: React.FC = () => {
  console.log("entering app");
 
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/page/checkout" component={Checkout} exact={true} />
            <Route path="/tabs" component={MainTabs} exact />
            <Route path="/landing" component={Dashboard} exact />
            {/* <ProtectedRoute {...defaultProtectedRouteProps}  path="/shop_selections" component={ShopSelection} exact /> */}
            <Route path="/login" component={Login} exact />
            <Route path="/orders" component={OrderComplete} exact />
            <Route path="/shop/:name/categories" component={ShopMain} exact />
            <Route path="/page/:name" component={Page} exact />
            <Redirect from="/" to="/tabs" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
