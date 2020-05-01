import React from "react";
import { IonCard, IonCardHeader, IonCardSubtitle } from "@ionic/react";
import { CategoryProps } from "../model/ComponentProps";
import { FirestoreIonImg } from "../services/FirebaseStorage";

const CategoryItem: React.FC<CategoryProps> = ({ market_id, category }) => {
  return (
    <IonCard
      routerLink={"/tabs/market/" + market_id + "/item_list/" + category.id}
      class="category"
    >
      <IonCardHeader>
        <FirestoreIonImg src={category.img_url as string} />
        {/* <IonImg src={category.img_url as string}></IonImg> */}
        <IonCardSubtitle className="category_name">{category.name}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default CategoryItem;
