import React from 'react';
import { IonCard, IonCardContent, IonCardSubtitle } from '@ionic/react';
import { CategoryProps } from '../model/ComponentProps';
import { FirestoreIonImg } from '../services/FirebaseStorage';

const CategoryItem: React.FC<CategoryProps> = ({ market_id, category, shop }) => {
  // console.log("category is:==" + JSON.stringify(category));
  if (category.is_deleted || category.name == '' || category.name == null) {
    return <span></span>;
  }
  return (
    <IonCard routerLink={'/tabs/market/' + market_id + '/item_list/' + category.id} class="category">
      <IonCardContent>
        <FirestoreIonImg src={category.img_url as string} />
        {/* <IonImg src={category.img_url as string}></IonImg> */}
        <IonCardSubtitle className="category_name ion-text-capitalize">{category.name}</IonCardSubtitle>
      </IonCardContent>
    </IonCard>
  );
};

export default CategoryItem;
