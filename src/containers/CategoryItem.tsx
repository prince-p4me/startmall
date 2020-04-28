import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonImg} from "@ionic/react";
import { CategoryProps } from "../model/ComponentProps";

const CategoryItem: React.FC<CategoryProps> = ({ market_id, category }) => {

  return (
    <IonCard routerLink={ "/tabs/market/"+ market_id +"/item_list/" + category.id} class="category">
      <IonCardHeader>
        <IonCardSubtitle>{category.name}</IonCardSubtitle>
        <IonImg src={category.img_url as string}></IonImg>
      </IonCardHeader>
    </IonCard>
  );
};

export default CategoryItem;
