import React, { useEffect, useState } from "react";
import { Stripe } from "@ionic-native/stripe";

import { IonPage } from "@ionic/react";
import { constructSharp } from "ionicons/icons";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import {
  PaymentRequestButtonElement,
  useStripe,
  Elements
} from "@stripe/react-stripe-js";

const StripeComponent: React.FC = () => {
  // const stripeKey = "pk_test_YC0gcyGppNgDEzsD5FxBzPXJ00nUQJqCvw";
  // Stripe.setPublishableKey(stripeKey).then(e => console.log(e));
  // var cardDetails = {
  //   number: "4242424242424242",
  //   expMonth: 12,
  //   expYear: 2020,
  //   cvc: "220"
  // };
  // Stripe.createCardToken(cardDetails)
  //   .then(e => {
  //     console.log(e.id);
  //     // in ios native, we will make one time payment here.
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // const stripePromise = loadStripe(
  //   "pk_test_YC0gcyGppNgDEzsD5FxBzPXJ00nUQJqCvw"
  // );

  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Demo total",
          amount: 1099
        },
        requestPayerName: true,
        requestPayerEmail: true
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr as any);
        }
      });
    }
  }, [stripe]);

  // if (paymentRequest) {
  //   return (
  //     <IonPage>
  //       <PaymentRequestButtonElement options={{ paymentRequest }} />
  //     </IonPage>
  //   );
  // }

  return (
    <IonPage>
      hello
        {/* <CheckoutForm /> */}
        <PaymentRequestButtonElement 
       />
    </IonPage>
  );
};

export default StripeComponent;
