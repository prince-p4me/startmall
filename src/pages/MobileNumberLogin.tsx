import React, { useRef, useState } from 'react';
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
  IonText,
  IonToolbar,
} from '@ionic/react';
import GoBack from '../components/GoBack';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import { VerifyCode } from '../model/DomainModels';
import ErrorDisplay from '../components/ErrorDisplay';
import { ErrorProps } from '../model/ComponentProps';
import { isPlatform } from '@ionic/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { useTranslation } from 'react-i18next';

const MobileNumberLogin: React.FC = () => {
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
  const [timer, setTime] = useState<number>(60);
  const [verificationCode, setVerificationCode] = useState<VerifyCode>({
    first: '',
    second: '',
    third: '',
    fourth: '',
    sixth: '',
    fifth: '',
  });
  const input1 = useRef<any>();
  const input2 = useRef<any>();
  const input3 = useRef<any>();
  const input4 = useRef<any>();
  const input5 = useRef<any>();
  const input6 = useRef<any>();
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);

  const sendVerificationCode = () => {
    const phoneNumberString = ('+852' + mobileNumber) as string;
    if (!isPlatform('ios') || isPlatform('mobileweb')) {
      const appVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        size: 'invisible',
      });
      console.log(mobileNumber);
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumberString, appVerifier)
        .then((confirmationResult: any) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          appVerifier.clear();
          console.log('confirmationResult' + confirmationResult);
          setConfirmationCode(confirmationResult);
          setTime(60);
          setIsNumberAdded(true);
          startInterval();
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
          setTime(60);
          setIsNumberAdded(true);
          startInterval();
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

  const startInterval = () => {
    const interval = setInterval(() => {
      setTime((time) => timer - 1);
      const timer1 = timer - 1;
      setTime(timer1);
      if (timer1 === 0) {
        setTime(60);
        setIsNumberAdded(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  const verifyCode = () => {
    if (
      !verificationCode.first ||
      verificationCode.first === '' ||
      !verificationCode.second ||
      verificationCode.second === '' ||
      !verificationCode.third ||
      verificationCode.third === '' ||
      !verificationCode.fourth ||
      verificationCode.fourth === '' ||
      !verificationCode.fifth ||
      verificationCode.fifth === '' ||
      !verificationCode.sixth ||
      verificationCode.sixth === ''
    ) {
      alert(t('properVerificationCode'));
    }
    const code =
      verificationCode.first +
      verificationCode.second +
      verificationCode.third +
      verificationCode.fourth +
      verificationCode.fifth +
      verificationCode.sixth;
    console.log('code is:==' + code);
    if (!isPlatform('ios') || isPlatform('mobileweb')) {
      confirmationCode
        .confirm(code)
        .then((res: any) => {
          console.log('verification success:--' + JSON.stringify(res));
          history.push('/');
        })
        .catch((err: any) => {
          console.log('Error in verification');
        });
    } else {
      FirebaseAuthentication.signInWithVerificationId(verificationId, code)
        .then((res) => {
          console.log('verification success:--' + JSON.stringify(res));
          history.push('/');
        })
        .catch((err: any) => {
          console.log('Error in verification');
        });
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
            <IonItem className="order_completed" style={{ marginTop: '20%' }} lines="none">
              <IonInput
                type="number"
                placeholder="+612 33123123"
                value={mobileNumber}
                onIonChange={(e) => {
                  setMobileNumber(e.detail.value);
                }}
              ></IonInput>
            </IonItem>
            <div
              style={{
                marginLeft: 50,
                marginRight: 50,
                height: 1,
                background: 'black',
              }}
            ></div>
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
                <p>{mobileNumber ? mobileNumber : '+61 321112321,'}</p>
                <p>{t('enterVerificationCode')}</p>
              </IonLabel>
            </IonItem>
            <div className="center" style={{ marginTop: 20 }}>
              <IonRow>
                <IonCol>
                  <IonInput
                    type="number"
                    className="otp_input"
                    maxlength={1}
                    value={verificationCode.first}
                    onIonChange={(e) => {
                      if ((e.detail.value as string).length === 1) {
                        setVerificationCode({
                          ...verificationCode,
                          first: e.detail.value,
                        });
                        input2.current.setFocus();
                      }
                    }}
                    ref={input1}
                  ></IonInput>
                  <IonInput
                    type="number"
                    className="otp_input"
                    maxlength={1}
                    value={verificationCode.second}
                    onIonChange={(e) => {
                      if ((e.detail.value as string).length === 1) {
                        setVerificationCode({
                          ...verificationCode,
                          second: e.detail.value,
                        });
                        input3.current.setFocus();
                      } else input1.current.setFocus();
                    }}
                    ref={input2}
                  ></IonInput>
                  <IonInput
                    type="number"
                    className="otp_input"
                    maxlength={1}
                    value={verificationCode.third}
                    onIonChange={(e) => {
                      if ((e.detail.value as string).length === 1) {
                        setVerificationCode({
                          ...verificationCode,
                          third: e.detail.value,
                        });
                        input4.current.setFocus();
                      } else input2.current.setFocus();
                    }}
                    ref={input3}
                  ></IonInput>
                  <IonInput
                    type="number"
                    className="otp_input"
                    maxlength={1}
                    value={verificationCode.fourth}
                    onIonChange={(e) => {
                      console.log(e);
                      if ((e.detail.value as string).length === 1) {
                        setVerificationCode({
                          ...verificationCode,
                          fourth: e.detail.value,
                        });
                        input5.current.setFocus();
                      } else input3.current.setFocus();
                    }}
                    ref={input4}
                  ></IonInput>
                  <IonInput
                    type="number"
                    className="otp_input"
                    maxlength={1}
                    value={verificationCode.fifth}
                    onIonChange={(e) => {
                      if ((e.detail.value as string).length === 1) {
                        setVerificationCode({
                          ...verificationCode,
                          fifth: e.detail.value,
                        });
                        input6.current.setFocus();
                      } else input4.current.setFocus();
                    }}
                    ref={input5}
                  ></IonInput>
                  <IonInput
                    type="number"
                    className="otp_input"
                    maxlength={1}
                    value={verificationCode.sixth}
                    onIonChange={(e) => {
                      setVerificationCode({
                        ...verificationCode,
                        sixth: e.detail.value,
                      });
                      if ((e.detail.value as string).length === 0) {
                        input5.current.setFocus();
                      }
                    }}
                    ref={input6}
                  ></IonInput>
                </IonCol>
              </IonRow>
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
                {t('notReceivedSMS', { timer: timer })}
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
