import React from "react";
import { IonCard, IonCardContent } from "@ionic/react";
import Iframe  from "react-iframe";

interface ContainerProps {
  name: string;
}

const Weather: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonCard>
      <IonCardContent>
        <Iframe
          url="https://www.meteoblue.com/en/weather/widget/daily?geoloc=detect&days=7&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&precipunit=MILLIMETER&coloured=coloured&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windgust=0&winddirection=0&uv=0&humidity=0&precipitation=0&precipitationprobability=0&spot=0&pressure=0&layout=light"
          frameBorder={0}
          scrolling="no"
          sandbox= "allow-scripts"
        ></Iframe>
        
      </IonCardContent>
    </IonCard>
  );
};

export default Weather;
