import {
  IonAvatar,
  IonButton,
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
} from '@ionic/react';

import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  bookmarkOutline,
  globeOutline,
  heartOutline,
  nutritionOutline,
  openOutline,
  rocketOutline,
} from 'ionicons/icons';
import './Menu.css';
import { AppPage, RootState } from '../model/DomainModels';
import { isEmpty, isLoaded, useFirebase, useFirestoreConnect } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import { UserInfo } from '@firebase/auth-types';
import { isPlatform, menuController } from '@ionic/core';
import { blankCart } from '../reducers/CartAction';
import { StatusBar } from '@ionic-native/status-bar';
import { take } from 'lodash';

import FeedbackComponent from './FeedbackComponent';
import { useTranslation } from 'react-i18next';
import LanguageSelectionModal from '../containers/LanguageSelection';

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
  const [isOpenLanguageSelection, setIsOpenLanguageSelection] = useState(false);
  const auth: UserInfo = useSelector<RootState>((state) => state.firebase.auth) as UserInfo;
  const Invoices = useSelector<RootState>((state) => state.invoice.Invoices) as [];

  const isAuthenticated = isLoaded(auth) && !isEmpty(auth);
  const isWeb = !isPlatform('ios') || isPlatform('mobileweb');

  useFirestoreConnect([{ collection: 'Users', doc: auth.uid }]);

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
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const avatarUSer = () => {
    const displayNameArry = auth.displayName?.split(' ');
    return displayNameArry ? displayNameArry[0][0] + displayNameArry[1][0] : '';
  };

  return (
    <IonMenu contentId="main" type="overlay" side="end">
      <IonContent className={'ion-margin-top'}>
        <IonList className="inbox-list">
          <IonListHeader>
            {isAuthenticated && (
              <>
                <IonAvatar>
                  {userPhoto ? (
                    <IonImg src={userPhoto}></IonImg>
                  ) : (
                    <div className={'avatar-latter'}>{auth.displayName ? avatarUSer() : ''}</div>
                  )}
                </IonAvatar>
                <IonList lines="none">
                  <IonItem>{auth.displayName || auth.phoneNumber}</IonItem>
                  <IonItem className={'header-email-label'}>{auth.email}</IonItem>
                </IonList>
              </>
            )}
          </IonListHeader>
          {appPages.map((appPage, index) => {
            return !isPageHasPermission(appPage) ? (
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
          <IonItem lines="none" onClick={() => setIsOpenLanguageSelection(true)}>
            <IonIcon slot="start" icon={globeOutline} />
            <IonLabel>Language</IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon slot="start" icon={openOutline}></IonIcon>
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
        {isAuthenticated && (
          <IonList className="labels-list">
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
        )}
        <LanguageSelectionModal
          modal={isOpenLanguageSelection}
          closeHandler={() => setIsOpenLanguageSelection(false)}
        ></LanguageSelectionModal>
      </IonContent>
      <IonFooter onClick={async () => await menuController.toggle()} className={'ion-padding-top'}>
        <IonItem lines="none">
          {isLoaded(auth) && !isEmpty(auth) ? (
            <IonButton slot={'end'} expand="full" onClick={handleSignOut}>
              {t('signOut')}
            </IonButton>
          ) : (
            <IonButton slot={'end'} expand="full" routerLink="/login" routerDirection="none">
              {t('signIn')}
            </IonButton>
          )}
        </IonItem>
        <IonItem lines="none">
          <IonLabel>
            <FeedbackComponent />
          </IonLabel>
        </IonItem>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
