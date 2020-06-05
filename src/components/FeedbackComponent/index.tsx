import React, {Fragment, useEffect, useState} from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar
} from "@ionic/react";
import {useSelector} from "react-redux";
import {closeOutline} from "ionicons/icons";
import {useFirebase} from "react-redux-firebase";
import {RootState} from "../../model/DomainModels";
import './index.css'
import {useTranslation} from "react-i18next";

const Cart: React.FC = () => {
  const firebase = useFirebase();
  const db = firebase.firestore();
  const {t} = useTranslation();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const json_auth = JSON.parse(JSON.stringify(auth));
  const [showModal, setShowModal] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState<any>({});
  const [showSuccess, setSuccess] = useState(false);
  const [showError, setError] = useState(false);

  useEffect(() => {
    setFeedbackForm({
      ...feedbackForm,
      name: json_auth ? json_auth.displayName : '',
      username: json_auth ? json_auth.email : '',
      isValidName: json_auth && json_auth.displayName,
      isValidUsername: json_auth && json_auth.email,
      feedback: ''
    })
  }, [auth, showModal])

  function handleSubmitFeedback() {
    let isValidForm = (feedbackForm.name && feedbackForm.feedback)
    if (json_auth && json_auth.uid) {
      isValidForm = isValidForm && feedbackForm.username
    }
    if (isValidForm) {
      const data = {
        name: feedbackForm.name,
        username: feedbackForm.username,
        feedback: feedbackForm.feedback,
      };
      return db
        .collection("Feedback")
        .add(data)
        .then(res => {
          console.log("Successfully inserted");
          setSuccess(true);
          setShowModal(false);
        })
        .catch(err => {
          console.log("Not inserted+==" + JSON.stringify(err));
        });
    } else {
      setError(true);
    }

  }

  const closeModal = () => {
    setShowModal(false)
  };

  return (
    <Fragment>
      <IonToast
        isOpen={showSuccess}
        onDidDismiss={() => setSuccess(false)}
        message={t('feedbackSuccessMsg')}
        color="success"
        duration={5000}
      />
      <IonToast
        isOpen={showError}
        onDidDismiss={() => setError(false)}
        message={t('feedbackFailMsg')}
        color="danger"
        duration={5000}
      />
      <IonButton expand="full" onClick={() => {
        setShowModal(true)
      }}>
        {t('submitFeedback')}
      </IonButton>
      <IonModal isOpen={showModal}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={closeModal}>
                <IonIcon
                  size="large"
                  slot="icon-only"
                  icon={closeOutline}
                ></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle text-center className="ion-text-center">
              <b>{t('submitYourFeedback')}</b>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="checkout_page">
          <IonItem style={{paddingRight: 16}}>
            <IonLabel
              id="name" color={(feedbackForm && !feedbackForm?.isValidName) ? "danger" : "medium"}
              position="floating"
            >
              {t('name')}
            </IonLabel>
            <IonInput
              placeholder="e.g. John"
              required={true}
              value={feedbackForm.name}
              onIonChange={e => {
                setFeedbackForm({...feedbackForm, name: e.detail.value, isValidName: !!e.detail.value})
              }}/>
          </IonItem>

          {
            json_auth && json_auth.uid ?
              <IonItem style={{paddingRight: 16}}>
                <IonLabel
                  id="username"
                  color={(feedbackForm && !feedbackForm?.isValidUsername) ? "danger" : "medium"}
                  position="floating">
                  {t('email/Username')}
                </IonLabel>
                <IonInput
                  placeholder={t('emailOrUsername')}
                  required={true}
                  value={feedbackForm.username}
                  onIonChange={e => {
                    setFeedbackForm({
                      ...feedbackForm,
                      username: e.detail.value,
                      isValidUsername: !!e.detail.value
                    })
                  }}/>
              </IonItem>
              : null
          }

          <IonItem style={{paddingRight: 16}}>
            <IonLabel
              id="feedback"
              color={(feedbackForm && !feedbackForm?.isValidFeedback) ? "danger" : "medium"}
              position="floating">
              {t('feedback')}
            </IonLabel>

            <IonTextarea
              placeholder="e.g. Feedback"
              required={true}
              value={feedbackForm.feedback}
              rows={20}
              onIonChange={e => {
                setFeedbackForm({...feedbackForm, feedback: e.detail.value, isValidFeedback: !!e.detail.value})
              }}
            />
          </IonItem>
        </IonContent>
        <IonFooter className="checkout_page_footer">
          <IonButton expand="full" onClick={handleSubmitFeedback}>
            {t('submit')}
          </IonButton>
        </IonFooter>
      </IonModal>
    </Fragment>
  );
};

export default Cart;
