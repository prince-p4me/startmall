import React from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { cartSharp, happy, heartCircle, informationCircle } from 'ionicons/icons';
import { MainTabsProps } from '../model/ComponentProps';
import { Redirect, Route } from 'react-router';
import MarketItems from '../containers/MarketItems';
import ShopSelection from '../pages/ShopSelection';
import Market from '../containers/Market';
import Dashboard from '../pages/Dashboard';
import FavoriteMarkets from '../pages/FavoriteMarkets';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { UserInfo } from 'firebase';
import { RootState } from '../model/DomainModels';
import { useSelector } from 'react-redux';

const MainTabs: React.FC<MainTabsProps> = () => {
  const auth: UserInfo = useSelector<RootState>((state) => state.firebase.auth) as UserInfo;

  return (
    <div>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tabs/market/:market_id/:tab(item_list)/:category_id" render={() => <MarketItems cname="" />} />
          <Route path="/tabs/:tab(market)/:market_id" render={() => <Market />} exact={true} />
          <Route animated={false} path="/tabs/dashboard" render={() => <Dashboard />} exact={true} />
          <Route path="/tabs/:tab(shop_selections)/:postcode" render={() => <ShopSelection />} exact={true} />
          <Route path="/wishlist" component={FavoriteMarkets} exact />
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

          <IonTabButton tab="my list" href={isLoaded(auth) && !isEmpty(auth) ? '/wishlist' : '/login'}>
            <IonIcon icon={heartCircle} />
            <IonLabel>My List</IonLabel>
          </IonTabButton>

          <IonTabButton tab="about">
            <IonIcon icon={informationCircle} />
            <IonLabel>About</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </div>
  );
};

export default MainTabs;
