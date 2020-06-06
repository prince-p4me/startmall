import React, {useState} from "react";
import {useFirebase} from "react-redux-firebase";
import {IonImg, IonModal, IonSkeletonText, IonThumbnail} from "@ionic/react";

interface GetURLProps {
  src: string;
  className?: string;
  showModal?: boolean
}

export const FirestoreIonImg: React.FC<GetURLProps> = ({className, src, showModal}) => {
  const [downloadUrl, setDownloadUrl] = useState(src);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storage = useFirebase().storage();
  const [loading, setLoading] = useState(src && src.startsWith("gs"));

  const doneLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  };

  if (src && src.startsWith("gs")) {
    const imgref = storage.refFromURL(src);
    // Get the download URL
    imgref
      .getDownloadURL()
      .then((url: string | any) => {
        // Insert url into an <img> tag to "download"
        // Or inserted into an <img> element:
        setDownloadUrl(url);
        doneLoading();
      })
      .catch((error: any) => {
        doneLoading();
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;

          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }

  const onImgClick = () => {
    if (showModal) {
      setIsModalOpen(true)
    }
  };

  if (loading) {
    return (
      <IonThumbnail class="skeleton-image-preview" style={{width: '100%', height: '100%'}}>
        <IonSkeletonText animated/>
      </IonThumbnail>
    )
  }
  return (
    <>
      <IonImg src={downloadUrl} onClick={onImgClick}/>
      <IonModal cssClass="image-preview-popup" backdropDismiss={true} isOpen={isModalOpen} swipeToClose={true}
                onDidDismiss={() => setIsModalOpen(false)}>
        <IonImg src={downloadUrl} onClick={() => setIsModalOpen(false)}/>
      </IonModal>
    </>
  );
};
