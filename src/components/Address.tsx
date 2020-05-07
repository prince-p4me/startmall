import React, { useState, useEffect } from "react";
import {
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonItemDivider
} from "@ionic/react";
import fetchAddressFinder from "../services/AddressFinderService";
import { AddressProps } from "../model/ComponentProps";

const Address: React.FC<AddressProps> = ({ id, address }) => {
  const [address1] = useState("");
  const [address2] = useState("");
  const [suburb] = useState("");
  const [state] = useState("");
  const [postcode] = useState("");
  const [phone] = useState("");
  const [email] = useState("");

  address = {
    address1: address1,
    address2: address2,
    suburb: suburb,
    state: state,
    postcode: postcode,
    phone: phone,
    email: email
  }
  useEffect(() => {
    var possibleAddresses = fetchAddressFinder(address1);
    console.log(possibleAddresses);
  }, [address1]);

  console.log(address1);
  return (
    <IonList>
      {" "}
      <IonItemDivider>
        <IonLabel>Address</IonLabel>
      </IonItemDivider>
      <IonItem lines="none">
        <IonLabel id="address_line_1" color="medium" position="floating">
          Address Line 1
        </IonLabel>
        <IonInput placeholder="e.g. Level 3A, Levy walk" required={true} value={address1}></IonInput>
      </IonItem>
      <IonItem lines="none">
        <IonLabel id="address_line_2" color="medium" position="floating">
          Address Line 2
        </IonLabel>
        <IonInput value={address2} placeholder="e.g. Buildings"></IonInput>
      </IonItem>
      <IonItem lines="none">
        <IonLabel id="suburb" color="medium" position="floating">
          Suburb
        </IonLabel>
        <IonInput value={suburb} placeholder="e.g CBD, Chatswood" required={true} ></IonInput>
      </IonItem>
      <IonItem lines="none">
        <IonLabel id="state" color="medium" position="floating">
          State
        </IonLabel>
        <IonInput value={state} placeholder="e.g. NSW"></IonInput>
      </IonItem>
      <IonItem lines="none">
        <IonLabel id="postcode" color="medium" position="floating">
          Postcode
        </IonLabel>
        <IonInput value={postcode} placeholder="e.g. 2000"></IonInput>
      </IonItem>
      <IonItemDivider>
        <IonLabel>Contact</IonLabel>
      </IonItemDivider>
      <IonItem lines="none">
        <IonLabel id="email" color="medium" position="floating">
          Email
        </IonLabel>
        <IonInput type="email" placeholder="e.g. John@test.com " value={email}></IonInput>
      </IonItem>
      <IonItem lines="none">
        <IonLabel id="phone" color="medium" position="floating">
          Phone Number
        </IonLabel>
        <IonInput type="tel" placeholder="+61 321112321" value={phone}></IonInput>
      </IonItem>
    </IonList>
  );
};

export default Address;
