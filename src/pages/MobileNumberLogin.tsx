import React, { useState } from "react";
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

const MobileNumberLogin: React.FC = () => {
    const [showLoading] = useState(false);
    // const [] = useState(true);
    const [mobileNumber, setMobileNumber] = useState<string | null | undefined>("" as string);
    const [isNumberAdded, setIsNumberAdded] = useState(false)


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
                                    <p>{mobileNumber ? mobileNumber : ("+61 321112321,")}</p>
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