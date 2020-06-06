import { IonButton, IonContent, IonInput, IonLabel, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import MainHeader from '../components/MainHeader';
import { useHistory } from 'react-router';
import ErrorDisplay from '../components/ErrorDisplay';
import { ErrorProps } from '../model/ComponentProps';
import { useTranslation } from 'react-i18next';

import './ProductSearch.css';

const PostCodeSearch: React.FC = () => {
  const [postcode, setPostCode] = useState<string>(process.env.REACT_APP_ENV === 'dev' ? '2000' : '');
  const history = useHistory();
  const { t } = useTranslation();
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);

  const handleSearch = () => {
    if (!postcode || postcode === '') {
      setErrorProps({
        message: t('enterPostcodeMsg'),
        showError: true,
        type: 1,
        autoHide: true,
        buttonText: '',
      });
      return;
    }
    history.push('/tabs/shop_selections/' + postcode);
  };

  return (
    <IonPage>
      <MainHeader />
      <IonContent>
        <div style={{ marginTop: '50%', marginLeft: 10, marginRight: 10 }}>
          <IonLabel className="ion-text-postcode" color="secondary">
            {t('startWithPostcodeMsg')}
          </IonLabel>
          <IonInput
            className="postcode_search_input"
            autofocus={true}
            inputMode="numeric"
            placeholder={t('enterPostcode')}
            value={postcode}
            onIonChange={(e) => {
              setPostCode(e.detail.value as string);
            }}
          ></IonInput>
        </div>
        <div style={{ textAlign: 'right', marginRight: 10, marginTop: 10 }}>
          <IonButton color="secondary" fill="solid" className="postcode_search_button" onClick={handleSearch}>
            <b>{t('findShop')}</b>
          </IonButton>
        </div>

        <ErrorDisplay errorProps={errorProps} closeHandler={() => setErrorProps({ ...errorProps, showError: false })} />
      </IonContent>
    </IonPage>
  );
};

export default PostCodeSearch;
