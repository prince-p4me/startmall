import React from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
  IonRouterOutlet} from "@ionic/react";
import {
  informationCircle,
  happy,
  cartSharp,
  rocketSharp} from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Market from "../containers/Market";

interface ContainerProps {
  name: string;
}

const MainTabs: React.FC<ContainerProps> = () => {
  return (

      
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/tabs" to="/tabs/dashboard" />
          <Route
            path="/tabs/dashboard"
            render={() => <Dashboard />}
            exact={true}
          />
          <Route path="/tabs/market" component={Market} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="today" href="/tabs/dashboard">
            <IonIcon icon={happy} />
            <IonLabel>Today</IonLabel>
            <IonBadge>6</IonBadge>
          </IonTabButton>

          <IonTabButton tab="market" href="/tabs/market">
            <IonIcon icon={cartSharp} />
            <IonLabel>Market</IonLabel>
          </IonTabButton>

          <IonTabButton tab="slashiee">
            <IonIcon icon={rocketSharp} />
            <IonLabel>Slashiee</IonLabel>
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
