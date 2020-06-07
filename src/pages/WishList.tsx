import React, { useEffect, useState } from 'react';
import { IonBadge, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import ShopItem from '../containers/ShopItem';
import { connect, useSelector } from 'react-redux';
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase';
import { Markets, RootState, WishList } from '../model/DomainModels';
import { useParams } from 'react-router';
import { CartState } from '../services/FirebaseIniti';
import MarketHeader from '../components/MarketHeader';
import Cart from '../containers/Cart';
import { useTranslation } from 'react-i18next';

const WishListPage: React.FC = () => {
  console.log('entering WishListPage');
  const auth = useSelector<RootState>((state) => state.firebase.auth);
  const { t } = useTranslation();
  const json_auth = JSON.parse(JSON.stringify(auth));
  const { market_id } = useParams<{ market_id: string }>();
  const db = useFirebase().firestore();
  const [items, setItems] = useState<Array<WishList>>([]);
  const [showModal, setShowModal] = useState(false);
  const [shop, setShop] = useState({} as Markets);

  useFirestoreConnect([{ collection: 'Markets', doc: market_id, storeAs: 'Market' }]);

  const CartBadge: React.FC<CartState> = ({ cart }) => {
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

  const CartCounter = connect(mapStateToProps)(CartBadge);

  useFirestoreConnect([
    {
      collection: 'WishLists',
      doc: json_auth.uid,
      subcollections: [
        {
          collection: 'Markets',
          doc: market_id,
        },
      ],
      storeAs: 'shop',
    },
  ]);

  useEffect(() => {
    db.collection('WishLists')
      .doc(json_auth.uid)
      .collection('Markets')
      .doc(market_id)
      .get()
      .then((res) => {
        const shop1: any = res.data();
        setShop(shop1 as Markets);
      });
    db.collection('WishLists')
      .doc(json_auth.uid)
      .collection('Markets')
      .doc(market_id)
      .collection('Items')
      .get()
      .then((snapshot) => {
        const data: Array<WishList> = [];
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            const item = doc.data();
            data.push(item as WishList);
          });
        }
        setItems(data);
      });
  }, [db, json_auth.uid, market_id]);

  const Market: any = useSelector<any>((state: any) => state.firestore.data.Market);

  return (
    <IonPage>
      <MarketHeader showTerms={false} setShowModal={setShowModal} shop={Market || {}} CartCounter={CartCounter} />
      <IonContent className="shope_item_listing" fullscreen>
        <IonGrid>
          <IonRow>
            {items && items.length > 0 ? (
              items.map((obj, index) => {
                return (
                  <IonCol key={index} size="12">
                    <ShopItem item={obj.item} market_id={obj.market_id} category_id={obj.category_id} />
                  </IonCol>
                );
              })
            ) : (
              <p></p>
            )}
          </IonRow>
        </IonGrid>
        <Cart modal={showModal} closeHandler={() => setShowModal(!showModal)} />
      </IonContent>
    </IonPage>
  );
};

export default WishListPage;
