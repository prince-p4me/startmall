import {
  IonAvatar,
  IonContent,
  IonFooter,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { bookmarkOutline, heartOutline, nutritionOutline, rocketOutline } from 'ionicons/icons';
import './Menu.css';
import { AppPage, RootState } from '../model/DomainModels';
import { FirestoreReducer, isEmpty, isLoaded, useFirebase, useFirestoreConnect } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import { UserInfo } from '@firebase/auth-types';
import { isPlatform, menuController } from '@ionic/core';
import { blankCart } from '../reducers/CartAction';
import { StatusBar } from '@ionic-native/status-bar';
import { take } from 'lodash';

import FeedbackComponent from './FeedbackComponent';
import { useTranslation } from 'react-i18next';

const appPages: AppPage[] = [
  {
    title: 'myProfile',
    url: '/page/MyProfile',
    iosIcon: rocketOutline,
    mdIcon: rocketOutline,
    slug: 'my-profile',
  },
  {
    title: 'wishList',
    url: '/wishlist',
    iosIcon: heartOutline,
    mdIcon: heartOutline,
    slug: 'wishList',
  },
  {
    title: 'checkOut',
    url: '/page/checkout',
    iosIcon: rocketOutline,
    mdIcon: rocketOutline,
    slug: 'checkout',
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [userPhoto, setUserPhoto] = useState('');
  const auth: UserInfo = useSelector<RootState>((state) => state.firebase.auth) as UserInfo;

  const isWeb = !isPlatform('ios') || isPlatform('mobileweb');

  useFirestoreConnect([{ collection: 'Users', doc: auth.uid }]);

  const stateStore = useSelector<RootState>((state) => state.firestore) as FirestoreReducer.Reducer;

  const Invoices = useSelector<RootState>((state) => state.invoice.Invoices) as [];

  useEffect(() => {
    setUserPhoto(auth.photoURL as string);
    StatusBar.overlaysWebView(false);
    StatusBar.styleDefault();
  }, [auth, auth.photoURL]);

  const handleSignOut = () => {
    setUserPhoto('');
    dispatch(blankCart());
    firebase.logout().then(() => {
      history.push('/');
    });
  };

  const isPageHasPermission = (appPage: AppPage) => {
    if (appPage.slug === 'my-profile') {
      if (isLoaded(auth) && !isEmpty(auth)) {
        if (stateStore.ordered.Users && stateStore.ordered?.Users[0]?.roles?.indexOf('admin') === -1) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    }
    return false;
  };

  return (
    <IonMenu contentId="main" type="overlay" side="end">
      <IonContent className={'ion-margin-top'}>
        <IonList id="inbox-list" className={'ion-margin-top'}>
          <IonListHeader>
            <IonItem lines="none">{auth.displayName}</IonItem>
            <IonAvatar>{userPhoto ? <IonImg src={userPhoto}></IonImg> : <p></p>}</IonAvatar>
          </IonListHeader>
          <IonNote>{auth.email}</IonNote>
          {appPages.map((appPage, index) => {
            return isPageHasPermission(appPage) ? (
              <div key={index}></div>
            ) : (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={
                    appPage.url === '/page/checkout' || appPage.url === '/wishlist'
                      ? isLoaded(auth) && !isEmpty(auth)
                        ? appPage.url
                        : '/login'
                      : appPage.url
                  }
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{t(appPage.title)}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonItem lines="none">
            <IonIcon slot="start" icon={nutritionOutline}></IonIcon>
            <IonLabel>
              <a className={'router-link'} href="https://startmall-admin.web.app">
                {t('ownerApp')}
              </a>
            </IonLabel>
          </IonItem>
          {isWeb && (
            <IonItem lines="none">
              <IonIcon slot="start" icon={nutritionOutline}></IonIcon>
              <IonLabel>
                <a className={'router-link'} href="startmall://startmall.web.app/tabs/market/FtSvVlEa4G4xHduMnf2l">
                  smartmall deeplink
                </a>
              </IonLabel>
            </IonItem>
          )}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Previous Orders</IonListHeader>
          {take(Invoices, 5).map((invoice: any) => (
            <IonMenuToggle key={invoice.id}>
              <IonItem lines="none" routerLink={`/orders/${invoice.id}`} routerDirection="none" detail={false}>
                <IonIcon slot="start" icon={bookmarkOutline} />
                <IonLabel>{invoice.id}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
        <IonFooter onClick={async () => await menuController.toggle()}>
          {isLoaded(auth) && !isEmpty(auth) ? (
            <IonItem onClick={handleSignOut}>{t('signOut')}</IonItem>
          ) : (
            <IonItem routerLink="/login" routerDirection="none" detail={false}>
              {t('signIn')}
            </IonItem>
          )}
          <IonItem>
            <IonLabel>
              <FeedbackComponent />
            </IonLabel>
          </IonItem>
        </IonFooter>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
