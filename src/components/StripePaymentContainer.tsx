import React, { useMemo } from "react";
import "./StripePaymentContainer.css";
import {
  IonItem,
  IonInput,
  IonLabel,
  IonList, IonIcon,
  IonItemDivider,
  IonButton
} from "@ionic/react";
import { logoApple } from "ionicons/icons";

import { StripePaymentProps } from "../model/ComponentProps";
import { CardExpiryElement, CardNumberElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ApplePay } from '@ionic-native/apple-pay';



const StripePaymentContainer: React.FC<StripePaymentProps> = ({ paymentMode, completeHandler }) => {

  const stripe = useStripe();
  const elements = useElements();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "16px",
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    []
  );

  const applePay = async () => {

    try {
      const applePayTransaction = await ApplePay.makePaymentRequest({
        items: [
          {
            label: '3 x Basket Items',
            amount: 49.99
          },
          {
            label: 'Next Day Delivery',
            amount: 3.99
          },
          {
            label: 'My Fashion Company',
            amount: 53.98
          }
        ],
        shippingMethods: [
          {
            identifier: 'NextDay',
            label: 'NextDay',
            detail: 'Arrives tomorrow by 5pm.',
            amount: 3.99
          },
          {
            identifier: 'Standard',
            label: 'Standard',
            detail: 'Arrive by Friday.',
            amount: 4.99
          },
          {
            identifier: 'SaturdayDelivery',
            label: 'Saturday',
            detail: 'Arrive by 5pm this Saturday.',
            amount: 6.99
          }
        ],
        supportedNetworks: ['visa', 'masterCard', 'discover'],
        merchantCapabilities: ['3ds', 'debit', 'credit'],
        merchantIdentifier: 'merchant.com.startmall.app',
        currencyCode: 'USD',
        countryCode: 'US',
        billingAddressRequirement: 'none',
        shippingAddressRequirement: 'none',
        shippingType: 'shipping'
      });

      console.log(applePayTransaction);

    } catch (e) {
      // handle payment request error
      // Can also handle stop complete transaction but these should normally not occur
      console.log(e)
    }
  };

  const handleSubmit = async (event: any) => {

    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const element: any = elements.getElement(CardNumberElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: element
    });

    if (error) {
      console.log('[error]', error);
    } else {
      completeHandler(paymentMethod);
    }
  };

  return (
    <div className="ion-padding-start ion-padding-end">
      {
        paymentMode === 'visaCard' &&
        <form onSubmit={handleSubmit}>
          <div className="ion-margin-top">
            <IonLabel color="medium">
              Card number
            </IonLabel>
            <CardNumberElement options={options} />
          </div>
          <div className="ion-margin-top">
            <IonLabel color="medium">
              Expiration date
            </IonLabel>
            <CardExpiryElement options={options} />
          </div>
          <div className="ion-margin-top">
            <IonLabel color="medium">
              CVC
            </IonLabel>
            <CardCvcElement options={options} />
          </div>
          <IonButton type={'submit'} disabled={!stripe} expand={'block'} className="ion-margin-top card-pay-btn" size={'large'}>
            Pay $25
          </IonButton>
        </form>
      }
      {
        paymentMode === 'applePay' &&
        <IonButton class="ion-margin-top apple-pay-btn" color={'dark'} onClick={applePay} size={'large'} expand={'block'}>
          <IonIcon
            size={'large'}
            slot="icon-only"
            className="apple-icon"
            icon={logoApple}
          ></IonIcon>
          Pay
        </IonButton>
      }
    </div>
  );
}

export default StripePaymentContainer;