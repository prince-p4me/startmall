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
import React from "react";
import "./Dashboard.css";
import { useHistory } from "react-router";
import { useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../model/DomainModels";
import { heart } from "ionicons/icons";

const FavoriteMarkets: React.FC = () => {
  console.log("entering Dashboard");
  // const [] = useState<Array<FavoriteMarket>>([]);
  const history = useHistory();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const json_auth = JSON.parse(JSON.stringify(auth));
  // const db = useFirebase().firestore();
  function handleShopClick(obj: any) {
    history.push("favoriteitems/" + obj.id);
  }

  useFirestoreConnect([
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
  ]);

  const dataStore = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;


  // async function fetchData() {
  //   var data: Array<FavoriteMarket> = [];
  //   var markets = await db.collection("WishLists").doc(json_auth.uid).collection("Markets").get()
  //   if (!markets.empty) {
  //     markets.forEach(async doc => {
  //       var doc1 = doc.data();
  //       doc1.items = [];
  //       var items = await db.collection("WishLists").doc(json_auth.uid).collection("Markets").doc(doc1.id).collection("Items").get();
  //       if (!items.empty) {
  //         items.forEach(item => {
  //           var item1 = item.data();
  //           doc1.items.push(item1);
  //         });
  //       }
  //       data.push(doc1 as FavoriteMarket);
  //       setMarktList(data);
  //       console.log("markets:==" + marketList.length);
  //     })
  //   }
  //   // console.clear();
  //   // console.log("markets:--" + JSON.stringify(marketList));
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

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
        <IonGrid>
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
              <p className="no_data_found">No Data Found</p>
            )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default FavoriteMarkets;
