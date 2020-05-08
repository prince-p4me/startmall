import React from "react";
import { IonItem } from "@ionic/react";
import { ShopHeaderProps } from "../model/ComponentProps";
import { Markets } from "../model/DomainModels";
import { isLoaded } from "react-redux-firebase";


const ShopConditionAndOperatingHours: React.FC<ShopHeaderProps> = ({ shop }) => {

  var loadedShop = {} as Markets;

  if (isLoaded(shop)) {
    loadedShop = shop.shop;
  }
  return (
    <IonItem lines="none" className="checkout_conditions">
      <p>{loadedShop.free_delivery_conditions}
        <br />
        {loadedShop.cut_off_terms}</p>
    </IonItem>
  );
};

export default ShopConditionAndOperatingHours;
