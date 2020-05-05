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

import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { bookmarkOutline, rocketOutline } from "ionicons/icons";
import "./Menu.css";
import { AppPage, RootState } from "../model/DomainModels";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { UserInfo } from "@firebase/auth-types";

const appPages: AppPage[] = [
  {
    title: "My Profile",
    url: "/page/MyProfile",
    iosIcon: rocketOutline,
    mdIcon: rocketOutline
  },
  {
    title: "Check Out",
    url: "/page/checkout",
    iosIcon: rocketOutline,
    mdIcon: rocketOutline
  }

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
  const history = useHistory();
  const [userPhoto, setUserPhoto] = useState("");
  const auth: UserInfo = useSelector<RootState>(
    state => state.firebase.auth
  ) as UserInfo;
  console.log(auth);
  useEffect(() => {
    setUserPhoto(auth.photoURL as string);
  });
  function handleSignOut() {
    setUserPhoto("");
    firebase.logout().then(() => {
      history.push("/");
    });
  }
  return (
    <IonMenu contentId="main" type="overlay" side="end">
      <IonContent>
        <IonList id="inbox-list">
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
                  routerLink={appPage.url}
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
        <IonFooter>
          {isLoaded(auth) && !isEmpty(auth) ? (
            <IonItem onClick={handleSignOut}>Sign Out</IonItem>
          ) : (
            <IonItem routerLink="/login" routerDirection="none" detail={false}>
              Sign In
            </IonItem>
          )}
        </IonFooter>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
