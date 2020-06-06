import React, { useState, useEffect } from 'react';
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonButtons,
} from '@ionic/react';
import { add, heart, heartOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addCartAction, delCartAction } from '../reducers/CartAction';
import { ItemObj, RootState, WishList, CartStateType } from '../model/DomainModels';
import { ShopItemProps, ErrorProps } from '../model/ComponentProps';
import { FirestoreIonImg } from '../services/FirebaseStorage';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { loadWishList } from '../reducers/WishListAction';
import CurrencyAmount from '../components/CurrencyAmount';
import ErrorDisplay from '../components/ErrorDisplay';
import { remove, filter } from 'lodash';

const ShopItem: React.FC<ShopItemProps> = ({ item, market_id, category_id }) => {
  const [favorites, setFavorites] = useState(heartOutline);
  // const [] = useState<WishList>({} as WishList);
  const dispatch = useDispatch();
  const db = useFirestore();
  const auth = useSelector<RootState>((state) => state.firebase.auth) as any;
  const shop = useSelector<RootState>((state) => state.shop);
  const WishLists = useSelector<RootState>((state) => state.wishList.data) as any;
  const cartStore = useSelector<RootState>((state) => state.cart.cartItemList) as ItemObj[];
  const history = useHistory();
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);
  const totalItemInCard = filter(cartStore, (i: ItemObj) => i.id === item.id).length;

  const addFavorites = () => {
    const json_auth = JSON.parse(JSON.stringify(auth));
    const obj: WishList = {
      item_id: item.id,
      market_id: market_id,
      category_id: category_id,
      item: item,
    };
    writeData(obj, json_auth.uid);
  };

  const writeData = async (data: WishList, user_id: string) => {
    const json_shop = JSON.parse(JSON.stringify(shop));
    // console.log(JSON.stringify(shop));
    setFavorites(heart);
    const items = await db
      .collection('WishLists')
      .doc(user_id)
      .collection('Markets')
      .doc(market_id)
      .collection('Items')
      .get();
    if (items.empty) {
      await db.collection('WishLists').doc(user_id).collection('Markets').doc(market_id).set(json_shop.shop);
      await db.collection('WishLists').doc(user_id).collection('Markets').doc(market_id).collection('Items').add(data);
      // updateFavorite();
    } else {
      const itemList: any = [];
      items.forEach((doc) => {
        const doc1 = doc.data();
        itemList.push(doc1);
      });
      await db
        .collection('WishLists')
        .doc(user_id)
        .collection('Markets')
        .doc(market_id)
        .collection('Items')
        .doc(data.item_id)
        .set(data);
    }
    getWishList();
  };

  const getWishList = () => {
    db.collection('WishLists')
      .doc(auth.uid)
      .collection('Markets')
      .doc(market_id)
      .collection('Items')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          dispatch(loadWishList([]));
        } else {
          const tmp: any = [];
          snapshot.forEach((doc) => {
            tmp.push({ ...doc.data(), id: doc.id });
          });
          dispatch(loadWishList(tmp));
        }
      })
      .catch(() => {
        dispatch(loadWishList([]));
      });
  };

  const addCart = (item: ItemObj) => {
    dispatch(addCartAction(item, market_id));
  };

  const delCart = (item: ItemObj) => {
    dispatch(delCartAction(item, market_id));
  };

  const checkFavorite = (writing: boolean) => {
    const json_auth = auth;
    if (json_auth && json_auth.uid) {
      const docRef = db
        .collection('WishLists')
        .doc(json_auth.uid)
        .collection('Markets')
        .doc(market_id)
        .collection('Items');
      const isExists = WishLists.find((wItem: any) => wItem.item_id == item.id) as any;
      if (isExists) {
        if (writing) {
          remove(WishLists, { item_id: 'item' });
          docRef
            .doc(isExists.id)
            .delete()
            .then(() => {
              getWishList();
              console.log(isExists.id + ' deleted');
            });
          setFavorites(heartOutline);
        } else {
          setFavorites(heart);
        }
      } else {
        if (writing) {
          addFavorites();
        }
      }
    }
  };

  useEffect(() => {
    if (favorites === heartOutline) {
      console.log('use Effect Set Favorites');
      checkFavorite(false);
    }
  }, [WishLists]);

  if (
    !item.unit_price ||
    item.unit_price == '' ||
    item.unit_price == null ||
    !item.unit ||
    item.unit == '' ||
    item.unit == null ||
    item.is_deleted
  ) {
    return null;
  }

  return (
    <IonCard>
      <IonCardContent style={{ padding: 10 }}>
        <IonRow>
          <IonCol size="4">
            <FirestoreIonImg src={item.img_url as string} showModal />
          </IonCol>
          <IonCol size="7.8">
            <IonLabel>
              <p>{item.name}</p>
              <br />
              <p className="currency">
                {/* $ {item.unit_price} {item.unit} */}
                <CurrencyAmount amount={item.unit_price} /> {item.unit}
              </p>
            </IonLabel>
            <br />
            <IonItem lines="none" style={{ float: 'right', height: '33px' }}>
              {totalItemInCard === 0 ? (
                <IonButton color="tertiary" fill="outline" size="small" onClick={() => addCart(item)}>
                  <IonIcon slot="start" icon={add} />
                  Add to Cart
                </IonButton>
              ) : (
                <IonButtons style={{ flexDirection: 'row', justifyContent: 'space-around', width: 100 }}>
                  <IonButton
                    color="tertiary"
                    fill="outline"
                    size="small"
                    onClick={() => {
                      delCart(item);
                    }}
                  >
                    -
                  </IonButton>
                  {totalItemInCard}
                  <IonButton
                    color="tertiary"
                    fill="outline"
                    size="small"
                    onClick={() => {
                      addCart(item);
                    }}
                  >
                    +
                  </IonButton>
                </IonButtons>
              )}
              <IonButton
                color="secondary"
                fill="clear"
                size="small"
                onClick={() => {
                  checkFavorite(true);
                }}
              >
                <IonIcon icon={favorites} />
              </IonButton>
            </IonItem>
            <IonItem lines="none" style={{ float: 'right' }} className="shop_item_min_order">
              <IonLabel>Minimum order: Nil</IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonCardContent>
      <ErrorDisplay
        errorProps={errorProps}
        closeHandler={() => {
          setErrorProps({ ...errorProps, showError: false });
        }}
        eventHandler={() => {
          history.push('/login');
          setErrorProps({ ...errorProps, showError: false });
        }}
      />
    </IonCard>
  );
};

export default ShopItem;
