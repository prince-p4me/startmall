import React, { useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonLabel,
  IonIcon,
  IonItem,
  IonHeader,
  IonToolbar,
  IonImg,
  getPlatforms
} from "@ionic/react";
import { logoFacebook, logoGoogle } from "ionicons/icons";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../model/DomainModels";
import { useHistory } from "react-router-dom";
import { cfaSignIn, mapUserToUserInfo } from "capacitor-firebase-auth";
import { UserInfo } from "firebase/app";
import { isPlatform } from "@ionic/core";

const Login: React.FC = () => {
  const firebase = useFirebase();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const history = useHistory();
  firebase.auth().onAuthStateChanged(function (user) {
    console.log("Login State changes");
    console.log(user);
  });

  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      console.log("User Logged in");
      history.push("/");
    }
  }, [auth, history]);

  async function loginWithGoogle() {
    // await Plugins.GoogleAuth.signOut();
    console.log("platfprms " + getPlatforms() + " platform is" + isPlatform("ios"));
    if (!isPlatform("ios")) {
      console.log("Google Web login start");
      return firebase
        .login({ provider: "google", type: "redirect" })
        .then(data => {
          console.log(data);
          history.push("/");
        })
        .catch(data => {
          console.log("Something Wrong with Google login.");
          console.log(data);
        });
    } else {
      return cfaSignIn("google.com")
        .pipe(mapUserToUserInfo())
        .subscribe((user: UserInfo) => console.log(user.displayName));
    }
  }

  function loginWithFacebook() {
    console.log("platfprms " + getPlatforms() + " platform is" + isPlatform("ios"));
    if (!isPlatform("ios")) {
      console.log("Facebook Web login start");
      return firebase
        .login({ provider: "facebook", type: "popup" })
        .then(data => {
          console.log(data);
          history.push("/");
        })
        .catch(data => {
          console.log("Something Wrong with Facebook login.");
          console.log(data);
        });
    } else {
      return cfaSignIn("facebook.com")
        .pipe(mapUserToUserInfo())
        .subscribe((user: UserInfo) => console.log(user.displayName));
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
        <IonImg class="startmall_header " src="/assets/icon/1x/logo2.png" />
      </IonHeader>
      <IonIcon
        className="login_icon"
        size="small"
        src="assets/icon/logo_small.svg"
      />

      <IonContent>
        <IonCard className="login_card">
          <IonCardContent>
            <IonButton
              color="facebook"
              fill="solid"
              className="facebook_button"
              onClick={loginWithFacebook}
            >
              <IonIcon icon={logoFacebook}></IonIcon>
              Sign up / Sign in with Facebook
            </IonButton>
            <IonButton
              color="google"
              fill="solid"
              className="google_button"
              onClick={loginWithGoogle}
            >
              <IonIcon icon={logoGoogle}></IonIcon>Sign up / Sign in with Google
            </IonButton>
            <IonItem lines="none">
              <IonLabel>- or -</IonLabel>
            </IonItem>
            <IonButton
              color="google"
              fill="solid"
              shape="round"
              className="wechat_button"
            >
              WeChat
            </IonButton>
            <div>
              <IonLabel>
                By signing up, you agree to Canva's <u>Terms of Use</u> and{" "}
                <u>Privacy Policy</u>.
              </IonLabel>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
