import React from "react";
// import {
//   IonPage,
//   IonContent,
//   IonCard,
//   IonCardContent,
//   IonButton,
//   IonButtons,
//   IonLabel,
//   IonIcon,
//   IonItem,
//   IonHeader,
//   IonToolbar,
//   IonImg,
//   getPlatforms,
//   IonLoading,
// } from "@ionic/react";
// import { logoFacebook, logoGoogle } from "ionicons/icons";
// import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
// import { useSelector } from "react-redux";
// import { RootState } from "../model/DomainModels";
// import { useHistory } from "react-router-dom";
// import { cfaSignIn, mapUserToUserInfo } from "capacitor-firebase-auth";
// import { UserInfo } from "firebase/app";
// import { isPlatform } from "@ionic/core";
// import { closeOutline } from "ionicons/icons";
// import { PaymentRequestButtonElement, useStripe, CardElement, useElements } from '@stripe/react-stripe-js';


// const ApplePay: React.FC = () => {

//   // interface PaymentRequest {
    
//   // }

//   const [showLoading, setShowLoading] = useState(false);
//   let history = useHistory();
//   const stripe = useStripe();
//   const elements = useElements();
 
//   const [paymentRequest, setPaymentRequest] = useState(null);

//   const closehandler = async () => {
//     history.goBack();
//   };

//   useEffect(() => {
//     if (stripe) {
      
//       const pr = stripe?.paymentRequest({
//         country: 'US',
//         currency: 'usd',
//         total: {
//           label: 'Demo total',
//           amount: 1099,
//         },
//         requestPayerName: true,
//         requestPayerEmail: true,
//       });
//       // Check the availability of the Payment Request API.
//       pr?.canMakePayment().then(result => {
//         if (result && pr) {
//           // setPaymentRequest(pr);
//         }
//       });
//     }
//   }, [stripe]);

  


//   const payWithStripe = async () => {
//     // Block native form submission.
//     // event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }


//     // Get a reference to a mounted CardElement. Elements knows how
//     // to find your CardElement because there can only ever be one of
//     // each type of element.
//     const cardElement = elements.getElement(CardElement);

//     // Use your card Element with other Stripe.js APIs

//     if (cardElement) {
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         'type': 'card',
//         card: cardElement,
//       });


//       if (error) {
//         console.log('[error]', error);
//       } else {
//         console.log('[PaymentMethod]', JSON.stringify(paymentMethod));
//       }
//     } else {
//       console.log("Card Element is not available")
//     }

//   }



//   return (
//     <IonPage>
//       <IonToolbar color="secondary">
//         <IonButtons slot="end">
//           <IonButton onClick={closehandler}>
//             <IonIcon
//               size="large"
//               slot="icon-only"
//               icon={closeOutline}
//             ></IonIcon>
//           </IonButton>
//         </IonButtons>
//       </IonToolbar>
//       <IonContent>
//         {/* {
//           paymentRequest && paymentRequest != null
//             ? <PaymentRequestButtonElement options={{paymentRequest}} />
//           :null
//         } */}
//         <form onSubmit={payWithStripe}>
          
//           <CardElement />
//           <IonButton
//             color="google"
//             fill="solid"
//             shape="round"
//             className="wechat_button"
//             onClick={payWithStripe}
//           >
//             Apple Pay
//           </IonButton>
//         </form>
//         <IonLoading
//           isOpen={showLoading}
//           onDidDismiss={() => setShowLoading(false)}
//           message={"Please wait..."}
//           duration={5000}
//         />
//         <br></br>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default ApplePay;
