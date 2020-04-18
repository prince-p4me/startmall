import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonButton
} from "@ionic/react";
import { basket } from "ionicons/icons";
import React, { useState } from "react";
import "./Market.css";
import ShopItem from "./ShopItem";
import Cart from "./Cart";
import { connect } from "react-redux";
import { CartState } from "../reducers/Cart";
import data from "../data/hmarketitems.json";
import { MarketItemsProps } from "../model/ComponentProps";
import { ItemObj } from "../model/DomainModels";
import GoBack from "../components/GoBack";

interface ItemJson {
  产品: string;
  售出单价: number;
  规格: string;

  [key: string]: string | number | null;
}

const MarketItems: React.FC<MarketItemsProps> = () => {
  console.log("entering MarketItems");
  // const { categoryName } = useParams<{ categoryName: string }>();
  const [showModal, setShowModal] = useState(false);
  const Items: ItemObj[] = [];
  const CartBadge: React.FC<CartState> = ({ cartItemList }) => {
    const cartSize = cartItemList.length;
    if (cartSize > 0) {
      return <IonBadge color="danger">{cartItemList.length}</IonBadge>;
    } else {
      return <div></div>;
    }
  };

  function mapStateToProps(state: CartState) {
    const { cartItemList } = state;
    return { cartItemList };
  }
  const CartCounter = connect(mapStateToProps)(CartBadge);
  // var index = 0;
  // const jsonData = JSON.parse(data.toString());

  // var index = 0;
  // // const jsonData = JSON.parse(data.toString());
  // const [jsonData, setjsonData] = useState({});
  // for (var x in data) {
  //   console.log(x);
  //   var oneCategory = data[categoryName] as [ItemJson]
  //   index++;

  // const [jsonData, setjsonData] = useState({});
  // for (var x in data) {
  //   console.log(x);
  //   setjsonData(data);
  //   index++;
  //   if (x.toString() === categoryName) {
  data.禽蛋类.map(item => {
    var jsonitem = item as ItemJson;
    const itemobj: ItemObj = {
      market: "Hi Fresh",
      itemName: jsonitem.产品,
      itemDesc: jsonitem.规格,
      itemCost: jsonitem.售出单价
    };
    Items.push(itemobj);
    return Items;
  });
  // {
  //   const itemobj: ItemObj = {
  //     market: "Hi Fresh",
  //     itemName: item.toString(),
  //     itemDesc: item[0],
  //     itemCost: 0
  //   };
  //   Items.push(itemobj);
  // }
  //     break;
  //   }
  //   const obj: CategoryObj = {
  //     id: index,
  //     categoryName: x.toString(),
  //     market: "Hi Fresh",
  //     imageUrl: "./assets/img/veg-stock2.jpg "
  //   };
  //   Categories.push(obj);
  // }

  // mItems.json().
  return (
    <IonPage>
      <IonHeader>
        
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(true)} slot="start">
              <IonIcon size="large" slot="icon-only" icon={basket}></IonIcon>
              <CartCounter />
            </IonButton>
            <IonMenuButton />
          </IonButtons>
          
          <GoBack />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {Items.map(obj => {
              return (
                <IonCol key={obj.itemName}>
                  <ShopItem item={obj} />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
        <Cart modal={showModal} closehandler={() => setShowModal(false)} />
      </IonContent>
    </IonPage>
  );
};

export default MarketItems;
