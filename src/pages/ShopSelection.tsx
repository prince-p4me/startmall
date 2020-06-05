import {
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonImg,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSkeletonText,
  IonText,
  IonThumbnail,
  IonToolbar
} from "@ionic/react";
import React, {useState} from "react";
import "./Dashboard.css";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import {FirestoreReducer, useFirestoreConnect} from "react-redux-firebase";
import {useDispatch, useSelector} from "react-redux";
import ShopSelectionList from "../containers/ShopSelectionList";
import {Markets, RootState} from "../model/DomainModels";
import {setCurrentShop} from "../reducers/ShopAction";
import {useTranslation} from "react-i18next";

import './skeleton.css'

const ShopSelection: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const {postcode} = useParams<{ postcode: string }>();
  const marketList: Array<Markets> = [];

  function handleShopClick(shop: any) {
    dispatch(setCurrentShop({shop: shop}));
    history.push("/tabs/market/" + shop.id);
  }

  useFirestoreConnect([{collection: "Markets"}]);

  const doneLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  };

  const markets = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;

  if (markets.ordered.Markets && markets.ordered.Markets.length > 0) {
    markets.ordered.Markets.forEach(market => {
      if (postcode) {
        if (market.support_postcodes && market.support_postcodes.length > 0) {
          if (market.support_postcodes.includes(postcode)) {
            marketList.push(market)
          }
        }
      }
    });
    doneLoading()
  } else {
    doneLoading()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton/>
          </IonButtons>
        </IonToolbar>
        <IonImg class="startmall_header " src="/assets/icon/1x/logo2.png"/>
      </IonHeader>
      <IonText slot="right">{t('shopSelectionText')}</IonText>
      <IonContent fullscreen>
        {
          loading ?
            <IonList className="shop_selection">

              <IonCard class="shop_card">
                <IonThumbnail class="skeleton-image">
                  <IonSkeletonText animated/>
                </IonThumbnail>
                <IonLabel class={"skeleton-label"}>
                  <h3>
                    <IonSkeletonText animated/>
                  </h3>
                  <p>
                    <IonSkeletonText animated/>
                  </p>
                  <p>
                    <IonSkeletonText animated/>
                  </p>
                  <p>
                    <IonSkeletonText animated/>
                  </p>
                </IonLabel>
              </IonCard>
              <IonCard class="shop_card">
                <IonThumbnail class="skeleton-image">
                  <IonSkeletonText animated/>
                </IonThumbnail>
                <IonLabel class={"skeleton-label"}>
                  <h3>
                    <IonSkeletonText animated/>
                  </h3>
                  <p>
                    <IonSkeletonText animated/>
                  </p>
                  <p>
                    <IonSkeletonText animated/>
                  </p>
                  <p>
                    <IonSkeletonText animated/>
                  </p>
                </IonLabel>
              </IonCard>
            </IonList>
            :
            <>
              {marketList.length > 0 ? (
                <ShopSelectionList
                  handleShopClick={handleShopClick}
                  shops={marketList}
                />
              ) : (
                <p className="no_data_found">{t('noShopInAreaMsg')}</p>
              )}
            </>
        }

      </IonContent>
    </IonPage>
  );
};

export default ShopSelection;
