import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon} from "@ionic/react";
import { pauseCircleOutline } from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";
import Weather from "../components/Weather";
import "./Dashboard.css";
import News from "../components/News";

const Dashboard: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle size="large" class="icon">
              <IonIcon icon={pauseCircleOutline}></IonIcon>
              StartMall
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Weather name={name} />
        <News />
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
