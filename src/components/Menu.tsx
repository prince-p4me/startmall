import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonAvatar,
  IonImg,
  IonFooter
} from "@ionic/react";

import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  bookmarkOutline,
  heartOutline,
  rocketOutline,
  nutritionOutline
} from "ionicons/icons";
import "./Menu.css";
import { AppPage, RootState } from "../model/DomainModels";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import { UserInfo } from "@firebase/auth-types";
import { isPlatform, menuController } from "@ionic/core";
import { blankCart } from "../reducers/CartAction";
// import firebase from "firebase";
import { StatusBar } from '@ionic-native/status-bar';

import FeedbackComponent from './FeedbackComponent'

const appPages: AppPage[] = [
  {
    title: "My Profile",
    url: "/page/MyProfile",
    iosIcon: rocketOutline,
    mdIcon: rocketOutline
  },
  {
    title: "WishList",
    url: "/wishlist",
    iosIcon: heartOutline,
    mdIcon: heartOutline
  },
  {
    title: "Check Out",
    url: "/page/checkout",
    iosIcon: rocketOutline,
    mdIcon: rocketOutline
  }

  // {
  //   title: "Shop Owner",
  //   url: "https://startmall-admin.web.app",
  //   iosIcon: nutritionOutline,
  //   mdIcon: nutritionOutline
  // }

  // {
  //   title: 'Outbox',
  //   url: '/page/Outbox',
  //   iosIcon: paperPlaneOutline,
  //   mdIcon: paperPlaneSharp
  // },
  // {
  //   title: 'Favorites',
  //   url: '/page/Favorites',
  //   iosIcon: heartOutline,
  //   mdIcon: heartSharp
  // },
  // {
  //   title: 'Archived',
  //   url: '/page/Archived',
  //   iosIcon: archiveOutline,
  //   mdIcon: archiveSharp
  // },
  // {
  //   title: 'Trash',
  //   url: '/page/Trash',
  //   iosIcon: trashOutline,
  //   mdIcon: trashSharp
  // },
  // {
  //   title: 'Spam',
  //   url: '/page/Spam',
  //   iosIcon: warningOutline,
  //   mdIcon: warningSharp
  // }
];

const labels = ["#11321", "#21322", "#43211"];

const Menu: React.FC = () => {
  const location = useLocation();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const history = useHistory();
  const [userPhoto, setUserPhoto] = useState("");
  const auth: UserInfo = useSelector<RootState>(
    state => state.firebase.auth
  ) as UserInfo;

  const isWeb = !isPlatform("ios") || isPlatform("mobileweb");

  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      // console.clear();
      // console.log("User Logged in and user is:==" + JSON.stringify(auth));
      // history.push("/");
    }
    setUserPhoto(auth.photoURL as string);
    StatusBar.overlaysWebView(false);
    StatusBar.styleDefault();
  }, [auth, auth.photoURL]);

  function handleSignOut() {
    setUserPhoto("");
    dispatch(blankCart());
    firebase.logout().then(() => {
      history.push("/");
    });
  }
  return (
    <IonMenu contentId="main" type="overlay" side="end">
      <IonContent className={'ion-margin-top'}>
        <IonList id="inbox-list" className={'ion-margin-top'}>
          <IonListHeader>
            <IonItem lines="none">{auth.displayName}</IonItem>
            <IonAvatar>
              {userPhoto ? <IonImg src={userPhoto}></IonImg> : <p></p>}
            </IonAvatar>
          </IonListHeader>
          <IonNote>{auth.email}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={
                    appPage.url === "/page/checkout" ||
                      appPage.url === "/wishlist"
                      ? isLoaded(auth) && !isEmpty(auth)
                        ? appPage.url
                        : "/login"
                      : appPage.url
                  }
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonItem lines="none">
            <IonIcon slot="start" icon={nutritionOutline}></IonIcon>
            <IonLabel>
              <a href="https://startmall-admin.web.app">Owner App </a>
            </IonLabel>
          </IonItem>
          {
            isWeb &&
            <IonItem lines="none">
              <IonIcon slot="start" icon={nutritionOutline}></IonIcon>
              <IonLabel>
                <a href="startmall://startmall.web.app/tabs/market/FtSvVlEa4G4xHduMnf2l">smartmall deeplink </a>
              </IonLabel>
            </IonItem>
          }
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Previous Orders</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonFooter onClick={async () => await menuController.toggle()}>

          {isLoaded(auth) && !isEmpty(auth) ? (
            <IonItem onClick={handleSignOut}>Sign Out</IonItem>
          ) : (
              <IonItem routerLink="/login" routerDirection="none" detail={false}>
                Sign In
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
