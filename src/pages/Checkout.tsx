import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import ItemList from "../components/ItemList";
import {useHistory} from "react-router-dom";
import {closeOutline} from "ionicons/icons";
import {AddressObj, CartStateType, ProfileData, RootState, ShopStateType} from "../model/DomainModels";
import {CheckoutProps, ErrorProps} from "../model/ComponentProps";
import ShopConditionAndOperatingHours from "../components/ShopConditionAndOperatingHours";
import {CartState} from "../services/FirebaseIniti";
import {isEmpty, isLoaded, useFirebase} from "react-redux-firebase";
import AddressForm from "../components/Address";
import CurrencyAmount from "../components/CurrencyAmount";
import ErrorDisplay from "../components/ErrorDisplay";
import {StatusBar} from '@ionic-native/status-bar';
import ShopHeaderWithProps from "../components/ShopHeaderWithProps";
import {useTranslation} from "react-i18next";

const Checkout: React.FC<CheckoutProps> = () => {
  const firebase = useFirebase();
  const db = firebase.firestore();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const [addressObj, setAddress] = useState<AddressObj>({isValidAddress1: true, isValidNumber: true} as AddressObj);
  const [agreement, setAgreement] = useState<boolean>(false);
  const [paymentType] = useState<string>("none");
  const [showLoading, setShowLoading] = useState(false);
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);
  let history = useHistory();
  const {t} = useTranslation();

  const [cartState, setCartState] = useState<CartStateType>({
    cartItemList: [],
    cart: {
      total: 0.0,
      marketId: ''
    }
  });

  useIonViewDidEnter(() => {
    setAgreement(false);
  });

  const [shopState, setShop] = useState<ShopStateType>({
    shop: {
      id: "",
      name: "",
      opening_hour: [],
      free_delivery_conditions: "",
      img_url: "",
      store_address: "",
      support_postcodes: [],
      cut_off_terms: "",
      delivery_terms: "",
      service_offering: ""
    }
  });

  const mapStateToProps = (state: CartState) => {
    const {firebase, cart, shop} = state;
    setCartState(cart);
    setShop(shop);
    return {firebase, cart, shop};
  };

  const [CartItemList] = useState<React.ElementType>(connect(mapStateToProps)(ItemList));
  let Market: any = useSelector<any>((state: any) => (state.firestore.data.Market))
  const [EnhancedCondition] = useState<React.ElementType>(connect(mapStateToProps)(
    ShopConditionAndOperatingHours
  ));

  const writeUserData = async (my_auth: any) => {
    let today = new Date();
    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    let json_auth = JSON.parse(JSON.stringify(my_auth));
    const user: ProfileData = {
      providerId: json_auth.providerData[0].providerId,
      display_name: json_auth.displayName, //displayName
      payment_detail: "", //
      contact_mobile: "",
      address: addressObj,
      photo_url: json_auth.photoURL, //photoURL we get from firebase.auth() when sign in completed
      id: json_auth.uid, // uid  we get from firebase.auth() when sign in completed
      email: json_auth.email
    };
    const invoice: any = {
      id: "",
      user_id: my_auth.uid,
      address: addressObj,
      total_amount: cartState.cart.total,
      platform_charges: 135.0,
      delivery_date: deliveryDate,
      order_date: today,
      status: "open",
      payment_status: "pending",
      cart_total_cost_inc_GST: cartState.cart.total,
      cart_items: cartState.cartItemList,
      batch_id: "",
      user: user,
      payment_type: paymentType
    };

    if (shopState.shop.cutoff_terms) {
      invoice.cut_off_terms = shopState.shop.cutoff_terms;
    }

    if (shopState.shop.id) {
      invoice.market_id = shopState.shop.id;
    }

    if (shopState.shop.id) {
      invoice.market_name = shopState.shop.name;
    }

    if (shopState.shop.delivery_terms) {
      invoice.delivery_terms = shopState.shop.delivery_terms;
    }

    try {
      const response = await db.collection("Users").doc(json_auth.uid).set(user);
      console.log("user updated:--" + JSON.stringify(response));
      try {
        const res = await db.collection("Invoices").add(invoice);
        invoice.id = res.id;
        history.push("/payment/" + res.id);
        console.log("Successfully inserted");
        setShowLoading(false);
      } catch (err) {
        console.log("Not inserted+==" + JSON.stringify(err));
      }
    } catch (err_1) {
      console.error("User not found", err_1, json_auth.uid);
    }
  };

  const handleComplete = async () => {
    setShowLoading(true);
    if (!addressObj.address1 || addressObj.address1 === "") {
      setErrorProps({
        message: t('typeAddressLine', { lineNumber : '1' }),
        showError: true,
        type: 1,
        autoHide: true,
        buttonText: ""
      });
      setAddress({...addressObj, isValidAddress1: false})
      setShowLoading(false);
      return;
    }
    if (!addressObj.phone || addressObj.phone === "") {
      setErrorProps({
        message: t('typeContactNumber'),
        showError: true,
        type: 1,
        autoHide: true,
        buttonText: ""
      });
      setAddress({...addressObj, isValidNumber: false})
      setShowLoading(false);
      return;
    }
    if (!agreement) {
      setErrorProps({
        message: t('checkAgreement'),
        showError: true,
        type: 1,
        autoHide: true,
        buttonText: ""
      });
      setShowLoading(false);
      return;
    }

    if (cartState.cartItemList.length === 0) {
      setErrorProps({
        message: t('addProductInCart'),
        showError: true,
        type: 1,
        autoHide: true,
        buttonText: ""
      });
      setShowLoading(false);
      return;
    }

    if (isEmpty(auth)) {
      setErrorProps({
        message: t('loginToContinue'),
        showError: true,
        type: 2,
        autoHide: false,
        buttonText: t('logIn')
      });
      setShowLoading(false);
      return;
    }
    try {
      await writeUserData(auth);
      setShowLoading(false);
    } catch (error) {
      console.log("Can't insert the data for invoice");
      console.log(error);
      setShowLoading(false);
    }
  };

  const fetchData = async () => {
    let json_auth = JSON.parse(JSON.stringify(auth));
    if (!json_auth.uid) {
      return
    }
    console.log({json_auth});
    const data = {address2: "", state: "", suburb: "", postcode: "", country: ""} as AddressObj;
    const res = await db.collection("Users").doc(json_auth.uid).get();
    if (res.exists) {
      let user: any = res.data();
      if (user.address && user.address.name) {
        data.name = user.address.name;
        if (user.address.address1) {
          data.address1 = user.address.address1;
          data.isValidAddress1 = true;
        }
        if (user.address.email) {
          data.email = user.address.email;
        }
        if (user.address.phone) {
          data.phone = user.address.phone;
          data.isValidNumber = true;
        }
        if (user.address.suburb) {
          data.suburb = user.address.suburb;
        }
        if (user.address.postcode) {
          data.postcode = user.address.postcode;
        }
        setAddress(data);
      } else {
        if (json_auth.providerData[0].providerId === "phone") {
          data.phone = json_auth.phoneNumber;
          data.isValidNumber = true;
        } else {
          data.email = json_auth.email;
        }
        setAddress(data);
      }
      console.log("user fetched:--" + JSON.stringify(addressObj));
    } else if (isLoaded(auth) && !isEmpty(auth)) {
      console.log("User Logged in");
      if (json_auth.providerData[0].providerId === "phone") {
        data.phone = json_auth.phoneNumber;
        data.isValidNumber = true;
      } else {
        data.email = json_auth.email;
      }
      setAddress(data);
    }
  };

  useEffect(() => {
    fetchData();
    StatusBar.overlaysWebView(false);
    StatusBar.styleDefault();
  }, [auth]);

  const closeHandler = async () => {
    history.goBack();
  };

  return (
    <IonPage id="checkout" className="checkout_page">
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="end">
            <IonButton onClick={closeHandler}>
              <IonIcon
                size="large"
                slot="icon-only"
                icon={closeOutline}
              ></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle text-center>
            <b>{t('checkOut')}</b>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ShopHeaderWithProps Market={Market}/>
        <CartItemList/>
        <IonItem lines="none">
          <IonLabel color="primary" style={{textAlign: "right"}}>
            {t('totalIncGST')} {<CurrencyAmount amount={cartState.cart.total}/>}
          </IonLabel>
        </IonItem>
        <EnhancedCondition/>
        <AddressForm address={addressObj} onAddressChange={setAddress}/>
        <br></br>
        <IonItem lines="none">
          <IonImg
            class="footer_pay"
            slot="start"
            src="/assets/icon/payment-method.png"
          ></IonImg>
        </IonItem>
        <IonItem lines="none">
          <IonCheckbox
            slot="start"
            checked={agreement}
            onIonChange={e => {
              setAgreement(e.detail.checked);
            }}
            style={{marginRight: 10}}
          ></IonCheckbox>
          <IonLabel>
            <p>{t('agreementText')}</p>
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonButtons slot="end">
            <IonButton
              color="secondary"
              fill="solid"
              onClick={handleComplete}
              disabled={cartState.cartItemList.length === 0}>
              {t('proceedToPayment')}
            </IonButton>
          </IonButtons>

          <ErrorDisplay
            errorProps={errorProps}
            closeHandler={() => {
              setErrorProps({...errorProps, showError: false})
            }}
            eventHandler={() => {
              history.push("/login");
              setErrorProps({...errorProps, showError: false});
            }}/>

          <IonLoading
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={t('pleaseWait')}
            duration={5000}
          />
        </IonItem>
        <br></br><br></br>

      </IonContent>
    </IonPage>
  );
};

export default Checkout;
