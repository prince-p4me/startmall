import React, { useMemo, useEffect, useState } from "react";
import "./StripePaymentContainer.css";
import {
  IonLabel,
  IonIcon,
  IonButton,
  IonSpinner
} from "@ionic/react";
import { logoApple } from "ionicons/icons";

import { StripePaymentProps } from "../model/ComponentProps";
import { CardExpiryElement, CardNumberElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ApplePay } from '@ionic-native/apple-pay';
import { getPaymentSecret } from '../services/StripeService';
import { AddressObj } from "../model/DomainModels";
import { StripeCardNumberElementChangeEvent, StripeCardExpiryElementChangeEvent, StripeCardCvcElementChangeEvent } from "@stripe/stripe-js";

const StripePaymentContainer: React.FC<StripePaymentProps> = ({ paymentMode, completeHandler, invoice }) => {

  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [cardValidation, setCardValidation] = useState({ number: false, date: false, cvc: false, isCompleted: false })
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {

    if (invoice.total_amount != null) {
      setLoading(true)
      getPaymentSecret({ amount: invoice.total_amount }).then((res: any) => {
        setClientSecret(res.data.data);
        setLoading(false);
      })
    }

  }, [invoice.total_amount]);

  const applePay = async () => {

    try {
      const applePayTransaction = await ApplePay.makePaymentRequest({
        items: [
          {
            label: 'Product basket',
            amount: invoice.total_amount
          }
        ],
        shippingMethods: [
          {
            identifier: 'NextDay',
            label: 'NextDay',
            detail: 'Arrives tomorrow by 5pm.',
            amount: 0
          }
        ],
        supportedNetworks: ['visa', 'masterCard', 'discover'],
        merchantCapabilities: ['3ds', 'debit', 'credit'],
        merchantIdentifier: 'merchant.com.startmall.app',
        currencyCode: 'AUD',
        countryCode: 'AU',
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

    setLoading(true);

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardNumberElement: any = elements.getElement(CardNumberElement);
    const cardExpiryElement: any = elements.getElement(CardExpiryElement);
    const cardCvcElement: any = elements.getElement(CardCvcElement);

    const { name, email, phone, country, state, address1, address2, postcode, suburb } = invoice.address as AddressObj;

    // Use your card Element with other Stripe.js APIs
    const result: any = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name,
          phone,
          email,
          // address: {
          //   line1: address1,
          //   line2: address2,
          //   postal_code: postcode,
          //   city: suburb
          // }
        },
      }
    });
    setLoading(false);
    cardNumberElement.clear();
    cardExpiryElement.clear();
    cardCvcElement.clear();
    setCardValidation({ number: false, date: false, cvc: false, isCompleted: false });
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        completeHandler();
      }
    }

  };

  const validateStripe = (obj: StripeCardNumberElementChangeEvent | StripeCardExpiryElementChangeEvent | StripeCardCvcElementChangeEvent,
    elementType: 'number' | 'date' | 'cvc') => {
    console.log(obj)
    if (!obj.error) {
      setCardValidation({ ...cardValidation, [elementType]: true, isCompleted: obj.complete })
    } else {
      setCardValidation({ ...cardValidation, [elementType]: false, isCompleted: obj.complete })
    }
  }

  return (
    <div className="ion-padding-start ion-padding-end">
      {
        (paymentMode === 'visaCard' || paymentMode === 'all') &&
        <form onSubmit={handleSubmit}>
          <div className="ion-margin-top">
            <IonLabel color="medium">
              Card number
            </IonLabel>
            <CardNumberElement options={options} onChange={(obj) => validateStripe(obj, 'number')} />
          </div>
          <div className="ion-margin-top">
            <IonLabel color="medium">
              Expiration date
            </IonLabel>
            <CardExpiryElement options={options} onChange={(obj) => validateStripe(obj, 'date')} />
          </div>
          <div className="ion-margin-top">
            <IonLabel color="medium">
              CVC
            </IonLabel>
            <CardCvcElement options={options} onChange={(obj) => validateStripe(obj, 'cvc')} />
          </div>
          <IonButton
            type={'submit'}
            disabled={!stripe || !cardValidation.number || !cardValidation.date || !cardValidation.cvc || !cardValidation.isCompleted || loading}
            expand={'block'}
            className="ion-margin-top card-pay-btn"
            size={'large'}>
            {
              !loading ?
                `Pay AUD $${invoice.total_amount} inc GST` :
                <IonSpinner name={'dots'}></IonSpinner>
            }
          </IonButton>
        </form>
      }
      <div className={'ion-margin-top ion-margin-bottom ion-text-center'}>
        {
          paymentMode === 'all' && <IonLabel color={'primary'}>Or</IonLabel>
        }
      </div>
      <div>
        {
          (paymentMode === 'applePay' || paymentMode === 'all') &&
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
      <div className={'ion-margin-top ion-margin-bottom'}>
        <IonLabel>* By hitting Pay you are confirming your order with us.</IonLabel>
      </div>
    </div>
  );
}

export default StripePaymentContainer;
