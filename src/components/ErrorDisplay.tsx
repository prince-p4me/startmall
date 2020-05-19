import React, { useEffect } from "react";
import { IonToast } from "@ionic/react";
import { ErrorDisplayProps } from "../model/ComponentProps";
import { isLoaded } from "react-redux-firebase";
import { closeOutline } from "ionicons/icons";

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ type, message, closehandler, showToast }) => {


  var localMessage: any

  if (isLoaded(type)) {
    localMessage = message;
  }

  useEffect(() => {
    if(showToast){
      setTimeout(() => {
        closehandler()
      }, 5000);
    }
  }, [showToast, closehandler])

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
