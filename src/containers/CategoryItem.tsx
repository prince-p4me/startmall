import React from "react";
import { IonCard, IonCardHeader, IonCardSubtitle, IonImg } from "@ionic/react";
import { CategoryProps } from "../model/ComponentProps";

const CategoryItem: React.FC<CategoryProps> = ({ market_id, category }) => {
  return (
    <IonCard
      routerLink={"/tabs/market/" + market_id + "/item_list/" + category.id}
      class="category"
    >
      <IonCardHeader>
        <IonImg src={category.img_url as string}></IonImg>
        <IonCardSubtitle className="category_name">{category.name}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default CategoryItem;
