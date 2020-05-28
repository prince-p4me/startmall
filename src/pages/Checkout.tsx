import { IonContent, IonPage, IonHeader, IonButton, IonToolbar, IonButtons, IonIcon, IonLabel, IonCheckbox, IonItem, IonImg, IonLoading, IonTitle } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
import { useHistory } from "react-router-dom";
import { closeOutline } from "ionicons/icons";
import { RootState, CartStateType, ShopStateType, ProfileData, AddressObj } from "../model/DomainModels";
import { CheckoutProps, ErrorProps } from "../model/ComponentProps";
import ShopHeader from "../components/ShopHeader";
import ShopConditionAndOperatingHours from "../components/ShopConditionAndOperatingHours";
import { CartState } from "../services/FirebaseIniti";
import { useFirebase, isEmpty, isLoaded } from "react-redux-firebase";
import AddressForm from "../components/Address";
import CurrencyAmount from "../components/CurrencyAmount";
import ErrorDisplay from "../components/ErrorDisplay";
import { StatusBar } from '@ionic-native/status-bar';
import moment from "moment";

interface MockInvoice {
  // TODO: Please fix the DomainModels > Invoice object same as below write invoice function
  id: string;
  [key: string]: string | number | [] | any | null;
}

const Checkout: React.FC<CheckoutProps> = () => {
  const firebase = useFirebase();
  const db = firebase.firestore();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const [addressObj, setAddress] = useState<AddressObj>({ isValidAddress1: true, isValidNumber: true } as AddressObj);
  const [aggreement, setAggreement] = useState<boolean>(false);
  const [paymentType] = useState<string>("none");
  const [, setInvoiceId] = useState<string>("");
  const [, setInvoice] = useState<MockInvoice>({} as MockInvoice);
  const [showLoading, setShowLoading] = useState(false);
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);
  let history = useHistory();
  // const [state] = useState<CartState>();

  const [cartState, setCartState] = useState<CartStateType>({
    cartItemList: [],
    cart: {
      total: 0.0
    }
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

  function mapStateToProps(state: CartState) {
    const { firebase, cart, shop } = state;
    setCartState(cart);
    setShop(shop);
    return { firebase, cart, shop };
  }

  const [CartItemList] = useState<React.ElementType>(connect(mapStateToProps)(ItemList));
  const [ShopHeaderWithShop] = useState<React.ElementType>(connect(mapStateToProps)(ShopHeader));
  const [EnhancedCondition] = useState<React.ElementType>(connect(mapStateToProps)(
    ShopConditionAndOperatingHours
  ));

  // const AddressComponent = connect(mapStateToProps)(Address);

  async function writeUserData(my_auth: any): Promise<void> {
    let today = new Date();
    let json_auth = JSON.parse(JSON.stringify(my_auth));
    let user: ProfileData = {
      providerId: json_auth.providerData[0].providerId,
      display_name: json_auth.displayName, //displayName
      payment_detail: "", //
      contact_mobile: "",
      address: addressObj,
      photo_url: json_auth.photoURL, //photoURL we get from firebase.auth() when sign in completed
      id: json_auth.uid, // uid  we get from firebase.auth() when sign in completed
      email: json_auth.email
    };
    let invoice = {
      id: "",
      user_id: my_auth.uid,
      market_id: shopState.shop.id,
      market_name: shopState.shop.name,
      address: addressObj,
      total_amount: cartState.cart.total,
      platform_charges: 135.0,
      cut_off_terms: shopState.shop.cutoff_terms,
      // delivery_terms: shopState.shop.delivery_terms,
      delivery_date: "22 May 2020",
      order_date: moment(today).format("DD MMM YYYY"),
      status: "open",
      payment_status: "pending",
      cart_total_cost_inc_GST: cartState.cart.total,
      cart_items: cartState.cartItemList,
      batch_id: "",
      user: user,
      payment_type: paymentType
    };
    setInvoice(invoice);
    try {
      const response = await db
        .collection("Users")
        .doc(json_auth.uid)
        .set(user);
      console.log("user updated:--" + JSON.stringify(response));
      try {
        const res = await db
          .collection("Invoices")
          .add(invoice);
        setInvoiceId(res.id);
        invoice.id = res.id;
        setInvoice(invoice);
        history.push("/payment/" + res.id);
        console.log("Successfully inserted");
        setShowLoading(false);
      }
      catch (err) {
        console.log("Not inserted+==" + JSON.stringify(err));
      }
    }
    catch (err_1) {
      console.error("User not found", err_1, json_auth.uid);
    }
  }

  const handleComplete = async () => {
    setShowLoading(true);
    if (!addressObj.address1 || addressObj.address1 === "") {
      setErrorProps({
        message: "Please Type Address Line 1",
        showError: true,
        type: 1,
        autoHide: true,
        buttonText: ""
      })
      setAddress({ ...addressObj, isValidAddress1: false })
      setShowLoading(false);
      return;
    }
    if (!addressObj.phone || addressObj.phone === "") {
      setErrorProps({
        message: "Please Type the Contact person number",
        showError: true,
        type: 1,
        autoHide: true,
        buttonText: ""
      })
      setAddress({ ...addressObj, isValidNumber: false })
      setShowLoading(false);
      return;
    }
    if (!aggreement) {
      setErrorProps({
        message: "Please check our aggreement",
        showError: true,
        type: 1,
        autoHide: true,
        buttonText: ""
      })
      setShowLoading(false);
      return;
    }

    if (cartState.cartItemList.length === 0) {
      setErrorProps({
        message: "Please add products in card",
        showError: true,
        type: 1,
        autoHide: true,
        buttonText: ""
      })
      setShowLoading(false);
      return;
    }

    if (isEmpty(auth)) {
      setErrorProps({
        message: "Please login to continue checkout",
        showError: true,
        type: 2,
        autoHide: false,
        buttonText: "LOG IN"
      })
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

  async function fetchData() {
    let json_auth = JSON.parse(JSON.stringify(auth));
    var data = { address2: "", state: "", suburb: "", postcode: "", country: "" } as AddressObj;
    const res = await db.collection("Users").doc(json_auth.uid).get()
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
  }

  useEffect(() => {
    fetchData();
    StatusBar.overlaysWebView(false);
    StatusBar.styleDefault();
  }, [auth]);

  const closehandler = async () => {
    history.goBack();
  };

  return (
    <IonPage id="checkout" className="checkout_page">
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="end">
            <IonButton onClick={closehandler}>
              <IonIcon
                size="large"
                slot="icon-only"
                icon={closeOutline}
              ></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle text-center>
            <b>CHECK OUT</b>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ShopHeaderWithShop />
        <CartItemList />
        <IonItem lines="none">
          <IonLabel color="primary" style={{ textAlign: "right" }}>
            {/* Total incl GST ${cartState.cart.total} */}
            Total incl GST {<CurrencyAmount amount={cartState.cart.total} />}
          </IonLabel>
        </IonItem>
        <EnhancedCondition />
        <AddressForm address={addressObj} onAddressChange={setAddress} />
        <br></br>
        {/* <Payment payment={paymentType} onChange={setPaymentType} /> */}
        <IonItem lines="none">
          <IonImg
            class="footer_pay"
            slot="start"
            src="/assets/icon/1x/payment.png"
          ></IonImg>
        </IonItem>
        <IonItem lines="none">
          <IonCheckbox
            slot="start"
            checked={aggreement}
            onIonChange={e => {
              setAggreement(e.detail.checked);
            }}
          ></IonCheckbox>
          <IonLabel>
            <p>I read and agree on our Terms and Conditions</p>
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonButtons slot="end">
            <IonButton
              color="secondary"
              fill="outline"
              onClick={handleComplete}
            >
              Continue Shopping
            </IonButton>
            <br />
            <IonButton color="secondary" fill="solid" onClick={handleComplete}>
              Proceed to Payment
            </IonButton>
          </IonButtons>

          <ErrorDisplay errorProps={errorProps}
            closeHandler={() => { setErrorProps({ ...errorProps, showError: false }) }}
            eventHandler={() => {
              history.push("/login");
              setErrorProps({ ...errorProps, showError: false });
            }} />

          <IonLoading
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Please wait..."}
            duration={5000}
          />
        </IonItem>
        <br></br><br></br>

      </IonContent>
    </IonPage>
  );
};

export default Checkout;
