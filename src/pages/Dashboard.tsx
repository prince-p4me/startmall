import {
  IonContent,
  IonPage,
  IonImg,
  IonItem,
  IonInput,
  IonButton,
  IonFooter
} from "@ionic/react";
import React, { useState } from "react";
import MainHeader from "../components/MainHeader";
import { useHistory } from "react-router";

const Dashboard: React.FC = () => {
  console.log("entering Dashboard");
  const [postcode,setPostCode] = useState<string>();
  const history = useHistory();
  // SplashScreen.show({
  //   showDuration: 2000,
  //   autoHide: true
  // });
  let elements = document.querySelectorAll("ion-tab-bar");

  if (elements != null) {
    Object.keys(elements).map((key: any) => {
      elements[key].className = "hide";
    });
  }

  function handleSearch() {
    if(postcode == ""){
      alert("Please enter postcode");
      return;
    }
    history.push("/tabs/shop_selections/"+postcode)
  }

  return (
    <IonPage>
      <MainHeader />

      <IonContent fullscreen>
        <IonImg className="dashboard_ad" src="/assets/icon/1x/cover.png" />
        <div className="dashboard_main">
          <IonItem>
            <IonInput
              autofocus={true}
              className="postcode_input"
              inputMode="numeric"
              placeholder="Enter postcode to search"
              onIonChange={e => {
                let value = e.detail.value
                setPostCode(value+"")
              }}
            ></IonInput>
            <IonButton onClick={handleSearch}> Search</IonButton>
          </IonItem>

          <IonImg src="/assets/img/instructions.png" />
        </div>
      </IonContent>
      <IonFooter>
        <IonItem lines="none">
          <IonImg
            class="footer_pay"
            slot="start"
            src="/assets/icon/1x/payment.png"
          ></IonImg>
          <IonButton slot="end"> Order now </IonButton>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default Dashboard;