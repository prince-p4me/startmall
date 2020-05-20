import {
  IonContent,
  IonPage,
  IonImg,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
  IonRow,
  IonCol
} from "@ionic/react";
import React, { useState } from "react";
import MainHeader from "../components/MainHeader";
import { useHistory, useLocation } from "react-router";
import ErrorDisplay from "../components/ErrorDisplay";
import { ErrorProps } from "../model/ComponentProps";

const PostCodeSearch: React.FC = () => {
  const [postcode, setPostCode] = useState<string>("2000");
  const history = useHistory();
  const location = useLocation();
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);


  // // SplashScreen.show({
  // //   showDuration: 2000,
  // //   autoHide: true
  // // });
  // let elements = document.querySelectorAll("ion-tab-bar");

  // if (elements != null && location.pathname.endsWith("dashboard")) {
  //   console.log(location.pathname.endsWith("dashboard"));
  //   Object.keys(elements).map((key: any) => {
  //     elements[key].className = "hide";
  //     return "";
  //   });
  // } else {
  //   Object.keys(elements).map((key: any) => {
  //     elements[key].className = "unhide";
  //     return "";
  //   });
  // }

  function handleSearch() {
    if (!postcode || postcode === "") {
      setErrorProps({
        message: "Please enter postcode",
        showError: true,
        type: 1,
        autoHide: true,
        buttonText: ""
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

      <IonContent>
        <div style={{ marginTop: "80%",marginLeft: 10,marginRight:10 }}>
          <IonInput
            className="postcode_search_input"
            autofocus={true}
            inputMode="numeric"
            placeholder="Enter your postcode here"
            value={postcode}
            onIonChange={e => {
              setPostCode(e.detail.value + "");
            }}
          ></IonInput>
        </div>
        <div style={{ textAlign: "right", marginRight:10,marginTop:10 }}>
          <IonButton color="secondary" fill="solid" className="postcode_search_button" onClick={handleSearch}>
            <b>Find Shop</b>
          </IonButton>
        </div>

        <ErrorDisplay errorProps={errorProps} closeHandler={() => setErrorProps({ ...errorProps, showError: false })} eventHandler={() => { }} />
      </IonContent>
    </IonPage>
  );
};

export default PostCodeSearch;