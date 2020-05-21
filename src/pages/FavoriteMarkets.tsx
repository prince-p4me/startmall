import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonImg, IonCardSubtitle,
  IonText, IonRow, IonGrid, IonCol,
  IonLabel, IonCard,
  IonIcon,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useHistory } from "react-router";
import { useFirestoreConnect, FirestoreReducer, isEmpty, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../model/DomainModels";
import { heart } from "ionicons/icons";

const FavoriteMarkets: React.FC = () => {
  console.log("entering Dashboard");
  // const [] = useState<Array<FavoriteMarket>>([]);
  const history = useHistory();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const json_auth = JSON.parse(JSON.stringify(auth));
  const [isLogin, setLogin] = useState(false);

  // const db = useFirebase().firestore();
  function handleShopClick(obj: any) {
    history.push("favoriteitems/" + obj.id);
  }

  useFirestoreConnect((json_auth.uid) ? [
    {
      collection: "WishLists",
      doc: json_auth.uid,
      subcollections: [
        {
          collection: "Markets",
        }
      ],
      storeAs: "FavoritesMarkets"
    }
  ] : []);

  const dataStore = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;

  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      console.clear();
      setLogin(true);
      // console.log("User Logged in and user is:==" + JSON.stringify(auth));
      // history.push("/");
    }
  }, [auth]);

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
        {
          isLogin ? <IonGrid>
            {dataStore.ordered.FavoritesMarkets &&
              dataStore.ordered.FavoritesMarkets.length > 0 ? (
                <IonRow>
                  {
                    dataStore.ordered.FavoritesMarkets.map((obj) => (
                      <IonCol key={obj.id}>
                        <IonCard style={{
                          marginBottom: 10,
                          paddingBottom: 10,
                        }}
                          onClick={() => {
                            handleShopClick(obj);
                          }}
                        >
                          <IonImg src={obj.img_url as string} alt={obj.name}></IonImg>
                          <IonCardSubtitle className="category_name">{obj.name}</IonCardSubtitle>
                          <div style={{ textAlign: "center" }} >
                            <IonLabel>
                              <IonIcon color="primary" icon={heart} />
                              {/* <span>{getCount(obj.id)} items</span> */}
                            </IonLabel>
                          </div>
                        </IonCard>
                      </IonCol>
                    ))}
                </IonRow>
              ) : (
                <p className="no_data_found">You currently do not have any favorites.
                Save some by clicking the heart on the picture. </p>
              )}
          </IonGrid> : (
              <p className="no_data_found">Please login to see your wishlist</p>
            )
        }
      </IonContent>
    </IonPage>
  );
};

export default FavoriteMarkets;
