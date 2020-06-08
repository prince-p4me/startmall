import React, { useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { LanguageSelectionProps } from '../model/ComponentProps';
import { useTranslation } from 'react-i18next';
import { closeOutline } from 'ionicons/icons';

const LanguageSelectionModal: React.FC<LanguageSelectionProps> = ({ modal, closeHandler }) => {
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng') || 'en');
  const { t, i18n } = useTranslation();

  const handleSubmit = async () => {
    await i18n.changeLanguage(language);
    closeHandler(false);
  };

  return (
    <IonModal isOpen={modal} cssClass="image-preview-popup">
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="end">
            <IonButton onClick={() => closeHandler(true)}>
              <IonIcon size="large" slot="icon-only" icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle text-center>
            <b>{t('languageSelection')}</b>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList>
        <IonItem button lines="none" onClick={() => setLanguage('en')} color={language === 'en' ? 'medium' : ''}>
          <IonLabel>English</IonLabel>
        </IonItem>
        <IonItem button lines="none" onClick={() => setLanguage('ko')} color={language === 'ko' ? 'medium' : ''}>
          <IonLabel>Korea</IonLabel>
        </IonItem>
        <IonItem button lines="none" onClick={() => setLanguage('hi')} color={language === 'hi' ? 'medium' : ''}>
          <IonLabel>Hindi(India)</IonLabel>
        </IonItem>
        <IonItem button lines="none" onClick={() => setLanguage('zh')} color={language === 'zh' ? 'medium' : ''}>
          <IonLabel>Chinese</IonLabel>
        </IonItem>
      </IonList>
      <IonFooter className="checkout_page_footer">
        <IonButton expand="full" onClick={handleSubmit}>
          {t('submit')}
        </IonButton>
      </IonFooter>
    </IonModal>
  );
};

export default LanguageSelectionModal;
