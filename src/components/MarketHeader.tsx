import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonMenuToggle
} from "@ionic/react";

import React from "react";

import { basket } from "ionicons/icons";

import GoBack from "./GoBack";
import { Markets } from "../model/DomainModels";

interface MarketHeaderProps {
  setShowModal: any;
  shop: Markets;
  CartCounter: any;
}

const MarketHeader: React.FC<MarketHeaderProps> = ({
  setShowModal,
  shop,
  CartCounter
}) => {
  return (
    <IonHeader>
      <IonToolbar color="secondary">
        <IonButtons slot="end">
          <IonButton onClick={() => setShowModal(true)} slot="start">
            <IonIcon size="large" slot="icon-only" icon={basket}></IonIcon>
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
        <IonTitle class="shop_header_condition" size="large">
          <p>{shop.cut_off_terms}</p>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default MarketHeader;