import React from 'react';
import { IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList } from '@ionic/react';
import { AddressProps } from '../model/ComponentProps';
import { useTranslation } from 'react-i18next';

const AddressForm: React.FC<AddressProps> = ({ address, onAddressChange }) => {
  const { t } = useTranslation();

  return (
    <IonList>
      <IonItemDivider style={{ backgroundColor: '#f7f7f7', paddingTop: 10, paddingBottom: 10 }}>
        <IonIcon slot="start" src="assets/icon/1x/SVG/delivery.svg" style={{ marginRight: 0 }}></IonIcon>
        <IonLabel color="primary" style={{ paddingLeft: 10 }}>
          {t('deliveryAddress')}
        </IonLabel>
      </IonItemDivider>
      <IonItem style={{ paddingRight: 16 }}>
        <IonLabel id="contact_name" color="medium" position="floating">
          {t('contactName')}
        </IonLabel>
        <IonInput
          placeholder="e.g. John"
          required={true}
          value={address.name}
          onIonChange={(e) => {
            onAddressChange({ ...address, name: e.detail.value });
          }}
        ></IonInput>
      </IonItem>
      <IonItem style={{ paddingRight: 16 }}>
        <IonLabel
          id="address_line_1"
          color={address && !address?.isValidAddress1 ? 'danger' : 'medium'}
          position="floating"
        >
          {t('addressLine', { lineNumber: 1 })} *
        </IonLabel>
        <IonInput
          placeholder="e.g. Level 3A, Levy walk"
          required={true}
          value={address.address1}
          onIonChange={(e) => {
            onAddressChange({ ...address, address1: e.detail.value, isValidAddress1: true });
          }}
        ></IonInput>
      </IonItem>
      <IonItem hidden style={{ paddingRight: 16 }}>
        <IonLabel id="address_line_2" color="medium" position="floating">
          {t('addressLine', { lineNumber: 2 })}
        </IonLabel>
        <IonInput
          placeholder="e.g. Buildings"
          value={address.address2}
          onIonChange={(e) => {
            onAddressChange({ ...address, address2: e.detail.value });
          }}
        ></IonInput>
      </IonItem>
      <IonItem style={{ paddingRight: 16 }}>
        <IonLabel id="suburb" color="medium" position="floating">
          {t('suburb')}
        </IonLabel>
        <IonInput
          placeholder="e.g CBD, Chatswood"
          required={true}
          value={address.suburb}
          onIonChange={(e) => {
            onAddressChange({ ...address, suburb: e.detail.value });
          }}
        ></IonInput>
      </IonItem>
      <IonItem hidden style={{ paddingRight: 16 }}>
        <IonLabel id="state" color="medium" position="floating">
          {t('state')}
        </IonLabel>
        <IonInput
          placeholder="e.g. NSW"
          value={address.state}
          onIonChange={(e) => {
            onAddressChange({ ...address, state: e.detail.value });
          }}
        ></IonInput>
      </IonItem>
      <IonItem style={{ paddingRight: 16 }}>
        <IonLabel id="postcode" color="medium" position="floating">
          {t('postcode')}
        </IonLabel>
        <IonInput
          placeholder="e.g. 2000"
          value={address.postcode}
          onIonChange={(e) => {
            onAddressChange({ ...address, postcode: e.detail.value });
          }}
        ></IonInput>
      </IonItem>
      <IonItem style={{ paddingRight: 16 }}>
        <IonLabel id="email" color="medium" position="floating">
          {t('email')}
        </IonLabel>
        <IonInput
          type="email"
          placeholder="e.g. John@test.com "
          value={address.email}
          onIonChange={(e) => {
            onAddressChange({ ...address, email: e.detail.value });
          }}
        ></IonInput>
      </IonItem>
      <IonItem style={{ paddingRight: 16 }}>
        <IonLabel id="phone" color={address && !address?.isValidNumber ? 'danger' : 'medium'} position="floating">
          {t('phoneNumber')} *
        </IonLabel>
        <IonInput
          type="tel"
          placeholder="+61 321112321"
          value={address.phone}
          onIonChange={(e) => {
            onAddressChange({ ...address, phone: e.detail.value, isValidNumber: true });
          }}
        ></IonInput>
      </IonItem>

      {address && !(address.isValidAddress1 && address.isValidNumber) ? (
        <IonItem style={{ paddingRight: 16 }} lines="none">
          <IonLabel id="validate" color="danger" position="floating">
            * {t('fillUpAllRequiredInfoMsg')}
          </IonLabel>
        </IonItem>
      ) : null}
    </IonList>
  );
};

export default AddressForm;
