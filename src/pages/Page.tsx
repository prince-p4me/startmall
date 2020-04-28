import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import "./Page.css";
import {
  useFirestoreConnect,
  FirestoreReducer} from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState, Markets } from "../services/FirebaseIniti";

interface testprop {
  market: Markets;
  doc: string;
}
const Test: React.FC<testprop> = ({ market, doc }) => {
  useFirestoreConnect([
    {
      collection: "Markets",
      doc: doc,
      subcollections: [
        {
          collection: "Categories",
          // doc: "m1lyTmP7ZgDNWQrjSaIF",
          // subcollections: [{ collection: "Items" }],
        }
      ],
      storeAs: "HiFreshCategories"
    }
  ]);

  return (
    <div>
      {market.name}
      FireBase Test
    </div>
  );
};

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  var doc_id = "123";

  useFirestoreConnect([{ collection: "Markets" }]);

  const markets = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;

  console.log(markets.data);

  var market = {} as Markets;
  console.log("Categories");
  console.log(markets.data);
  if (markets.ordered.Markets && markets.ordered.Markets.length > 0) {
    markets.ordered.Markets.map(tmarket => {
      console.log(tmarket.name);
      // setMarketName(market.name);
      doc_id = tmarket.id;
      market = tmarket;
      return market;
    });
  }

  // const TestComponent = compose(
  //   firestoreConnect(() => ["Markets"]), // or { collection: 'todos' }
  //   connect((state, props) => ({
  //     markets: state
  //   }))
  // )(Test);

  console.log("entering page");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Test doc={doc_id} market={market} />
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
