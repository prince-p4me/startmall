import { CartState } from "../reducers/Cart";
import React from "react";
import { IonList, IonLabel, IonButton, IonContent, IonItem, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";

const ItemList: React.FC<CartState> = ({ cartItemList }) => {
    
    return (
      <IonContent>
        <IonList>
          {cartItemList.map((cartItem, index) => {
            return (
              <IonItem>
                <IonLabel>{cartItem.name}</IonLabel>
                <IonLabel slot="end">$ {cartItem.cost}</IonLabel>
                <IonButton slot="start">
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonButton>
              </IonItem>
            );
          })}
        </IonList>
        <IonItem>
          Cart Total: $ 00
        </IonItem>
      </IonContent>
    );
  };

  export default ItemList;