import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonImg,
  IonText
} from "@ionic/react";
import React from "react";
import "./Dashboard.css";
import { useHistory } from "react-router";
import { RootState } from "../services/FirebaseIniti";
import { useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";
import { useSelector } from "react-redux";
import ShopSelectionList from "../containers/ShopSelectionList";

const ShopSelection: React.FC = () => {
  console.log("entering Dashboard");
  const history = useHistory();

  function handleShopClick(market_id: any) {
    history.push("/tabs/market/" + market_id);
  }

  useFirestoreConnect([{ collection: "Markets" }]);

  const markets = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
        <IonImg class="startmall_header " src="/assets/icon/1x/logo2.png" />
      </IonHeader>
      <IonText slot="right">SHOP CAN DELIVERY TO YOUR AREA</IonText>
      <IonContent fullscreen>
        {markets.ordered.Markets && markets.ordered.Markets.length > 0 ? (
          <ShopSelectionList
            handleShopClick={handleShopClick}
            shops={markets.ordered.Markets}
          />
        ) : (
          <p></p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ShopSelection;
