import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonImg,
  IonFooter
} from "@ionic/react";
import { CategoryProps } from "../model/ComponentProps";

const CategoryItem: React.FC<CategoryProps> = ({ category }) => {

  return (
    <IonCard routerLink={ "/tabs/ItemsList/" + category.categoryName} class="category">
      <IonCardHeader>
        <IonCardSubtitle>{category.market}</IonCardSubtitle>
        <IonImg src={category.imageUrl}></IonImg>
        <IonFooter>{category.categoryName}</IonFooter>
      </IonCardHeader>
    </IonCard>
  );
};

export default CategoryItem;
