import React from 'react';
import { IonImg } from '@ionic/react';

export const GreenTick = () => {
  return (
    <div className="green-tick-success">
      <IonImg src="/assets/icon/tick-green-30.svg"></IonImg>
    </div>
  );
};

export const DispatchIcon = () => {
  return (
    <div className="green-tick-success">
      <IonImg style={{ width: '20px', height: '20px' }} src="/assets/icon/menu-side-stock.svg"></IonImg>
    </div>
  );
};

export const DeliveryIcon = () => {
  return (
    <div className="green-tick-success">
      <IonImg style={{ width: '20px', height: '20px' }} src="/assets/icon/1X/SVG/delivery.svg"></IonImg>
    </div>
  );
};
