import Menu from "./components/Menu";
import Page from "./pages/Page";
import React, {useEffect, useState} from "react";
import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";
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
import ShopSelection from "./pages/ShopSelection";
import FavoriteMarkets from "./pages/FavoriteMarkets";
import MarketItems from "./containers/MarketItems";
import Market from "./containers/Market";
import {cartSharp, happy, heart, heartCircle, heartOutline, informationCircle} from "ionicons/icons";
import {isEmpty, isLoaded, useFirebase} from "react-redux-firebase";
import { UserInfo } from "firebase";
import {connect, useDispatch, useSelector} from "react-redux";
import { RootState } from "./model/DomainModels";
import { CartState } from "./services/FirebaseIniti";
import Cart from "./pages/Cart";

import {listInvoices} from './reducers/InvoicesAction'

const { App: CapApp } = Plugins;
const stripePromise = loadStripe('pk_test_YC0gcyGppNgDEzsD5FxBzPXJ00nUQJqCvw');

const { Stripe } = Plugins;
Stripe.setPublishableKey({ key: 'pk_test_YC0gcyGppNgDEzsD5FxBzPXJ00nUQJqCvw' });

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

  const db = useFirebase().firestore();
  const dispatch = useDispatch();
  const auth: UserInfo = useSelector<RootState>(
      state => state.firebase.auth
  ) as UserInfo;

  const CartBadge: React.FC<CartState> = ({ cart }) => {
    const cartSize = cart.cartItemList.length;
    if (cartSize > 0) {
      return <IonBadge color="danger">{cart.cartItemList.length}</IonBadge>;
    } else {
      return <></>;
    }
  };

  function mapStateToProps(state: CartState) {
    const { firebase, cart, shop } = state;
    return { firebase, cart, shop };
  }
  const [ CartCounter ] = useState<React.ElementType>(connect(mapStateToProps)(CartBadge));

  if(auth && auth.uid){
    const docRef = db.collection("Invoices");
    docRef.where('user_id', '==', auth.uid).get().then(function (snapshot) {
      if (snapshot.size < 0) {
        dispatch(listInvoices([]))
      } else {
        const tmp: any = []
        snapshot.forEach(doc => {
          tmp.push({ ...doc.data(), id: doc.id,})
        })
        dispatch(listInvoices(tmp))
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

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
              <Route path="/page/cart" component={Cart} exact={true} />
              <Route path="/page/checkout" component={Checkout} exact={true} />
              <Route path="/payment/:invoice_id" component={Payment} exact={true} />
              <IonTabs>
                <IonRouterOutlet>
                  <Route
                      path="/tabs/market/:market_id/:tab(item_list)/:category_id"
                      render={() => <MarketItems cname="" />}
                  />
                  <Route
                      path="/tabs/:tab(market)/:market_id"
                      render={() => <Market />}
                      exact={true}
                  />
                  <Route
                      animated={false}
                      path="/tabs/dashboard"
                      render={() => <Dashboard />}
                      exact={true}
                  />
                  <Route path="/tabs/:tab(shop_selections)/:postcode" render={() => <ShopSelection />} exact={true} />
                  <Route path="/wishlist" component={FavoriteMarkets} exact />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="today" href="/tabs">
                    <IonIcon icon={happy} />
                    <IonLabel>Today</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="cart" href="/page/cart">
                    <IonIcon icon={cartSharp} />
                    <IonLabel>Cart</IonLabel>
                    <CartCounter></CartCounter>
                  </IonTabButton>

                  <IonTabButton tab="my list" href={(isLoaded(auth) && !isEmpty(auth))?"/wishlist":"/login"}>
                    <IonIcon icon={heartCircle} />
                    <IonLabel>My List</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="about">
                    <IonIcon icon={informationCircle} />
                    <IonLabel>About</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
              <Route path="/landing" component={Dashboard} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/favoriteitems/:market_id" component={WishList} exact />
              <Route path="/orders/:invoice_id" component={OrderComplete} exact />
              <Route path="/shop/:name/categories" component={ShopMain} exact />
              <Route path="/page/:name" component={Page} exact />
              <Redirect from="/" to="/tabs/dashboard" exact />
              <Redirect from="/tabs" to="/tabs/dashboard" exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </Elements>
      </IonReactRouter>
    </IonApp>
  );
}
// };

export default App;
