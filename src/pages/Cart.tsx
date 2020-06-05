import {IonContent, IonPage, useIonViewDidEnter,} from "@ionic/react";
import React, {useState} from "react";
import CartModal from "../containers/Cart";
import {useHistory} from "react-router-dom";

const Cart: React.FC = () => {

  const history = useHistory();
  const [showModal, setShowModal] = useState(true);

  const closeHandler = (goBack: boolean) => {
    setShowModal(false);
    if (goBack) {
      history.goBack();
    }
  };

  useIonViewDidEnter(() => {
    setShowModal(true);
  });

  return (
    <IonPage id="cart">
      <IonContent>
        <CartModal modal={showModal} closeHandler={closeHandler}/>
      </IonContent>
    </IonPage>
  )
};

export default Cart;
