import React, { useEffect, useState } from 'react';
import {
  getPlatforms,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { logoFacebook, logoGoogle } from 'ionicons/icons';
import { isEmpty, isLoaded, useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../model/DomainModels';
import { useHistory } from 'react-router-dom';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { isPlatform } from '@ionic/core';
import ErrorDisplay from '../components/ErrorDisplay';
import { ErrorProps } from '../model/ComponentProps';
import firebaseInstace from 'firebase';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';

const Login: React.FC = () => {
  const firebase = useFirebase();
  const auth = useSelector<RootState>((state) => state.firebase.auth);
  const history = useHistory();
  const db = firebase.firestore();
  const { t } = useTranslation();
  const [showLoading, setShowLoading] = useState(false);
  const [isMoved, setMoved] = useState(false);
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log('Login State changes');
      console.log(user);
      if (isLoaded(auth) && !isEmpty(auth)) {
        console.log('User Logged in');
        writeUserData(auth);
      }
    });
  });

  const writeUserData = (authObj: any) => {
    try {
      if (authObj.uid) {
        db.collection('Users')
          .doc(authObj.uid)
          .set({
            providerId: authObj.providerData[0].providerId,
            display_name: authObj.displayName, //displayName
            payment_detail: '', //
            contact_mobile: authObj.phoneNumber,
            address: {},
            photo_url: authObj.photoURL, //photoURL we get from firebase.auth() when sign in completed
            user_id: authObj.uid, // uid  we get from firebase.auth() when sign in completed
            email: authObj.email,
            role: ['user'],
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth) && isMoved) {
      console.log('User Logged in');
      setShowLoading(false);
      history.goBack();
    }
  }, [auth, history, isMoved]);

  const loginWithGoogle = () => {
    setErrorProps({
      ...errorProps,
      showError: false,
    });
    setShowLoading(true);
    console.log('platfprms ' + getPlatforms() + ' platform is' + isPlatform('ios'));
    if (isPlatform('mobileweb')) {
      console.log('Google Web login start');
      return firebase
        .login({ provider: 'google', type: 'popup' })
        .then((data) => {
          setMoved(true);
          setShowLoading(false);
          console.log(data);
        })
        .catch((data) => {
          console.log('Something Wrong with Google login. Please try again later');
          console.log(data);
          setShowLoading(false);
          setErrorProps({
            message: t('providerLoginFail', { provider: 'Google' }),
            showError: true,
            type: 1,
            autoHide: false,
            buttonText: '',
          });
        });
    } else {
      let params;
      if (isPlatform('android')) {
        params = {
          webClientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_URL,
          offline: true,
        };
      } else {
        params = {};
      }
      console.log(params);
      return GooglePlus.login(params)
        .then((res) => {
          firebase
            .auth()
            .signInWithCredential(firebaseInstace.auth.GoogleAuthProvider.credential(res.idToken))
            .then((success) => {
              setShowLoading(false);
              setMoved(true);
              console.log('Firebase success: ' + JSON.stringify(success));
            })
            .catch((error) => {
              console.log('mobile google login error =====', error);
              setShowLoading(false);
              setErrorProps({
                message: t('providerLoginFail', { provider: 'Google' }),
                showError: true,
                type: 1,
                autoHide: false,
                buttonText: '',
              });
            });
        })
        .catch((err) => {
          console.log('mobile google login err =====', err.message);
          setShowLoading(false);
          setErrorProps({
            message: t('providerLoginFail', { provider: 'Google' }),
            showError: true,
            type: 1,
            autoHide: false,
            buttonText: '',
          });
        });
    }
  };

  const loginWithFacebook = () => {
    setErrorProps({
      ...errorProps,
      showError: false,
    });
    setShowLoading(true);

    console.log('platfprms ' + getPlatforms() + ' platform is' + isPlatform('ios'));
    if (isPlatform('mobileweb')) {
      console.log('Facebook Web login start');
      return firebase
        .login({ provider: 'facebook', type: 'popup' })
        .then((data) => {
          setMoved(true);
          console.log(data);
        })
        .catch((data) => {
          console.log('Something Wrong with Facebook login. Please try again later');
          console.log(JSON.stringify(data));
          setShowLoading(false);
          setErrorProps({
            message: data && data.message ? data.message : t('providerLoginFail', { provider: 'Facebook' }),
            showError: true,
            type: 1,
            autoHide: false,
            buttonText: '',
          });
        });
    } else {
      return Facebook.login(['email'])
        .then((response) => {
          const facebookCredential = firebaseInstace.auth.FacebookAuthProvider.credential(
            response.authResponse.accessToken,
          );
          console.log('login result:--' + JSON.stringify(response));
          firebase
            .auth()
            .signInWithCredential(facebookCredential)
            .then((success) => {
              setMoved(true);
              console.log('Firebase success: ' + JSON.stringify(success));
            })
            .catch((data) => {
              setShowLoading(false);
              console.clear();
              console.log('error:==' + JSON.stringify(data));
              setErrorProps({
                message: data && data.message ? data.message : t('providerLoginFail', { provider: 'Facebook' }),
                showError: true,
                type: 1,
                autoHide: false,
                buttonText: '',
              });
            });
        })
        .catch((data) => {
          setShowLoading(false);
          setErrorProps({
            message: data && data.message ? data.message : t('providerLoginFail', { provider: 'Facebook' }),
            showError: true,
            type: 1,
            autoHide: false,
            buttonText: '',
          });
        });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
        <IonImg class="startmall_header " src="/assets/icon/1x/logo2.png" />
      </IonHeader>
      <IonIcon className="login_icon" size="small" src="assets/icon/logo_small.svg" />

      <IonContent>
        <IonCard className="login_card">
          <IonCardContent>
            <IonButton color="facebook" fill="solid" className="facebook_button" onClick={loginWithFacebook}>
              <IonIcon icon={logoFacebook}></IonIcon>
              {t('signUpInWithProvider', { provider: 'Facebook' })}
            </IonButton>
            <br></br>
            <br></br>
            <IonButton color="google" fill="solid" className="google_button" onClick={loginWithGoogle}>
              <IonIcon icon={logoGoogle}></IonIcon>
              {t('signUpInWithProvider', { provider: 'Google' })}
            </IonButton>
            <IonItem lines="none">
              <IonLabel>- {t('or')} -</IonLabel>
            </IonItem>
            <IonButton
              color="google"
              fill="solid"
              shape="round"
              className="wechat_button"
              onClick={() => {
                setErrorProps({ ...errorProps, showError: false });
                history.push('/mobilelogin');
              }}
            >
              {t('loginWithMobile')}
            </IonButton>
            <div>
              <IonLabel>{ReactHtmlParser(t('signUpPolicy'))}</IonLabel>
            </div>
          </IonCardContent>
        </IonCard>
        <ErrorDisplay
          errorProps={errorProps}
          closeHandler={() => {
            setErrorProps({ ...errorProps, showError: false });
            history.goBack();
          }}
        />
        <IonLoading isOpen={showLoading} message={t('pleaseWait')} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
