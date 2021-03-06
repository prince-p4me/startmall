import {
  IonButtons,
  IonContent,
  IonPage,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonButton,
  IonItem,
} from '@ionic/react';
import { basket } from 'ionicons/icons';
import React, { useState } from 'react';
import './Market.css';
import Cart from './Cart';
import { connect, useSelector } from 'react-redux';
import data from '../data/hmarketitems.json';
import CategoryItem from './CategoryItem';
import { CategoryObj } from '../model/DomainModels';
import OrderDayShopHeader from '../components/OrderDayShopHeader';
import { CartState } from '../services/FirebaseIniti';
import ShopHeaderWithProps from '../components/ShopHeaderWithProps';

const ShopMain: React.FC = () => {
  console.log('entering market');
  const [showModal, setShowModal] = useState(false);
  const Categories: CategoryObj[] = [];
  const CartBadge: React.FC<CartState> = ({ firebase, cart }) => {
    const cartSize = cart.cartItemList.length;
    if (cartSize > 0) {
      return <IonBadge color="danger">{cart.cartItemList.length}</IonBadge>;
    } else {
      return <div></div>;
    }
  };

  const mapStateToProps = (state: CartState) => {
    const { firebase, cart, shop } = state;
    return { firebase, cart, shop };
  };

  const [CartCounter] = useState<React.ElementType>(connect(mapStateToProps)(CartBadge));
  const Market: any = useSelector<any>((state: any) => state.firestore.data.Market);

  let index = 0;
  for (const x in data) {
    index++;
    const obj: CategoryObj = {
      id: index,
      categoryName: x.toString(),
      market: 'Hi Fresh',
      imageUrl: './assets/img/veg-stock2.jpg',
      key: index,
    };
    Categories.push(obj);
  }

  // mItems.json().
  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="end">
          <IonButton onClick={() => setShowModal(true)} slot="start">
            <IonIcon size="large" slot="icon-only" icon={basket}></IonIcon>
            <CartCounter />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <OrderDayShopHeader />
      <IonContent fullscreen>
        <ShopHeaderWithProps Market={Market} />
        <IonGrid>
          <IonRow>
            {Categories.map((obj) => {
              return (
                <IonCol key={obj.id}>
                  <CategoryItem market_id="" category={obj} shop={null} />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
        <IonItem hidden={showModal}>
          <Cart modal={showModal} closeHandler={() => setShowModal(false)} />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default ShopMain;
