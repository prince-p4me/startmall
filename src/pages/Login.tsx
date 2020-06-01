import React, { useEffect, useState } from "react";
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
  getPlatforms,
  IonLoading
} from "@ionic/react";
import { logoFacebook, logoGoogle } from "ionicons/icons";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../model/DomainModels";
import { useHistory } from "react-router-dom";
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook'
import { isPlatform } from "@ionic/core";
import ErrorDisplay from "../components/ErrorDisplay";
import { ErrorProps } from "../model/ComponentProps";
import firebaseInstace from "firebase";


const Login: React.FC = () => {
  const firebase = useFirebase();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const history = useHistory();
  const db = firebase.firestore();
  const [showLoading, setShowLoading] = useState(false);
  const [isMoved, setMoved] = useState(false)
  // const [showError, setShowError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log("Login State changes");
      console.log(user);
      if (isLoaded(auth) && !isEmpty(auth)) {
        console.log("User Logged in");
        writeUserData(auth);
      }
    });
  }, []);

  const writeUserData = (auth1: any) => {
    try {
      let auth2 = JSON.parse(JSON.stringify(auth1));
      db.collection("Users")
        .doc(auth2.uid)
        .set({
          providerId: auth2.providerData[0].providerId,
          display_name: auth2.displayName, //displayName
          payment_detail: "", //
          contact_mobile: auth2.phoneNumber,
          address: {},
          photo_url: auth2.photoURL, //photoURL we get from firebase.auth() when sign in completed
          user_id: auth2.uid, // uid  we get from firebase.auth() when sign in completed
          email: auth2.email,
          role:['user']
        });
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth) && isMoved) {
      console.log("User Logged in");
      // history.push("/");
      setShowLoading(false);
      history.goBack();
    }
  }, [auth, history, isMoved]);

  async function loginWithGoogle() {
    setErrorProps({
      ...errorProps,
      showError: false
    })
    setShowLoading(true);
    // await Plugins.GoogleAuth.signOut();
    console.log(
      "platfprms " + getPlatforms() + " platform is" + isPlatform("ios")
    );
    if (isPlatform("mobileweb")) {
      console.log("Google Web login start");
      return firebase
        .login({ provider: "google", type: "popup" })
        .then(data => {
          setMoved(true)
        })
        .catch(data => {
          console.log("Something Wrong with Google login. Please try again later");
          console.log(data);
          setShowLoading(false);
          setErrorProps({
            message: "Something Wrong with Google login. Please try again later",
            showError: true,
            type: 1,
            autoHide: false,
            buttonText: ""
          });

        });
    } else {
      let params;
      if (isPlatform('android')) {
        params = {
          'webClientId': process.env.REACT_APP_GOOGLE_AUTH_CLIENT_URL,
          'offline': true
        }
      }
      else {
        params = {}
      }
      console.log(params);
      return GooglePlus.login(params)
        .then(res => {
          firebase.auth().signInWithCredential(
            firebaseInstace.auth.GoogleAuthProvider.credential(res.idToken)
          ).then(success => {
            setShowLoading(false);
            setMoved(true);
            console.log("Firebase success: " + JSON.stringify(success));
          })
            .catch(error => {
              console.log('mobile google login error =====', error)
              setShowLoading(false);
              setErrorProps({
                message: "Something Wrong with Google login. Please try again later",
                showError: true,
                type: 1,
                autoHide: false,
                buttonText: ""
              });
            });
        })
        .catch(err => {
          console.log('mobile google login err =====', err.message);
          setShowLoading(false);
          setErrorProps({
            message: "Something Wrong with Google login. Please try again later",
            showError: true,
            type: 1,
            autoHide: false,
            buttonText: ""
          });
        });
    }
  }

  function loginWithFacebook() {
    setErrorProps({
      ...errorProps,
      showError: false
    });
    setShowLoading(true);

    console.log(
      "platfprms " + getPlatforms() + " platform is" + isPlatform("ios")
    );
    if (isPlatform("mobileweb")) {
      console.log("Facebook Web login start");
      return firebase
        .login({ provider: "facebook", type: "popup" })
        .then(data => {
          setMoved(true)
          console.log(data);
        })
        .catch(data => {
          console.log("Something Wrong with Facebook login. Please try again later");
          console.log(JSON.stringify(data));
          setShowLoading(false);
          setErrorProps({
            message: (data && data.message) ? data.message : "Something Wrong with Facebook login. Please try again later",
            showError: true,
            type: 1,
            autoHide: false,
            buttonText: ""
          })

        });
    } else {
      return Facebook.login(['email'])
        .then(response => {
          const facebookCredential = firebaseInstace.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);
          console.log("login result:--" + JSON.stringify(response));
          firebase.auth().signInWithCredential(facebookCredential)
            .then(success => {
              setMoved(true);
              console.log("Firebase success: " + JSON.stringify(success));
            })
            .catch(data => {
              setShowLoading(false);
              console.clear();
              console.log("error:==" + JSON.stringify(data));
              setErrorProps({
                message: (data && data.message) ? data.message : "Something Wrong with Facebook login. Please try again later",
                showError: true,
                type: 1,
                autoHide: false,
                buttonText: ""
              });
            });
        })
        .catch(data => {
          setShowLoading(false);
          setErrorProps({
            message: (data && data.message) ? data.message : "Something Wrong with Facebook login. Please try again later",
            showError: true,
            type: 1,
            autoHide: false,
            buttonText: ""
          });
        });
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
            <br></br>
            <br></br>
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
              onClick={() => { setErrorProps({ ...errorProps, showError: false }); history.push("/mobilelogin"); }}
            >
              Login with Mobile
            </IonButton>
            <div>
              <IonLabel>
                By signing up, you agree to StartMall's <u>Terms of Use</u> and{" "}
                <u>Privacy Policy</u>.
              </IonLabel>
            </div>
          </IonCardContent>
        </IonCard>
        {/* <ErrorDisplay type={1} message={errorMessage} autoHide={false} showToast={showError} closehandler={() => { setShowError(false); history.goBack(); }} eventHandler={() => {}} buttonText={""}  /> */}
        <ErrorDisplay errorProps={errorProps} closeHandler={() => { setErrorProps({ ...errorProps, showError: false }); history.goBack(); }} eventHandler={() => { }} />
        <IonLoading isOpen={showLoading} message={"Please wait..."} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
