import React from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
  IonRouterOutlet
} from "@ionic/react";
import {
  informationCircle,
  happy,
  cartSharp,
  heartCircle
} from "ionicons/icons";
import { MainTabsProps } from "../model/ComponentProps";
import { Route, Redirect } from "react-router";
import MarketItems from "../containers/MarketItems";
import ShopSelection from "../pages/ShopSelection";
import Market from "../containers/Market";
import { IonReactRouter } from "@ionic/react-router";
import Dashboard from "../pages/Dashboard";
import FavoriteMarkets from "../pages/FavoriteMarkets";
import WishList from "../pages/SamplePage";

const MainTabs: React.FC<MainTabsProps> = () => {
  // const defaultProtectedRouteProps = getDefaultProtectedRouteProps();

  return (
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
        <Route
          path="/tabs/:tab(shop_selections)/:postcode"
          render={() => <ShopSelection />}
          exact={true}
        />
        <Route path="/wishlist" component={FavoriteMarkets} exact />
        {/* <Route path="/favoriteitems/:market_id" component={WishList} exact /> */}
        <Redirect from="/tabs" to="/tabs/dashboard" exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="today" href="/tabs">
          <IonIcon icon={happy} />
          <IonLabel>Today</IonLabel>
        </IonTabButton>

        <IonTabButton tab="market" href="/tabs/shop_selections/">
          <IonIcon icon={cartSharp} />
          <IonLabel>Market</IonLabel>
        </IonTabButton>

        <IonTabButton tab="my list" href="/wishlist">
          <IonIcon icon={heartCircle} />
          <IonLabel>My List</IonLabel>
        </IonTabButton>

        <IonTabButton tab="about">
          <IonIcon icon={informationCircle} />
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
