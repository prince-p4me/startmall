import React, {  } from "react";
import {
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonItemDivider
} from "@ionic/react";
import { AddressProps } from "../model/ComponentProps";
import * as Actions from "../reducers/AddressAction";
import { useDispatch } from "react-redux";
import { Address } from "cluster";
import { AddressObj } from "../model/DomainModels";

const AddressForm: React.FC<AddressProps> = ({ onAddressChange }) => {
  const dispatch = useDispatch();
  const address = {} as AddressObj;
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
      <IonItemDivider>
        <IonLabel>Address</IonLabel>
      </IonItemDivider>
      <IonItem lines="none">
        <IonLabel id="address_line_1" color="medium" position="floating">
          Address Line 1
        </IonLabel>
        <IonInput placeholder="e.g. Level 3A, Levy walk" required={true}
          onIonChange={e => {
            console.log(e);
            onAddressChange({...address, address1:e.detail.value})
          }}></IonInput>
      </IonItem>
      <IonItem lines="none">
        <IonLabel id="address_line_2" color="medium" position="floating">
          Address Line 2
        </IonLabel>
        <IonInput value={address.address2} placeholder="e.g. Buildings"
          onIonChange={e => {
            dispatch(Actions.addAddress2Action(e.detail.value!));
          }}></IonInput>
      </IonItem>
      <IonItem lines="none">
        <IonLabel id="suburb" color="medium" position="floating">
          Suburb
        </IonLabel>
        <IonInput value={address.suburb} placeholder="e.g CBD, Chatswood" required={true}
          onIonChange={e => {
            dispatch(Actions.addSubUrbAction(e.detail.value!));
          }}></IonInput>
      </IonItem>
      <IonItem lines="none">
        <IonLabel id="state" color="medium" position="floating">
          State
        </IonLabel>
        <IonInput value={address.state} placeholder="e.g. NSW"
          onIonChange={e => {
            dispatch(Actions.addStateAction(e.detail.value!));
          }}></IonInput>
      </IonItem>
      <IonItem lines="none">
        <IonLabel id="postcode" color="medium" position="floating">
          Postcode
        </IonLabel>
        <IonInput value={address.postcode} placeholder="e.g. 2000"
          onIonChange={e => {
            dispatch(Actions.addPostCodeAction(e.detail.value!));
          }}></IonInput>
      </IonItem>
      <IonItemDivider>
        <IonLabel>Contact</IonLabel>
      </IonItemDivider>
      <IonItem lines="none">
        <IonLabel id="email" color="medium" position="floating">
          Email
        </IonLabel>
        <IonInput type="email" placeholder="e.g. John@test.com " value={address.email}
          onIonChange={e => {
            dispatch(Actions.addEmailAction(e.detail.value!));
          }}></IonInput>
      </IonItem>
      <IonItem lines="none">
        <IonLabel id="phone" color="medium" position="floating">
          Phone Number
        </IonLabel>
        <IonInput type="tel" placeholder="+61 321112321" value={address.phone}
          onIonChange={e => {
            dispatch(Actions.addPhoneAction(e.detail.value!));
          }}></IonInput>
      </IonItem>
    </IonList>
  );
};

export default AddressForm;
