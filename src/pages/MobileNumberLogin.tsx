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
    IonInput,
    IonLoading,
    IonButtons,
    IonItemDivider,
    IonText,
    IonRow,
    IonCol
} from "@ionic/react";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../model/DomainModels";
import { useHistory } from "react-router-dom";
import { cfaSignIn, mapUserToUserInfo } from "capacitor-firebase-auth";
import { UserInfo } from "firebase/app";
import { isPlatform } from "@ionic/core";
import { closeOutline } from "ionicons/icons";
import GoBack from "../components/GoBack";

const MobileNumberLogin: React.FC = () => {
    const firebase = useFirebase();
    const auth = useSelector<RootState>(state => state.firebase.auth);
    const history = useHistory();
    const db = firebase.firestore();
    const [showLoading, setShowLoading] = useState(false);
    const [isValidNumber, setValidNumber] = useState(true);
    const [mobileNumber, setMobileNumber] = useState<string | null | undefined>("" as string);
    const [isNumberAdded, setIsNumberAdded] = useState(false)

    // var appVerifier = firebase.auth.RecaptchaVerifier('recaptcha-container');

    // firebase.auth().RecaptchaVerifier(function (user) {
    //     console.log("Login State changes");
    //     console.log(user);
    //     if (isLoaded(auth) && !isEmpty(auth)) {
    //       console.log("User Logged in");
    //       writeUserData(auth);
    //     }
    //   });

    async function verifyPhoneNumber() {
       
    }

    return (
        <IonPage>
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
                {
                    (!isNumberAdded)
                        ? <>
                            <IonItem className="mobile_login_header" lines="none">
                                <IonLabel>
                                    <b>Your Mobile Number</b>
                                </IonLabel>
                            </IonItem>
                            <IonItem className="order_completed" style={{ marginTop: "20%" }} lines="none" >
                                <IonInput type="number" placeholder="+61 321112321"
                                    onIonChange={e => {
                                        setMobileNumber(e.detail.value)
                                    }}></IonInput>

                            </IonItem>
                            <div style={{ marginLeft: 50, marginRight: 50, height: 1, background: "black" }}>

                            </div>
                            <IonButton className="center" style={{ marginTop: "20%" }} color="secondary" fill="solid" onClick={() => { setIsNumberAdded(true) }}>
                                Send Verification Code
                            </IonButton>
                        </>
                        : null
                }

                {
                    (isNumberAdded)
                        ? <>
                            <IonItem className="mobile_login_header" lines="none">
                                <IonLabel>
                                    <b>Verify Your Number</b>
                                </IonLabel>
                            </IonItem>
                            <IonItem className="center" lines="none">
                                <IonLabel color="shade">
                                    <p>{"We’ve just sent a SMS to your mobile"}</p>
                                    <p>{mobileNumber ? mobileNumber : "+61 321112321" + ","}</p>
                                    <p>{"please enter the verification code:"}</p>
                                </IonLabel>
                            </IonItem>
                            <div className="center" style={{ marginTop: 20 }}>
                                <IonRow >
                                    <IonCol>
                                        <IonInput type="number" className="otp_input" maxlength={1}></IonInput>
                                        <IonInput type="number" className="otp_input" maxlength={1}></IonInput>
                                        <IonInput type="number" className="otp_input" maxlength={1}></IonInput>
                                        <IonInput type="number" className="otp_input" maxlength={1}></IonInput>
                                    </IonCol>
                                </IonRow>
                            </div>
                            <IonItem lines="none" onClick={() => setIsNumberAdded(false)}>
                                <IonText className="center" color="primary" style={{ fontSize: 12, fontStyle: "italic", textDecorationLine: "underline" }}>Not Receive? Re-send in 60 Seconds</IonText>
                            </IonItem>
                            <IonButton className="center" style={{ marginTop: "10%" }} color="secondary" fill="solid" onClick={() => { setIsNumberAdded(false) }}>
                                Confirm
                            </IonButton>
                        </>
                        : null
                }

                <IonLoading isOpen={showLoading} message={"Please wait..."} />
            </IonContent>
        </IonPage >
    )
};

export default MobileNumberLogin;