import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonLabel,
  IonMenuToggle
} from "@ionic/react";

import React from "react";

import { basket } from "ionicons/icons";

import GoBack from "./GoBack";
import { Markets } from "../model/DomainModels";

import './MarketHeader.css'

interface MarketHeaderProps {
  setShowModal: any;
  shop: Markets | any;
  CartCounter: any;
  showTearms?: boolean;
}

const MarketHeader: React.FC<MarketHeaderProps> = ({
  setShowModal,
  shop,
  CartCounter,
  showTearms = true
}) => {
  return (
    <IonHeader>
      <IonToolbar color="secondary">
        <IonButtons slot="end">
          <IonButton onClick={() => setShowModal(true)} slot="start" className={'cart-button'}>
            <IonIcon size="medium" slot="icon-only" icon={basket}></IonIcon>
            <CartCounter />
          </IonButton>
          <IonMenuToggle>
            <IonButton>
              <IonIcon slot="start" src="assets/icon/logo_small.svg"></IonIcon>
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        <IonButtons slot="start">
          <GoBack />
        </IonButtons>
        {
          showTearms &&
          <IonTitle class="shop_header_condition" size="large">
            <p className={'terms'}>Cut Off : {shop.cut_off_terms}</p>
            <p className={'terms'}>Delivery : {shop.delivery_terms}</p>
          </IonTitle>
        }
      </IonToolbar>
    </IonHeader>
  );
};

export default MarketHeader;
