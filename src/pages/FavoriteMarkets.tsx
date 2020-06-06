import {
  IonButtons,
  IonCard,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useHistory } from 'react-router';
import { FirestoreReducer, isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../model/DomainModels';
import { heart } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

const FavoriteMarkets: React.FC = () => {
  console.log('entering Dashboard');
  const history = useHistory();
  const { t } = useTranslation();
  const auth = useSelector<RootState>((state) => state.firebase.auth);
  const json_auth = JSON.parse(JSON.stringify(auth));
  const [isLogin, setLogin] = useState(false);

  function handleShopClick(obj: any) {
    history.push('favoriteitems/' + obj.id);
  }

  useFirestoreConnect(
    json_auth.uid
      ? [
          {
            collection: 'WishLists',
            doc: json_auth.uid,
            subcollections: [
              {
                collection: 'Markets',
              },
            ],
            storeAs: 'FavoritesMarkets',
          },
        ]
      : [],
  );

  const dataStore = useSelector<RootState>((state) => state.firestore) as FirestoreReducer.Reducer;

  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      console.clear();
      setLogin(true);
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
      <IonText slot="right">{t('shopSelectionText')}</IonText>
      <IonContent fullscreen>
        {isLogin ? (
          <IonGrid>
            {dataStore.ordered.FavoritesMarkets && dataStore.ordered.FavoritesMarkets.length > 0 ? (
              <IonRow>
                {dataStore.ordered.FavoritesMarkets.map((obj) => (
                  <IonCol key={obj.id}>
                    <IonCard
                      style={{
                        marginBottom: 10,
                        paddingBottom: 10,
                      }}
                      onClick={() => {
                        handleShopClick(obj);
                      }}
                    >
                      <IonImg src={obj.img_url as string} alt={obj.name}></IonImg>
                      <IonCardSubtitle className="category_name">{obj.name}</IonCardSubtitle>
                      <div style={{ textAlign: 'center' }}>
                        <IonLabel>
                          <IonIcon color="primary" icon={heart} />
                        </IonLabel>
                      </div>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            ) : (
              <p className="no_data_found">{t('noFavoritesMsg')}</p>
            )}
          </IonGrid>
        ) : (
          <p className="no_data_found">{t('loginToSeeWishList')}</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FavoriteMarkets;
