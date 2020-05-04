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
  IonImg
} from "@ionic/react";
import { logoFacebook, logoGoogle } from "ionicons/icons";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../model/DomainModels";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const firebase = useFirebase();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const history = useHistory();
  firebase.auth().onAuthStateChanged(changes => {
    console.log("Login State changes");
    console.log(changes);
  });
  console.log(auth);

  useEffect(() => {
    console.log("User Logged in");
    if (isLoaded(auth) && !isEmpty(auth)) {
      console.log("User Logged in");
      history.push("/");
    }
  }, [auth, history]);

  function loginWithGoogle() {
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
  }

  function loginWithFacebook() {
    return firebase
      .login({ provider: "facebook", type: "redirect" })
      .then(data => {
        console.log(data);
        history.push("/");
      })
      .catch(data => {
        console.log("Something Wrong with Facebook login.");
        console.log(data);
      });
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
              shape="round"
              className="facebook_button"
              onClick={loginWithFacebook}
            >
              <IonIcon icon={logoFacebook}></IonIcon>
              Sign up / Sign in with Facebook
            </IonButton>
            <IonButton
              color="google"
              fill="solid"
              shape="round"
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