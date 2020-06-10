import React, { useEffect, useRef, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import GoBack from '../components/GoBack';
import firebaseApp from 'firebase/app';
import { useHistory } from 'react-router-dom';
import ErrorDisplay from '../components/ErrorDisplay';
import { ErrorProps } from '../model/ComponentProps';
import { isPlatform } from '@ionic/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import firebaseInstace from 'firebase';

import './MobileNumberLogin.css';
import { useFirebase } from 'react-redux-firebase';

const MobileNumberLogin: React.FC = () => {
  const otpInput = useRef<any>();
  const firebase = useFirebase();
  const history = useHistory();
  const { t } = useTranslation();
  console.log('Mobile number login');
  const [showLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState<string | null | undefined>(
    process.env.REACT_APP_ENV === 'dev' ? ('62335535' as string) : '',
  );
  const [verificationId, setVerificationId] = useState('');
  const [isNumberAdded, setIsNumberAdded] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<any>();
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);
  const [timeLeft, setTimeLeft] = useState(60);
  const [country, setCountry] = useState<string>('+852');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const countryList: any = {
    '+61': 'AU',
    '+65': 'SG',
    '+852': 'HK',
    '+1': 'US',
    '+86': 'CN',
    '+44': 'GB',
    '+91': 'IN',
  };

  useIonViewDidEnter(() => {
    setIsNumberAdded(false);
  });

  const sendVerificationCode = () => {
    setVerificationCode('');
    const phoneNumberString = (country + mobileNumber) as string;
    if (!isPlatform('ios') || isPlatform('mobileweb')) {
      const appVerifier = new firebaseApp.auth.RecaptchaVerifier('sign-in-button', {
        size: 'invisible',
      });
      console.log(mobileNumber);
      firebaseApp
        .auth()
        .signInWithPhoneNumber(phoneNumberString, appVerifier)
        .then((confirmationResult: any) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          appVerifier.clear();
          console.log('confirmationResult' + confirmationResult);
          setConfirmationCode(confirmationResult);
          setTimeLeft(60);
          setIsNumberAdded(true);
        })
        .catch((error) => {
          console.error('SMS not sent', error);
          setErrorProps({
            message: t('smsSentError', { msg: error.message }),
            showError: true,
            type: 1,
            autoHide: true,
            buttonText: '',
          });
        });
    } else {
      FirebaseAuthentication.verifyPhoneNumber(phoneNumberString, 60000)
        .then((verificationId) => {
          setVerificationId(verificationId);
          setTimeLeft(60);
          setIsNumberAdded(true);
        })
        .catch((error) => {
          console.error('SMS not sent', error);
          setErrorProps({
            message: t('smsSentError', { msg: error.message }),
            showError: true,
            type: 1,
            autoHide: true,
            buttonText: '',
          });
        });
    }
  };

  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const verifyCode = () => {
    if (!verificationCode) {
      alert(t('properVerificationCode'));
      return;
    }
    const code = verificationCode;
    console.log('code is:==' + code);
    if (!isPlatform('ios') || isPlatform('mobileweb')) {
      confirmationCode
        .confirm(code)
        .then((res: any) => {
          console.log('verification success:--' + JSON.stringify(res));
          history.push('/');
        })
        .catch((err: any) => {
          console.log('Error in verification', err);
          setErrorProps({
            message: err.message,
            showError: true,
            type: 1,
            autoHide: true,
            buttonText: '',
          });
        });
    } else {
      firebase
        .auth()
        .signInWithCredential(firebaseInstace.auth.PhoneAuthProvider.credential(verificationId, code))
        .then((res) => {
          console.log('verification device success:--' + JSON.stringify(res));
          history.push('/');
        })
        .catch((err: any) => {
          console.log('Error in verification', err);
          setErrorProps({
            message: err.message,
            showError: true,
            type: 1,
            autoHide: true,
            buttonText: '',
          });
        });
    }
  };

  const stopCarret = (e: any) => {
    if (e.target.value.length > 5 && e.keyCode !== 8) {
      e.preventDefault();
    }
  };

  return (
    <IonPage>
      <div id="sign-in-button"></div>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButtons slot="start">
              <GoBack />
            </IonButtons>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="center">
        {!isNumberAdded ? (
          <>
            <IonItem className="mobile_login_header" lines="none">
              <IonLabel>
                <b>{t('yourMobileNumber')}</b>
              </IonLabel>
            </IonItem>
            <IonItem style={{ marginTop: '20%' }} lines="none">
              <IonSelect
                value={country}
                interfaceOptions={{
                  header: 'Country',
                  subHeader: 'Select your country code',
                }}
                selectedText={country}
                mode={'ios'}
                onIonChange={(e) => setCountry(e.detail.value)}
                className={'country-selector'}
              >
                <IonSelectOption value="+61">Australia (+61)</IonSelectOption>
                <IonSelectOption value="+65">Singapore (+65)</IonSelectOption>
                <IonSelectOption value="+852">Hk (+852)</IonSelectOption>
                <IonSelectOption value="+1">US (+1)</IonSelectOption>
                <IonSelectOption value="+86">China (+86)</IonSelectOption>
                <IonSelectOption value="+44">UK (+44)</IonSelectOption>
                <IonSelectOption value="+91">India (+91)</IonSelectOption>
              </IonSelect>
              <ReactCountryFlag className={'country-flag'} countryCode={countryList[country]} />
              <IonInput
                type="number"
                placeholder="33123123"
                value={mobileNumber}
                onIonChange={(e) => {
                  setMobileNumber(e.detail.value);
                }}
                className={'input-mobile-number'}
              ></IonInput>
            </IonItem>
            <IonButton
              className="center"
              style={{ marginTop: '20%' }}
              color="secondary"
              fill="solid"
              onClick={() => {
                sendVerificationCode();
              }}
            >
              {t('sendVerificationCode')}
            </IonButton>
          </>
        ) : null}

        {isNumberAdded ? (
          <>
            <IonItem className="mobile_login_header" lines="none">
              <IonLabel>
                <b>{t('verifyYourNumber')}</b>
              </IonLabel>
            </IonItem>
            <IonItem className="center" lines="none">
              <IonLabel color="shade">
                <p>{t('smsSent')}</p>
                <p>{mobileNumber ? country + mobileNumber : '+61 321112321,'}</p>
                <p>{t('enterVerificationCode')}</p>
              </IonLabel>
            </IonItem>
            <div className="otp-input-container" style={{ marginTop: 20 }}>
              <div className="otp-input-outer-wrapper">
                <div className="otp-input-inner-wrapper">
                  <input
                    className="otp-input"
                    ref={otpInput}
                    onKeyUp={stopCarret}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    onKeyDown={stopCarret}
                    type="text"
                    maxLength={6}
                    autoComplete={'none'}
                  />
                </div>
              </div>
            </div>
            <IonItem lines="none" onClick={() => setIsNumberAdded(false)}>
              <IonText
                className="center"
                color="primary"
                style={{
                  fontSize: 12,
                  fontStyle: 'italic',
                  textDecorationLine: 'underline',
                }}
              >
                {t('notReceivedSMS', { timer: timeLeft })}
              </IonText>
            </IonItem>
            <IonButton
              className="center"
              style={{ marginTop: '10%' }}
              color="secondary"
              fill="solid"
              onClick={() => {
                verifyCode();
              }}
            >
              Confirm
            </IonButton>
          </>
        ) : null}

        <IonLoading isOpen={showLoading} message={t('pleaseWait')} />
        <ErrorDisplay
          errorProps={errorProps}
          closeHandler={() => {
            setErrorProps({ ...errorProps, showError: false });
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default MobileNumberLogin;
