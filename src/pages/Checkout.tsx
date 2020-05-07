import {
  IonContent,
  IonPage,
  IonButton,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonLabel,
  IonItem,
  IonItemDivider,
  IonFooter,
  IonImg
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import ItemList from "../components/ItemList";
import Address from "../components/Address";
import Payment from "../components/Payment";
import { useHistory } from "react-router-dom";
import { closeOutline, cart } from "ionicons/icons";
import { CheckoutProps } from "../model/ComponentProps";
import { RootState, PaymentObj, CartStateType, UserProfile, ShopStateType, Cart, CartItem } from "../model/DomainModels";
import ShopHeader from "../components/ShopHeader";
import ShopConditionAndOperatingHours from "../components/ShopConditionAndOperatingHours";
import { CartState, firebaseStore } from "../services/FirebaseIniti";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { string } from "prop-types";

const Checkout: React.FC<CheckoutProps> = () => {
  const firebase = useFirebase();
  const db = firebase.firestore();
  const auth = useSelector<RootState>(state => state.firebase.auth);

  let history = useHistory();
  // const [state] = useState<CartState>();
  const [paymentOption] = useState<PaymentObj>();

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
      service_offering: "",
    }
  });

  function mapStateToProps(state: CartState) {
    const { firebase, cart, shop, address } = state;
    setCartState(cart);
    setShop(shop);
    return { firebase, cart, shop, address };
  }

  const CartItemList = connect(mapStateToProps)(ItemList);
  const ShopHeaderWithShop = connect(mapStateToProps)(ShopHeader);
  const EnhancedCondition = connect(mapStateToProps)(ShopConditionAndOperatingHours);
  const AddressComponent = connect(mapStateToProps)(Address);

  function writeUserData(auth1: any) {
    let auth2 = JSON.parse(JSON.stringify(auth1));
    let user = {
      providerId: auth2.providerData[0].providerId,
      display_name: auth2.displayName, //displayName
      payment_detail: "", //
      contact_mobile: "87687687687",
      address: {},
      photo_url: auth2.photoURL, //photoURL we get from firebase.auth() when sign in completed
      user_id: auth2.uid, // uid  we get from firebase.auth() when sign in completed
      email: auth2.email,
    };
    db.collection("Users").doc(auth2.uid).set(user).then((response) => {
      console.error("user updated:--" + JSON.stringify(response));
      db.collection("Invoices").add({
        user_id: auth1.uid,
        market_id: shopState.shop.id,
        market_name: shopState.shop.name,
        address: {},
        total_amount: cartState.cart.total,
        platform_charges: "135.0",
        cut_off_terms: shopState.shop.cutoff_terms,
        cut_off_date: "12 May 2020",
        delivery_date: "22 May 2020",
      }).then((res) => {
        let invoice_id = res.id;
        let carts = {
          market: shopState.shop,
          cart_items: cartState.cartItemList
        };
        db.collection("Invoices").doc(invoice_id).update({
          cart: carts,
          user: user,
        }).then((data) => {
          console.log("successfully inserted carts and user also");
        }).catch((err) => {
          console.log("not inserted carts and user :===" + JSON.stringify(err));
        })
      }).catch((err) => {
        console.log("not inserted+==" + JSON.stringify(err));
      });
    }).catch((error) => {
      console.error("user not found");
    })
  }

  const handleComplete = async () => {
    // history.push("/orders");
    // console.log("address is:-" + JSON.stringify(address));
    writeUserData(auth);
  };

  // useEffect(() => {
  //   console.log("address is:-" + JSON.stringify(address));
  // }, [auth, address]);

  const closehandler = async () => {
    history.goBack();
  };


  return (
    <IonPage id="checkout" className="checkout_page">
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
      </IonToolbar>
      <IonContent>
        <ShopHeaderWithShop />
        <CartItemList />
        <IonItem>
          <IonLabel>Total incl GST ${cartState.cart.total}</IonLabel>
        </IonItem>
        <EnhancedCondition />
        <IonLabel>
          <h1>Where to? </h1>
        </IonLabel>
        <AddressComponent />
        <IonLabel>
          <h1>How to Pay?</h1>
        </IonLabel>
        <Payment payment={paymentOption} />
        <IonItemDivider>Confirm</IonItemDivider>
        <IonFooter>
          <IonToolbar>
            <IonItem lines="none">
              <IonButtons slot="end">
                <IonButton
                  color="secondary"
                  fill="outline"
                  onClick={handleComplete}
                >
                  Continue Shopping
              </IonButton>
                <IonButton
                  color="primary"
                  fill="outline"
                  onClick={handleComplete}
                >
                  Confirm
              </IonButton>
              </IonButtons>
            </IonItem>
          </IonToolbar>
          <IonItem lines="none">
            <IonImg
              class="footer_pay"
              slot="start"
              src="/assets/icon/1x/payment.png"
            ></IonImg>
          </IonItem>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
