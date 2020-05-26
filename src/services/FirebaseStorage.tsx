import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { IonImg, IonSkeletonText, IonThumbnail } from "@ionic/react";

interface GetURLProps {
  src: string;
  className?:string;
}
export const FirestoreIonImg: React.FC<GetURLProps> = ({ className, src }) => {
  const [downloadUrl, setDownloadUrl] = useState(src);
  const storage = useFirebase().storage();
  const [loading, setLoading] = useState(src && src.startsWith("gs"));

  const doneLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  if (src && src.startsWith("gs")) {
    const imgref = storage.refFromURL(src);
    // console.log("Image Ref");
    // console.log(imgref);
    // Get the download URL
    imgref
      .getDownloadURL()
      .then(function(url: string | any) {
        // Insert url into an <img> tag to "download"
        // Or inserted into an <img> element:
        setDownloadUrl(url);
        doneLoading();
      })
      .catch(function(error: any) {
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

  if(loading){
    return (
        <IonThumbnail class="skeleton-image-preview" style={{width: '100%', height: '100%'}} >
          <IonSkeletonText animated />
        </IonThumbnail>
    )
  }
  return <IonImg src={downloadUrl} />;
};
