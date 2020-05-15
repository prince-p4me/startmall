import React, { } from "react";
import {
  IonRow, IonCol,
  IonPage,
  IonHeader,
  IonToolbar, IonGrid,
  IonTitle, IonContent
} from "@ionic/react";
import ShopItem from "../containers/ShopItem";
import { useSelector } from "react-redux";
import { useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";
import { RootState } from "../model/DomainModels";

const WishListPage: React.FC = () => {
  console.log("entering WishListPage");
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const json_auth = JSON.parse(JSON.stringify(auth));

  useFirestoreConnect([
    {
      collection: "WishLists",
      doc: json_auth.uid,
      subcollections: [
        {
          collection: "List",
        }
      ],
      storeAs: "Items"
    }
  ]);

  const dataStore = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>WishList</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="shope_item_listing" fullscreen>
        <IonGrid>
          <IonRow>
            {dataStore.ordered.Items &&
              dataStore.ordered.Items.length > 0 ? (
                dataStore.ordered.Items.map((obj) => {
                  return (
                    <IonCol key={obj.id}>
                      <ShopItem item={obj.item} market_id={obj.market_id} category_id={obj.category_id} />
                    </IonCol>
                  );
                })
              ) : (
                <p></p>
              )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage >
  );
};

export default WishListPage;