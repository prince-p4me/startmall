import React from 'react';
import { IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonRadio, IonRadioGroup } from '@ionic/react';
import { PaymentProps } from '../model/ComponentProps';
import { chevronForwardOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

const Payment: React.FC<PaymentProps> = ({ payment, onChange }) => {
  const { t } = useTranslation();

  return (
    <IonList>
      <IonItemDivider style={{ backgroundColor: '#f7f7f7', paddingTop: 10, paddingBottom: 10 }}>
        <IonIcon slot="start" src="assets/icon/1x/SVG/credit-card.svg"></IonIcon>
        <IonLabel color="primary" style={{ paddingLeft: 10 }}>
          {t('howToPay')}
        </IonLabel>
      </IonItemDivider>
      <IonRadioGroup value={payment} onIonChange={(e) => onChange(e.detail.value)}>
        <IonItem lines="none">
          <IonRadio slot="start" value="direct_debit"></IonRadio>
          <IonLabel>
            <p>{t('directDebit')}</p>
            <p>{t('bankAccountNumber')} XXXX 1234</p>
          </IonLabel>
          <IonIcon slot="end" color="primary" icon={chevronForwardOutline}></IonIcon>
        </IonItem>
        <IonItem lines="none">
          <IonRadio slot="start" value="visa_master"></IonRadio>
          <IonLabel>
            <p>{t('debitCreditCard')} XXXX 4321</p>
          </IonLabel>
          <IonIcon slot="end" color="primary" icon={chevronForwardOutline}></IonIcon>
        </IonItem>
        <IonItem lines="none">
          <IonRadio slot="start" value="applepay"></IonRadio>
          <IonLabel>
            <p>{t('applePay')}</p>
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonRadio slot="start" value="cod"></IonRadio>
          <IonLabel>
            <p>{t('cashOnDelivery')}</p>
          </IonLabel>
        </IonItem>
      </IonRadioGroup>
    </IonList>
  );
};

export default Payment;
