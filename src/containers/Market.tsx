import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonThumbnail,
} from '@ionic/react';
import React, { useState } from 'react';
import './Market.css';
import { connect, useSelector } from 'react-redux';
import CategoryItem from './CategoryItem';
import ShopHeaderWithProps from '../components/ShopHeaderWithProps';
import { FirestoreReducer, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useParams } from 'react-router';
import { Markets, RootState } from '../model/DomainModels';
import { CartState } from '../services/FirebaseIniti';
import MarketHeader from '../components/MarketHeader';
import CartModal from './Cart';

const Market: React.FC = () => {
  const { market_id } = useParams<{ market_id: string }>();
  const shop = {} as Markets;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const CartBadge: React.FC<CartState> = ({ cart }) => {
    const cartSize = cart.cartItemList.length;
    if (cartSize > 0) {
      return <IonBadge color="danger">{cart.cartItemList.length}</IonBadge>;
    } else {
      return <div></div>;
    }
  };

  useFirestoreConnect([
    { collection: 'Markets', doc: market_id, storeAs: 'Market' },
    {
      collection: 'Markets',
      doc: market_id,
      subcollections: [
        {
          collection: 'Categories',
        },
      ],
      storeAs: 'Category',
    },
  ]);

  const doneLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const stateStore = useSelector<RootState>((state) => state.firestore) as FirestoreReducer.Reducer;

  if (stateStore.ordered.Market && stateStore.ordered.Market.length > 0) {
    doneLoading();
  } else {
    doneLoading();
  }

  const mapStateToProps = (state: CartState) => {
    const { firebase, cart, shop } = state;
    return { firebase, cart, shop };
  };

  const [CartCounter] = useState<React.ElementType>(connect(mapStateToProps)(CartBadge));
  const Market: any = useSelector<any>((state: any) => state.firestore.data.Market);
  const CategoryTmp: any = useSelector<any>((state: any) => state.firestore.data.Category);

  const Categories: any = [];
  for (const k in CategoryTmp) {
    if (CategoryTmp[k] && !CategoryTmp[k].is_deleted) {
      Categories.push({
        id: k,
        ...CategoryTmp[k],
      });
    }
  }

  return (
    <IonPage>
      <MarketHeader setShowModal={setShowModal} shop={Market || {}} CartCounter={CartCounter} />

      <IonContent className="category" fullscreen>
        <ShopHeaderWithProps Market={Market} />
        <IonGrid>
          <IonRow>
            {loading ? (
              <>
                <IonCol>
                  <IonCard class="category-skeleton-image">
                    <IonCardContent>
                      <IonThumbnail class="skeleton-image">
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonCardSubtitle className="category_name ion-text-capitalize">
                        <IonSkeletonText animated />
                      </IonCardSubtitle>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard class="category-skeleton-image">
                    <IonCardContent>
                      <IonThumbnail class="skeleton-image">
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonCardSubtitle className="category_name ion-text-capitalize">
                        <IonSkeletonText animated />
                      </IonCardSubtitle>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard class="category-skeleton-image">
                    <IonCardContent>
                      <IonThumbnail class="skeleton-image">
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonCardSubtitle className="category_name ion-text-capitalize">
                        <IonSkeletonText animated />
                      </IonCardSubtitle>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard class="category-skeleton-image">
                    <IonCardContent>
                      <IonThumbnail class="skeleton-image">
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonCardSubtitle className="category_name ion-text-capitalize">
                        <IonSkeletonText animated />
                      </IonCardSubtitle>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </>
            ) : (
              <>
                {Categories && Categories.length > 0 ? (
                  Categories.map((obj: any) => {
                    return (
                      <IonCol key={obj.id}>
                        <CategoryItem market_id={market_id} category={obj} shop={shop} />
                      </IonCol>
                    );
                  })
                ) : (
                  <p></p>
                )}
              </>
            )}
          </IonRow>
        </IonGrid>
        <CartModal modal={showModal} closeHandler={() => setShowModal(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Market;
