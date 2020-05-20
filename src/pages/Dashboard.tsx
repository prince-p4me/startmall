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
import { useHistory, useLocation } from "react-router";
import ErrorDisplay from "../components/ErrorDisplay";
import { ErrorProps } from "../model/ComponentProps";

const Dashboard: React.FC = () => {
  console.log("entering Dashboard");
  const [postcode, setPostCode] = useState<string>("2000");
  const history = useHistory();
  const location = useLocation();
  // const [showError, setShowError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);


  // // SplashScreen.show({
  // //   showDuration: 2000,
  // //   autoHide: true
  // // });
  let elements = document.querySelectorAll("ion-tab-bar");

  if (elements != null && location.pathname.endsWith("dashboard")) {
    console.log(location.pathname.endsWith("dashboard"));
    Object.keys(elements).map((key: any) => {
      elements[key].className = "hide";
      return "";
    });
  } else {
    Object.keys(elements).map((key: any) => {
      elements[key].className = "unhide";
      return "";
    });
  }

  function handleSearch() {
    if (!postcode || postcode === "") {
      setErrorProps({
        message: "Please enter postcode",
        showError: true,
        type: 1,
        autoHide: true,
        buttonText:""
      })
      // setErrorMessage("Please enter postcode")
      // setShowError(true)
      return;
    }
    history.push("/tabs/shop_selections/" + postcode)
  }

  return (
    <IonPage>
      <MainHeader />

      <IonContent fullscreen>
        <IonImg className="dashboard_ad" src="/assets/icon/1x/cover.png" onClick={() => { history.push("/page/postcode_search") }} />

        <div className="dashboard_main">
          <IonItem>
            <IonInput
              autofocus={true}
              className="postcode_input"
              inputMode="numeric"
              placeholder="Enter postcode to search"
              value={postcode}
              onIonChange={e => {
                setPostCode(e.detail.value + "");
              }}
            ></IonInput>
            <IonButton onClick={handleSearch}> Search</IonButton>
          </IonItem>
          <IonImg src="/assets/img/instructions.png" onClick={() => { history.push("/page/postcode_search") }}/>
        </div>
        <ErrorDisplay errorProps={errorProps} closeHandler={() => setErrorProps({ ...errorProps, showError: false })} eventHandler={() => { }} />

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