import React, { useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonItem,
  IonModal,
  IonText,
  IonToast,
} from '@ionic/react';
import { ErrorDisplayProps } from '../model/ComponentProps';
import { isLoaded } from 'react-redux-firebase';
import { closeOutline } from 'ionicons/icons';
import './ErrorDisplay.css';
import { useTranslation } from 'react-i18next';

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorProps, closeHandler, eventHandler }) => {
  const { t } = useTranslation();
  let type: any = -1;
  let errorMessage: any;
  let showError = false;
  let autoHide = false;
  let buttonText: any;

  if (isLoaded(errorProps)) {
    type = errorProps.type;
    errorMessage = errorProps.message;
    autoHide = errorProps.autoHide;
    showError = errorProps.showError;
    buttonText = errorProps.buttonText;
  }

  useEffect(() => {
    if (showError && autoHide && type === 1) {
      setTimeout(() => {
        closeHandler();
      }, 5000);
    }
  }, [showError, closeHandler]);

  return (
    <>
      {type === 1 ? (
        <IonToast
          color="secondary"
          isOpen={showError}
          message={errorMessage}
          position="bottom"
          buttons={[
            {
              side: 'end',
              icon: closeOutline,
              handler: () => {
                closeHandler();
              },
            },
          ]}
        />
      ) : type === 2 ? (
        <IonModal isOpen={showError}>
          <IonContent className="center">
            <IonIcon className="modal_icon" size="small" src="assets/icon/logo_small.svg" />
            <IonCard className="container" text-center>
              <IonItem lines="none">
                <IonIcon
                  size="normal"
                  slot="end"
                  color="secondary"
                  icon={closeOutline}
                  onClick={closeHandler}
                ></IonIcon>
              </IonItem>
              <IonCardContent>
                <IonText>{errorMessage}</IonText>
              </IonCardContent>
              <IonButton size="small" color="secondary" expand="full" onClick={eventHandler}>
                <b>{buttonText ? buttonText : t('logIn')}</b>
              </IonButton>
            </IonCard>
          </IonContent>
        </IonModal>
      ) : null}
    </>
  );
};

export default ErrorDisplay;
