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
import { useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import ShopSelectionList from "../containers/ShopSelectionList";
import { RootState } from "../model/DomainModels";
import { setCurrentShop } from "../reducers/ShopAction";

const ShopSelection: React.FC = () => {
  console.log("entering Dashboard");
  const history = useHistory();
  const dispatch = useDispatch();

  function handleShopClick(shop: any) {
    dispatch(setCurrentShop({shop:shop}));
    history.push("/tabs/market/" + shop.id);
  }

  useFirestoreConnect([{ collection: "Markets" }]);

  const markets = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;

  console.log(markets);

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
