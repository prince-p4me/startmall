import React from "react";
import { CartState } from "../services/FirebaseIniti";
import { IonItem } from "@ionic/react";

const CartTotal: React.FC<CartState> = ({ cart }) => {
  // let cart1 = JSON.parse(JSON.stringify(cart));
  // console.log("cart is :--" + JSON.stringify(cart1));
  return (
    <IonItem>Total: ${cart.cart.total}</IonItem>
  )
};

export default CartTotal;
