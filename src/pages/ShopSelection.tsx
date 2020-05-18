import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonImg,
  IonText,
} from "@ionic/react";
import React from "react";
import "./Dashboard.css";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import ShopSelectionList from "../containers/ShopSelectionList";
import { RootState, Markets } from "../model/DomainModels";
import { setCurrentShop } from "../reducers/ShopAction";

const ShopSelection: React.FC = () => {
  console.log("entering Dashboard");
  const history = useHistory();
  const dispatch = useDispatch();
  const { postcode } = useParams<{ postcode: string }>();
  const marketList: Array<Markets> = [];

  function handleShopClick(shop: any) {
    dispatch(setCurrentShop({ shop: shop }));
    history.push("/tabs/market/" + shop.id);
  }

  useFirestoreConnect([{ collection: "Markets" }]);

  const markets = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;

  if (markets.ordered.Markets && markets.ordered.Markets.length > 0) {
    markets.ordered.Markets.forEach(market => {
      if (postcode) {
        if (market.support_postcodes && market.support_postcodes.length > 0) {
          if (market.support_postcodes.includes(postcode)) {
            marketList.push(market)
          }
        }
      } else {
        // marketList.push(market)
      }
    });

  }

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
        {marketList.length > 0 ? (
          <ShopSelectionList
            handleShopClick={handleShopClick}
            shops={marketList}
          />
        ) : (
            <p className="no_data_found">We are coming soon in your area.</p> 
          )}
      </IonContent>
    </IonPage>
  );
};

export default ShopSelection;
