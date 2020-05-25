import React, {useState, Fragment, useEffect} from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonFooter,
  IonTitle, IonItem, IonLabel, IonInput, IonList, IonTextarea,
  IonToast
} from "@ionic/react";
import { connect, useSelector } from "react-redux";
import { closeOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { CartProps } from "../../model/ComponentProps";
import {isLoaded, isEmpty, useFirebase} from "react-redux-firebase";
import { CartState } from "../../services/FirebaseIniti";
import { RootState } from "../../model/DomainModels";
import './index.css'

const Cart: React.FC = () => {
  let history = useHistory();
  const firebase = useFirebase();
  const db = firebase.firestore();
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

  function mapStateToProps(state: CartState) {
    const { firebase, cart, shop } = state;
    return { firebase, cart, shop };
  }
  function handleSubmitFeedback() {
    let isValidForm = ( feedbackForm.name && feedbackForm.feedback)
    if(json_auth && json_auth.uid){
      isValidForm = isValidForm && feedbackForm.username
    }
    if(isValidForm){
      const data = {
        name: feedbackForm.name,
        username: feedbackForm.username,
        feedback: feedbackForm.feedback,
      }
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
    }
    else {
      setError(true);
    }

  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
      <Fragment>
        <IonToast
            isOpen={showSuccess}
            onDidDismiss={() => setSuccess(false)}
            message="Thank you for your feedback"
            color="success"
            duration={5000}
        />
        <IonToast
            isOpen={showError}
            onDidDismiss={() => setError(false)}
            message="Invalid Form Data"
            color="danger"
            duration={5000}
        />
        <IonButton expand="full" onClick={()=>{setShowModal(true)}}>
          Submit Feedback
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
                <b>Submit your feedback</b>
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="checkout_page">
            <IonItem style={{ paddingRight: 16 }}>
              <IonLabel id="name" color={(feedbackForm && !feedbackForm ?.isValidName) ? "danger" : "medium"} position="floating">
                Name
              </IonLabel>
              <IonInput placeholder="e.g. John" required={true}
                        value={feedbackForm.name}
                        onIonChange={e => {
                          setFeedbackForm({ ...feedbackForm, name: e.detail.value, isValidName: !!e.detail.value })
                        }} />
            </IonItem>

            {
              json_auth && json_auth.uid ?
                  <IonItem style={{ paddingRight: 16 }}>
                    <IonLabel id="username" color={(feedbackForm && !feedbackForm ?.isValidUsername) ? "danger" : "medium"} position="floating">
                      Email / Username
                    </IonLabel>
                    <IonInput placeholder="Email or Username" required={true}
                              value={feedbackForm.username}
                              onIonChange={e => {
                                setFeedbackForm({ ...feedbackForm, username: e.detail.value, isValidUsername: !!e.detail.value })
                              }} />
                  </IonItem>
                  : null
            }


            <IonItem style={{ paddingRight: 16 }}>
              <IonLabel id="feedback" color={(feedbackForm && !feedbackForm ?.isValidFeedback) ? "danger" : "medium"} position="floating">
                Feedback
              </IonLabel>

              <IonTextarea
                  placeholder="e.g. Feedback" required={true}
                  value={feedbackForm.feedback}
                  rows={20}
                  onIonChange={e => {
                  setFeedbackForm({ ...feedbackForm, feedback: e.detail.value, isValidFeedback: !!e.detail.value })
                  }}
              />
            </IonItem>
          </IonContent>
          <IonFooter className="checkout_page_footer">
            <IonButton expand="full" onClick={handleSubmitFeedback}>
              Submit
            </IonButton>
          </IonFooter>
        </IonModal>
      </Fragment>
  );
};

export default Cart;
