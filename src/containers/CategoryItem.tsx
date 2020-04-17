import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg
} from "@ionic/react";
import { useHistory } from "react-router";

interface CategoryObj {
  id: number;
  market: string;
  categoryName: string;
  imageUrl: string;
}

interface ContainerProps {
  category: CategoryObj;
}

const CategoryItem: React.FC<ContainerProps> = ({ category }) => {
  // const [] = useState(heartOutline);
  var history = useHistory();

  function categoryHandler() {
    console.log("redirecting to Item list");
    history.push("/tabs/ItemsList/" + category.categoryName);
  }

  return (
    <IonCard onClick={categoryHandler} class="category">
      <IonCardHeader>
        <IonCardSubtitle>{category.market}</IonCardSubtitle>
        <IonCardTitle>{category.categoryName}</IonCardTitle>
        <IonImg src={category.imageUrl}></IonImg>
      </IonCardHeader>
    </IonCard>
  );
};

export default CategoryItem;
