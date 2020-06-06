import React from 'react';
import { IonHeader, IonToolbar, IonImg, IonMenuButton } from '@ionic/react';

const MainHeader: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonMenuButton slot="end" />
      </IonToolbar>
      <IonImg class="startmall_header " src="/assets/icon/1x/logo2.png" />
    </IonHeader>
  );
};

export default MainHeader;
