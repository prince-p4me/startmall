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
import { Redirect, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Market from "../containers/Market";
import MarketItems from "../containers/MarketItems";
import { MainTabsProps } from "../model/ComponentProps";
import ShopSelection from "../pages/ShopSelection";

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route
          animated={false}
          path="/tabs/dashboard"
          render={() => <Dashboard />}
          exact={true}
        />
        <Route
          path="/tabs/market/:market_id/:tab(item_list)/:category_id"
          render={() => <MarketItems cname="" />}
        />
        <Route
          path="/tabs/:tab(shop_selections)"
          render={() => <ShopSelection />}
          exact={true}
        />
        <Route
          path="/tabs/:tab(market)/:market_id"
          render={() => <Market />}
          exact={true}
        />
        <Redirect exact path="/tabs" to="/tabs/dashboard" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="today" href="/tabs/dashboard">
          <IonIcon icon={happy} />
          <IonLabel>Today</IonLabel>
          <IonBadge>6</IonBadge>
        </IonTabButton>

        <IonTabButton tab="market" href="/tabs/shop_selections">
          <IonIcon icon={cartSharp} />
          <IonLabel>Market</IonLabel>
        </IonTabButton>

        <IonTabButton tab="slashiee">
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
