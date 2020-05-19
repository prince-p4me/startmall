import React, { } from "react";
import {
  IonItem,
  IonInput,
  IonLabel,
  IonList, IonIcon,
  IonItemDivider
} from "@ionic/react";
import { AddressProps } from "../model/ComponentProps";

const AddressForm: React.FC<AddressProps> = ({ address, onAddressChange }) => {
  // const dispatch = useDispatch();
  // const address = {} as AddressObj;
  // let address1 = {
  //   address1: address.address1,
  //   address2: address.address2,
  //   suburb: address.suburb,
  //   state: address.state,
  //   postcode: address.postcode,
  //   phone: address.phone,
  //   email: address.email
  // }
  // useEffect(() => {
  //   var possibleAddresses = fetchAddressFinder(address.address1);
  //   console.log(possibleAddresses);
  // }, [address]);

  // console.log(address);
  return (
    <IonList>
      <IonItemDivider style={{ backgroundColor: "#f7f7f7", paddingTop: 10, paddingBottom: 10 }}>
        <IonIcon slot="start" src="assets/icon/1x/SVG/delivery.svg"></IonIcon>
        <IonLabel color="primary" style={{ paddingLeft: 10 }}>WHERE TO?</IonLabel>
      </IonItemDivider>
      <IonItem style={{ paddingRight: 16 }}>
        <IonLabel id="contact_name" color="medium" position="floating">
          Contact Name
        </IonLabel>
        <IonInput placeholder="e.g. John" required={true}
          value={address.name}
          onIonChange={e => {
            console.log(e);
            onAddressChange({ ...address, name: e.detail.value })
          }}></IonInput>
      </IonItem>
      <IonItem style={{ paddingRight: 16 }}>
        <IonLabel id="address_line_1" color={(address && !address ?.isValidAddress1) ? "danger" : "medium"} position="floating">
          Address Line 1 *
        </IonLabel>
        <IonInput placeholder="e.g. Level 3A, Levy walk" required={true}
          value={address.address1}
          onIonChange={e => {
            console.log(e);
            onAddressChange({ ...address, address1: e.detail.value, isValidAddress1: true })
          }}></IonInput>
      </IonItem>
      <IonItem hidden style={{ paddingRight: 16 }}>
        <IonLabel id="address_line_2" color="medium" position="floating">
          Address Line 2
        </IonLabel>
        <IonInput placeholder="e.g. Buildings"
          value={address.address2}
          onIonChange={e => {
            onAddressChange({ ...address, address2: e.detail.value })
          }}></IonInput>
      </IonItem>
      <IonItem hidden style={{ paddingRight: 16 }}>
        <IonLabel id="suburb" color="medium" position="floating">
          Suburb
        </IonLabel>
        <IonInput hidden placeholder="e.g CBD, Chatswood" required={true}
          value={address.suburb}
          onIonChange={e => {
            onAddressChange({ ...address, suburb: e.detail.value })
          }}></IonInput>
      </IonItem>
      <IonItem hidden style={{ paddingRight: 16 }}>
        <IonLabel id="state" color="medium" position="floating">
          State
        </IonLabel>
        <IonInput placeholder="e.g. NSW"
          value={address.state}
          onIonChange={e => {
            onAddressChange({ ...address, state: e.detail.value })
          }}></IonInput>
      </IonItem>
      <IonItem hidden style={{ paddingRight: 16 }}>
        <IonLabel id="postcode" color="medium" position="floating">
          Postcode
        </IonLabel>
        <IonInput hidden placeholder="e.g. 2000"
          value={address.postcode}
          onIonChange={e => {
            onAddressChange({ ...address, postcode: e.detail.value })
          }}></IonInput>
      </IonItem>
      <IonItem style={{ paddingRight: 16 }}>
        <IonLabel id="email" color="medium" position="floating">
          Email
        </IonLabel>
        <IonInput type="email" placeholder="e.g. John@test.com "
          value={address.email}
          onIonChange={e => {
            onAddressChange({ ...address, email: e.detail.value })
            // dispatch(Actions.addEmailAction(e.detail.value!));
          }}></IonInput>
      </IonItem>
      <IonItem style={{ paddingRight: 16 }}>
        <IonLabel id="phone" color={(address && !address ?.isValidNumber) ? "danger" : "medium"} position="floating">
          Phone Number *
        </IonLabel>
        <IonInput type="tel" placeholder="+61 321112321"
          value={address.phone}
          onIonChange={e => {
            onAddressChange({ ...address, phone: e.detail.value, isValidNumber: true })
            // dispatch(Actions.addPhoneAction(e.detail.value!));
          }}></IonInput>
      </IonItem>

      {
        (address && (!(address.isValidAddress1 && address.isValidNumber)))
          ?
          <IonItem style={{ paddingRight: 16 }} lines="none">
            <IonLabel id="validate" color="danger" position="floating">
              * Please fill up all the required information.
            </IonLabel>
          </IonItem>
          : null
      }
    </IonList>
  );
};

export default AddressForm;
