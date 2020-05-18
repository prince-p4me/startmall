import React, { useState,useEffect } from "react";
import { IonText, IonItem, IonButtons, IonButton, IonIcon, IonLabel, IonToast } from "@ionic/react";
import { ErrorDisplayProps } from "../model/ComponentProps";
import { isLoaded } from "react-redux-firebase";
import { closeOutline } from "ionicons/icons";

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ type, message, closehandler, showToast }) => {


  var localType: any = -1
  var localMessage: any

  if (isLoaded(type)) {
    localType = type;
    localMessage = message;
  }

  useEffect(() => {
    if(showToast){
      setTimeout(() => {
        closehandler()
      }, 5000);
    }
  }, [showToast])

  return (
    <IonToast
      color="secondary"
      isOpen={showToast}
      message={localMessage}
      position="bottom"
      buttons={[
        {
          side: 'end',
          icon: closeOutline,
          handler: () => {
            closehandler()
          }
        }
      ]}
    />
  );
};

export default ErrorDisplay;
