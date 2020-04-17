import React, { useState, useEffect } from "react";
import { IonItem, IonText, IonInput, IonLabel, IonContent, IonList, IonItemDivider } from "@ionic/react";
import fetchAddressFinder from "../services/AddressFinderService";
import CheckoutForm from "./CheckoutForm";

interface AddressProps {
  id: string;
}

const Address: React.FC<AddressProps> = () => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    var possibleAddresses = fetchAddressFinder(address1);
    console.log(possibleAddresses);
  }, [address1]);
  
  console.log(address1);
  return (
    <IonList> <IonItemDivider>
    <IonLabel>
      Address
    </IonLabel>
  </IonItemDivider>
      <IonItem lines="none">
            <IonLabel  id="address_line_1" position="floating">Address Line 1</IonLabel>
            <IonInput value={address1}></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel id="address_line_2" position="floating">Address Line 2</IonLabel>
            <IonInput value={address2}></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel id="suburb" position="floating">Suburb</IonLabel>
            <IonInput value={suburb}></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel id="state" position="floating">State</IonLabel>
            <IonInput value={state}></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel id="postcode" position="floating">Postcode</IonLabel>
            <IonInput value={postcode}></IonInput>
          </IonItem>
          <IonItemDivider>
            <IonLabel>
              Contact
            </IonLabel>
          </IonItemDivider>
          <IonItem lines="none">
            <IonLabel id="email" position="floating">Email</IonLabel>
            <IonInput value={email}></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel id="phone" position="floating">Phone Number</IonLabel>
            <IonInput value={phone}></IonInput>
          </IonItem>
    </IonList>
  );
};

export default Address;
