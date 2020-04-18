import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { IonButton, IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

const GoBack = () => {
  var history = useHistory();
  return (
    <IonButton onClick={() => history.goBack()}>
      <IonIcon
        size="large"
        slot="icon-only"
        icon={chevronBackOutline}
      ></IonIcon>
    </IonButton>
  );
};

export default withRouter(GoBack);
