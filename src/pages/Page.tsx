import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import "./Page.css";
import {
  useFirestoreConnect,
  FirestoreReducer,
  getFirebase
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import "firebase/firestore";
import hifreshdata from "../data/hmarketitems.json";
import { Categories, Markets, RootState } from "../model/DomainModels";
import { User } from "@firebase/auth-types";
import { getFirestore } from "redux-firestore";
import firebase from "firebase";

interface testprop {
  market: Markets;
  doc: string;
}

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  // console.log(hifreshdata);
  // var keys = Object.keys(hifreshdata);
  // var values = Object.values(hifreshdata);

  // console.log(keys);

  // var upload_categories = [] as Categories[];

  // var i = 0;
  // keys.forEach(key => {
  //   upload_categories.push({
  //     id: i,
  //     img_url: "",
  //     name: key,

  //     load_order: 0
  //   });
  //   i++;
  // });

  // console.log(values[0]);
  // values[0].forEach(obj => {
  //   console.log(obj);
  // });
  // useFirestoreConnect([{ collection: "Markets" }]);

  // const markets = useSelector<RootState>(
  //   state => state.firestore
  // ) as FirestoreReducer.Reducer;

  // console.log(markets.data);

  // var market = {} as Markets;
  // console.log("Categories");
  // console.log(markets.data);
  // if (markets.ordered.Markets && markets.ordered.Markets.length > 0) {
  //   markets.ordered.Markets.map(tmarket => {
  //     console.log(tmarket.name);
  //     market = tmarket;
  //     return market;
  //   });
  // }

  function googleLoginHandler() {
    return "";
  }
  // const TestComponent = compose(
  //   firestoreConnect(() => ["Markets"]), // or { collection: 'todos' }
  //   connect((state, props) => ({
  //     markets: state
  //   }))
  // )(Test);

  function UpdateShopAttributes() {
    firebase
      .firestore()
      .collection("Markets")
      .doc("0YlPeyyRPpZaMtI1aNOx")
      .collection("Categories")
      // .where("img_url", "<=", "")
      .get()
      .then(snapshot => {
        if (!snapshot) {
          console.log("there are no data for your query");
        }
        console.log(snapshot);
        snapshot.forEach(doc => {
          console.log(doc.data());
          var category_id = doc.id;
          firebase
            .firestore()
            .collection("Markets")
            .doc("0YlPeyyRPpZaMtI1aNOx")
            .collection("Categories")
            .doc(doc.id)
            .collection("Items")
            .get()
            .then(items => {
              console.log(items);
              items.forEach(doc => {
                console.log(doc.data());
                firebase
                  .firestore()
                  .collection("Markets")
                  .doc("0YlPeyyRPpZaMtI1aNOx")
                  .collection("Categories")
                  .doc(category_id)
                  .collection("Items")
                  .doc(doc.id)
                  .update({ unit: "each", is_deleted: false })
                  .then(result =>console.log("Update successfully:" + result) );
              });
            })
            .catch(error => console.log("Erro while data patching : " + error));
        });
      });
  }

  function CleanMarket() {
    console.log("YOU HAVE DONE SOMETHING VERY BAD. PLEASE TALK TO GARY.");

    // const firebase = getFirebase();
    // const firestore = getFirestore(firebase);

    // // Delete all Duplicate entires
    // firebase
    //   .firestore()
    //   .collection("Markets")
    //   .doc("FtSvVlEa4G4xHduMnf2l")
    //   .collection("Categories")
    //   .where("img_url", "<=", "")
    //   .get()
    //   .then(snapshot => {
    //     if (!snapshot) {
    //       console.log("there are no data for your query");
    //     }
    //     snapshot.forEach(doc => {
    //       console.log(doc.data());
    //       firebase
    //         .firestore()
    //         .collection("Markets")
    //         .doc("FtSvVlEa4G4xHduMnf2l")
    //         .collection("Categories")
    //         .doc(doc.id)
    //         .delete().then(result => console.log ("Deleted succcessfully"))
    //         .catch(error => console.log("Erro while delete : " + error));
    //     });
    //   });

    // // keys.forEach((key, index) => {
    // //   upload_categories.push({
    // //     id: i,
    // //     img_url: "",
    // //     name: key
    // //   });
    // //   i++;
    // // });
    // var i = 0;
    // keys.forEach(key => {
    //   firebase
    //     .firestore()
    //     .collection("Markets")
    //     .doc("FtSvVlEa4G4xHduMnf2l")
    //     .collection("Categories")
    //     .add({
    //       img_url: "",
    //       name: key,
    //       load_order: i
    //     })
    //     .then(docRef => {
    //       console.log(docRef);
    //       var new_category_id = docRef.id;
    //       console.log("Add Categories Completed");

    //       values[i].forEach(item => {
    //         firebase
    //           .firestore()
    //           .collection("Markets")
    //           .doc("FtSvVlEa4G4xHduMnf2l")
    //           .collection("Categories")
    //           .doc(new_category_id)
    //           .collection("Items")
    //           .add({
    //             name: item.产品,
    //             unit_price: item.售出单价,
    //             unit: item.规格,
    //             img_url: "",
    //             store_name: "",
    //             category_id: new_category_id,
    //             category_name: key
    //           })
    //           .then(() => {
    //             console.log("Added Items to category");
    //           });
    //       });
    //       i++;
    //     });
    // });
  }

  function copyMarkets() {
    console.log("YOU HAVE DONE SOMETHING VERY BAD. PLEASE TALK TO GARY.");

    // const firebase = getFirebase();
    // const targetID = "FtSvVlEa4G4xHduMnf2l";
    // const sourceID = "LX7x6b4dEkXvjRWb0rNK";

    // firebase
    //   .firestore()
    //   .collection("Markets")
    //   .doc(sourceID)
    //   .get()
    //   .then(snapshot => {

    //     console.log(snapshot.data());
    //     firebase
    //       .firestore()
    //       .collection("Markets")
    //       .doc(targetID)
    //       .update({ ...snapshot.data(), id: targetID })
    //       .then(result => {
    //         console.log("update successfully");
    //         console.log(result);
    //       });
    //   });
  }

  console.log("entering page");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <FirestoreIonImg src="gs://slashiee.appspot.com/hifresh/categories/y2637HMBAxuFpC89igEL/organic_apple.png" /> */}
      <IonContent>
        {/* <Test doc={doc_id} market={market} /> */}
        <div className={'page-container'}>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
