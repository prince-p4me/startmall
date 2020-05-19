import React, { useState, useEffect, useRef } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonLabel,
  IonItem,
  IonHeader,
  IonToolbar,
  IonInput,
  IonLoading,
  IonButtons,
  IonText,
  IonRow,
  IonCol
} from "@ionic/react";
import GoBack from "../components/GoBack";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import firebase, { UserInfo } from "firebase/app";
import { useHistory } from "react-router-dom";
import { VeriFyCode } from "../model/DomainModels";
import ErrorDisplay from "../components/ErrorDisplay";
import { ErrorProps } from "../model/ComponentProps";

const MobileNumberLogin: React.FC = () => {
  const history = useHistory();
  console.log("Mobile number login");
  const [showLoading] = useState(false);
  // const [] = useState(true);
  const [mobileNumber, setMobileNumber] = useState<string | null | undefined>(
    "62335535" as string
  );
  const [isNumberAdded, setIsNumberAdded] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<any>();
  var [timer, setTime] = useState<number>(60);
  // var [interval_id, setIntervalId] = useState<NodeJS.Timeout>();
  const [verificationCode, setVerificationCode] = useState<VeriFyCode>({
    first: "",
    second: "",
    third: "",
    fourth: "",
    sixth: "",
    fifth: ""
  });
  const input1 = useRef<any>();
  const input2 = useRef<any>();
  const input3 = useRef<any>();
  const input4 = useRef<any>();
  const input5 = useRef<any>();
  const input6 = useRef<any>();
//   const [showError, setShowError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);

  function sendVerificationCode() {
    const appVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button", {
      size: "invisible"
    });
    const phoneNumberString ="+852" + mobileNumber as string;
    console.log(mobileNumber);
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then((confirmationResult: any) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        appVerifier.clear();
        console.log("confirmationResult" + confirmationResult);
        setConfirmationCode(confirmationResult);
        setTime(60);
        setIsNumberAdded(true);
        startInterval();
      })
      .catch(function(error) {
        console.error("SMS not sent", error);
        // setErrorMessage("SMS not sent may be " + error);
        // setShowError(true);
        setErrorProps({
            message: "SMS not sent may be " + error,
            showError: true,
            type: 1,
            autoHide: true,
            buttonText:""
          })
      });
  }

  function startInterval() {
    var interval = setInterval(() => {
      // setIntervalId(interval);
      var timer1 = JSON.parse(JSON.stringify(timer--));
      setTime(timer1);
      if (timer1 == 0) {
        setTime(60);
        setIsNumberAdded(false);
        clearInterval(interval);
      }
    }, 1000);
  }

  function verifyCode() {
    if (
      !verificationCode.first ||
      verificationCode.first == "" ||
      (!verificationCode.second || verificationCode.second == "") ||
      (!verificationCode.third || verificationCode.third == "") ||
      (!verificationCode.fourth || verificationCode.fourth == "") ||
      (!verificationCode.fifth || verificationCode.fifth == "") ||
      (!verificationCode.sixth || verificationCode.sixth == "")
    ) {
      alert("Enter verification code properly");
    }
    const code =
      verificationCode.first +
      verificationCode.second +
      verificationCode.third +
      verificationCode.fourth +
      verificationCode.fifth +
      verificationCode.sixth;
    console.log("code is:==" + code);
    confirmationCode
      .confirm(code)
      .then((res: any) => {
        console.log("verification success:--" + JSON.stringify(res));
        history.push("/");
      })
      .catch((err: any) => {
        console.log("Error in verification");
      });
  }

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
                <b>Your Mobile Number</b>
              </IonLabel>
            </IonItem>
            <IonItem
              className="order_completed"
              style={{ marginTop: "20%" }}
              lines="none"
            >
              <IonInput
                type="number"
                placeholder="+612 33123123"
                value={mobileNumber}
                onIonChange={e => {
                  setMobileNumber(e.detail.value);
                }}
              ></IonInput>
            </IonItem>
            <div
              style={{
                marginLeft: 50,
                marginRight: 50,
                height: 1,
                background: "black"
              }}
            ></div>
            <IonButton
              className="center"
              style={{ marginTop: "20%" }}
              color="secondary"
              fill="solid"
              onClick={() => {
                sendVerificationCode();
              }}
            >
              Send Verification Code
            </IonButton>
          </>
        ) : null}

        {isNumberAdded ? (
          <>
            <IonItem className="mobile_login_header" lines="none">
              <IonLabel>
                <b>Verify Your Number</b>
              </IonLabel>
            </IonItem>
            <IonItem className="center" lines="none">
              <IonLabel color="shade">
                <p>{"We’ve just sent a SMS to your mobile"}</p>
                <p>{mobileNumber ? mobileNumber : "+61 321112321,"}</p>
                <p>{"please enter the verification code:"}</p>
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
                    onIonChange={e => {
                      if ((e.detail.value as string).length === 1) {
                        setVerificationCode({
                          ...verificationCode,
                          first: e.detail.value
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
                    onIonChange={e => {
                      if ((e.detail.value as string).length === 1) {
                        setVerificationCode({
                          ...verificationCode,
                          second: e.detail.value
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
                    onIonChange={e => {
                      if ((e.detail.value as string).length === 1) {
                        setVerificationCode({
                          ...verificationCode,
                          third: e.detail.value
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
                    onIonChange={e => {
                      console.log(e);
                      if ((e.detail.value as string).length === 1) {
                        setVerificationCode({
                          ...verificationCode,
                          fourth: e.detail.value
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
                    onIonChange={e => {
                      if ((e.detail.value as string).length === 1) {
                        setVerificationCode({
                          ...verificationCode,
                          fifth: e.detail.value
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
                    onIonChange={e => {
                      setVerificationCode({
                        ...verificationCode,
                        sixth: e.detail.value
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
                  fontStyle: "italic",
                  textDecorationLine: "underline"
                }}
              >
                Not Receive? Re-send in {timer} Seconds
              </IonText>
            </IonItem>
            <IonButton
              className="center"
              style={{ marginTop: "10%" }}
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

        <IonLoading isOpen={showLoading} message={"Please wait..."} />
        <ErrorDisplay errorProps={errorProps} closeHandler={() => {setErrorProps({...errorProps, showError: false})}} eventHandler={()=>{}} />

      </IonContent>
    </IonPage>
  );
};

export default MobileNumberLogin;
