import React, { useMemo, useEffect, useState } from "react";
import "./StripePaymentContainer.css";
import {
  IonLabel,
  IonIcon,
  IonButton,
  IonSpinner,
  IonText
} from "@ionic/react";
import { logoApple, helpCircleOutline } from "ionicons/icons";
import { isPlatform } from "@ionic/core";

import { ErrorProps, StripePaymentProps } from "../model/ComponentProps";
import { CardExpiryElement, CardNumberElement, CardCvcElement, useElements, useStripe, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { getPaymentSecret } from '../services/StripeService';
import { AddressObj } from "../model/DomainModels";
import { StripeCardNumberElementChangeEvent, StripeCardExpiryElementChangeEvent, StripeCardCvcElementChangeEvent } from "@stripe/stripe-js";
import ErrorDisplay from "./ErrorDisplay";
import { Plugins } from '@capacitor/core';
const { Stripe } = Plugins;

const useOptions = (paymentRequest: any) => {
  const options = useMemo<any>(
    () => ({
      paymentRequest,
      style: {
        paymentRequestButton: {
          theme: "dark",
          height: "48px"
        }
      }
    }),
    [paymentRequest]
  );

  return options;
};

const usePaymentRequest = ({ options, onPaymentMethod }: any) => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);

  useEffect(() => {
    if (stripe && paymentRequest === null) {
      const pr: any = stripe.paymentRequest(options);
      setPaymentRequest(pr);
    }
  }, [stripe, options, paymentRequest]);

  useEffect(() => {
    let subscribed = true;
    if (paymentRequest) {
      paymentRequest.canMakePayment().then((res: any) => {
        console.log('RES=>>>>>>>>>>>>', res);
        if (res && subscribed) {
          setCanMakePayment(true);
        }
      });
    }

    return () => {
      subscribed = false;
    };
  }, [paymentRequest]);

  useEffect(() => {
    if (paymentRequest) {
      paymentRequest.on("paymentmethod", onPaymentMethod);
    }
    return () => {
      if (paymentRequest) {
        paymentRequest.off("paymentmethod", onPaymentMethod);
      }
    };
  }, [paymentRequest, onPaymentMethod]);

  return canMakePayment ? paymentRequest : null;
};

const StripePaymentContainer: React.FC<StripePaymentProps> = ({ paymentMode, completeHandler, invoice }) => {

  const stripe = useStripe();
  const elements = useElements();
  const [cardValidation, setCardValidation] = useState({ number: false, date: false, isCompleted: false })
  const [loading, setLoading] = useState(false);
  const [applePayLoading, setApplePayLoading] = useState(false);
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);
  const paymentRequest = usePaymentRequest({
    options: {
      country: "US",
      currency: "usd",
      total: {
        label: "Demo total",
        amount: 1000
      }
    },
    onPaymentMethod: ({ complete, paymentMethod, ...data }: any) => {
      completeHandler();
    }
  });
  const payoptions = useOptions(paymentRequest);
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

      setApplePayLoading(true);
      const resPayment = await getPaymentSecret({ amount: invoice.total_amount });

      await Stripe.confirmPaymentIntent({
        clientSecret: resPayment.data.data,
        applePayOptions: {
          merchantIdentifier: 'merchant.com.startmall.app', // apple merchant id
          country: 'AU',
          currency: 'AUD',
          items: [
            {
              label: 'Product basket',
              amount: Number.parseInt(invoice.total_amount.toString())
            }
          ],
          billingAddressRequirement: 'none',
          shippingAddressRequirement: 'none',
        }
      })

      await Stripe.finalizeApplePayTransaction({ success: true });
      setApplePayLoading(false);
      completeHandler();
    } catch (e) {
      // handle payment request error
      // Can also handle stop complete transaction but these should normally not occur
      console.log('e', e);
      setApplePayLoading(false);
      if (!e.message.includes('payment timeout or user cancelled')) {
        setErrorProps({
          message: 'Something is wrong while requesting payment via apple pay',
          showError: true,
          type: 1,
          autoHide: true,
          buttonText: ""
        })
      }
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

    const resPayment = await getPaymentSecret({ amount: invoice.total_amount });

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardNumberElement: any = elements.getElement(CardNumberElement);
    const cardExpiryElement: any = elements.getElement(CardExpiryElement);
    const cardCvcElement: any = elements.getElement(CardCvcElement);

    const { name, email, phone, country, state, address1, address2, postcode, suburb } = invoice.address as AddressObj;

    // Use your card Element with other Stripe.js APIs
    const result: any = await stripe.confirmCardPayment(resPayment.data.data, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name,
          phone,
          email,
          address: {
            line1: address1,
            postal_code: postcode,
            city: suburb
          }
        },
      }
    });
    setLoading(false);
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      setErrorProps({
        message: result.error.message,
        showError: true,
        type: 1,
        autoHide: true,
        buttonText: ""
      })
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        cardNumberElement.clear();
        cardExpiryElement.clear();
        cardCvcElement.clear();
        setCardValidation({ number: false, date: false, isCompleted: false });
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
  };

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
              <IonIcon
                size={'small'}
                slot="icon-only"
                className="help-icon"
                icon={helpCircleOutline}
              />
              <IonText className="info-light-text">(3 Digit on back of your card)</IonText>
            </IonLabel>
            <CardCvcElement options={options} onChange={(obj) => validateStripe(obj, 'cvc')} />
          </div>
          <div className={'ion-margin-top ion-margin-bottom info-light-text'}>
            <IonLabel>* By hitting Pay you are confirming your order with us.</IonLabel>
          </div>
          <IonButton
            type={'submit'}
            disabled={!stripe || !cardValidation.number || !cardValidation.date || !cardValidation.isCompleted || loading}
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
      <div>
        {
          ((paymentMode === 'applePay' || paymentMode === 'all') && isPlatform("ios")) &&
          <>
            <div className={'ion-margin-top ion-margin-bottom ion-text-center'}>
              <IonLabel color={'primary'}>Or</IonLabel>
            </div>
            <IonButton class="ion-margin-top apple-pay-btn" color={'dark'} onClick={applePay} size={'large'} expand={'block'}>
              {
                !applePayLoading ?
                  <>
                    <IonIcon
                      size={'large'}
                      slot="icon-only"
                      className="apple-icon"
                      icon={logoApple}
                    ></IonIcon>
                Pay
              </> :
                  <IonSpinner name={'dots'}></IonSpinner>
              }
            </IonButton>
          </>
        }
      </div>
      <div>
        {
          (paymentRequest && isPlatform("mobileweb")) &&
          <>
            <div className={'ion-margin-top ion-margin-bottom ion-text-center'}>
              <IonLabel color={'primary'}>Or</IonLabel>
            </div>
            <PaymentRequestButtonElement
              className="PaymentRequestButton"
              options={payoptions}
            />
          </>
        }
      </div>
      <div className={'ion-margin-top ion-margin-bottom'}>
        <IonLabel>* By hitting Pay you are confirming your order with us.</IonLabel>
      </div>
      <ErrorDisplay errorProps={errorProps}
        closeHandler={() => { setErrorProps({ ...errorProps, showError: false }) }}
        eventHandler={() => {
          setErrorProps({ ...errorProps, showError: false });
        }}
      />
    </div>
  );
}

export default StripePaymentContainer;
