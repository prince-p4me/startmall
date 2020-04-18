import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg
} from "@ionic/react";
import { CategoryProps } from "../model/ComponentProps";

const CategoryItem: React.FC<CategoryProps> = ({ category }) => {

  return (
    <IonCard routerLink={ "/tabs/ItemsList/" + category.categoryName} class="category">
      <IonCardHeader>
        <IonCardSubtitle>{category.market}</IonCardSubtitle>
        <IonCardTitle>{category.categoryName}</IonCardTitle>
        <IonImg src={category.imageUrl}></IonImg>
      </IonCardHeader>
    </IonCard>
  );
};

export default CategoryItem;
