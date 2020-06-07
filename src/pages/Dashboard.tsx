import { IonButton, IonContent, IonFooter, IonImg, IonInput, IonItem, IonPage } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import MainHeader from '../components/MainHeader';
import { useHistory, useLocation } from 'react-router';
import ErrorDisplay from '../components/ErrorDisplay';
import { ErrorProps } from '../model/ComponentProps';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  console.log('entering Dashboard');
  const [postcode, setPostCode] = useState<string>(process.env.REACT_APP_ENV === 'dev' ? '2000' : '');
  const history = useHistory();
  const location = useLocation();
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);
  const inputElement = useRef<any>();
  const { t } = useTranslation();

  const elements = document.querySelectorAll('ion-tab-bar');

  if (elements != null && location.pathname.endsWith('dashboard')) {
    console.log(location.pathname.endsWith('dashboard'));
    Object.keys(elements).map((key: any) => {
      elements[key].className = 'hide';
      return '';
    });
  } else {
    Object.keys(elements).map((key: any) => {
      elements[key].className = 'unhide';
      return '';
    });
  }

  const handleSearch = () => {
    if (!postcode || postcode === '') {
      setErrorProps({
        message: 'Please enter postcode',
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
      <IonContent fullscreen>
        <IonImg
          className="dashboard_ad"
          src="/assets/icon/1x/cover.png"
          onClick={() => {
            history.push('/page/postcode_search');
          }}
        />

        <div>
          <IonItem>
            <IonInput
              ref={inputElement}
              autofocus={false}
              className="postcode_input"
              inputMode="numeric"
              placeholder="Enter postcode to search"
              value={postcode}
              onIonChange={(e) => {
                setPostCode(e.detail.value + '');
              }}
            />
            <IonButton slot={'end'} className={'postcode-search'} onClick={handleSearch} shape="round">
              {t('search')}
            </IonButton>
          </IonItem>
          <IonImg
            src="/assets/img/instructions.png"
            onClick={() => {
              history.push('/page/postcode_search');
            }}
          />
        </div>
        <ErrorDisplay errorProps={errorProps} closeHandler={() => setErrorProps({ ...errorProps, showError: false })} />
      </IonContent>
      <IonFooter>
        <IonItem lines="none">
          <IonImg class="footer_pay" slot="start" src="/assets/icon/payment-method.png"></IonImg>
          <IonButton slot="end">{t('orderNow')}</IonButton>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default Dashboard;
