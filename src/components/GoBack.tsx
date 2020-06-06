import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { IonButton, IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';

const GoBack = () => {
  const history = useHistory();
  return (
    <IonButton fill="clear" class="back_button" onClick={() => history.goBack()}>
      <IonIcon size="small" slot="icon-only" icon={chevronBackOutline}></IonIcon>
    </IonButton>
  );
};

export default withRouter(GoBack);
