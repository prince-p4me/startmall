import React from "react";
import { Stripe } from "@ionic-native/stripe";

import { IonPage } from "@ionic/react";
import { constructSharp } from "ionicons/icons";
import { PaymentRequestButtonElement } from "@stripe/react-stripe-js";

const StripeComponent: React.FC = () => {
  const stripeKey = "pk_test_YC0gcyGppNgDEzsD5FxBzPXJ00nUQJqCvw";
  Stripe.setPublishableKey(stripeKey).then(e => console.log(e));
  var cardDetails = {
    number: "4242424242424242",
    expMonth: 12,
    expYear: 2020,
    cvc: "220"
  };
  Stripe.createCardToken(cardDetails)
    .then(e => {
      console.log(e.id);
      // in ios native, we will make one time payment here.
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <IonPage>
      <PaymentRequestButtonElement />
    </IonPage>
  );
};

export default StripeComponent;
