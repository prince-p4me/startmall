import React from "react";
import { CartState } from "../services/FirebaseIniti";
import { IonItem } from "@ionic/react";

const CartTotal: React.FC<CartState> = ({ cart }) => <IonItem>Total: ${cart.cart.total}</IonItem>;

export default CartTotal;
