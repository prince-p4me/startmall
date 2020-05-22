import Menu from "./components/Menu";
import Page from "./pages/Page";
import React, { useEffect } from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, useHistory } from "react-router-dom";

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
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ShopMain from "./containers/ShopMain";
import OrderComplete from "./pages/OrderComplete";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import MobileNumberLogin from './pages/MobileNumberLogin';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import PostCodeSearch from "./pages/PostcodeSearch";
import { StatusBar } from '@ionic-native/status-bar';
import { Plugins } from '@capacitor/core';

const { App: CapApp } = Plugins;
const stripePromise = loadStripe('pk_test_YC0gcyGppNgDEzsD5FxBzPXJ00nUQJqCvw');

const AppUrlListener: React.FC<any> = () => {
  let history = useHistory();
  useEffect(() => {
    CapApp.addListener('appUrlOpen', (data: any) => {
      // Example url: https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      const slug = data.url.split(".app").pop();
      if (slug) {
        history.push(slug);
      }
      // If no match, do nothing - let regular routing
      // logic take over
    });
  }, []);

  return null;
};


const App: React.FC = () => {
  useEffect(() => {
    StatusBar.overlaysWebView(false);
    StatusBar.styleDefault();
  }, []);

  console.log("entering app");
  return (
    <IonApp>
      <IonReactRouter>
        <Elements stripe={stripePromise}>
          <AppUrlListener />
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/page/postcode_search" component={PostCodeSearch} exact={true} />
              <Route path="/mobilelogin" component={MobileNumberLogin} exact={true} />
              {/* <ProtectedRoute  {...defaultProtectedRouteProps}  path="/page/checkout" component={Checkout} exact={true} /> */}
              <Route path="/page/checkout" component={Checkout} exact={true} />
              <Route path="/payment/:invoice_id" component={Payment} exact={true} />
              <Route path="/tabs" component={MainTabs} exact />
              <Route path="/tabs/:tab(market)/:market_id" component={MainTabs} exact />
              <Route path="/tabs/market/:market_id/:tab(item_list)/:category_id" component={MainTabs} exact />
              <Route path="/landing" component={Dashboard} exact />
              {/* <ProtectedRoute {...defaultProtectedRouteProps}  path="/shop_selections" component={ShopSelection} exact /> */}
              <Route path="/login" component={Login} exact />
              {/* <Route path="/wishlist/" component={FavoriteMarkets} exact /> */}
              <Route path="/favoriteitems/:market_id" component={WishList} exact />
              <Route path="/orders/:invoice_id" component={OrderComplete} exact />
              <Route path="/shop/:name/categories" component={ShopMain} exact />
              <Route path="/page/:name" component={Page} exact />
              <Redirect from="/" to="/tabs" exact />

            </IonRouterOutlet>
          </IonSplitPane>
        </Elements>
      </IonReactRouter>
    </IonApp>
  );
}
// };

export default App;
