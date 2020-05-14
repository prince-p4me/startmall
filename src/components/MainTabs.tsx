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
  // const defaultProtectedRouteProps = getDefaultProtectedRouteProps();

  return (
    <IonTabs>
      <IonTabBar slot="bottom" >
        <IonTabButton tab="today" href="/tabs/dashboard">
          <IonIcon icon={happy} />
          <IonLabel>Today</IonLabel>
          <IonBadge>6</IonBadge>
        </IonTabButton>

        <IonTabButton tab="market" href="/tabs/shop_selections/">
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
