import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { IonImg } from "@ionic/react";

interface GetURLProps {
  src: string;
}
export const FirestoreIonImg: React.FC<GetURLProps> = ({ src }) => {
  var [downloadUrl, setDownloadUrl] = useState(src);
  var storage = useFirebase().storage();
  if (src.startsWith("gs")) {
    var imgref = storage.refFromURL(src);
    console.log("Image Ref");
    console.log(imgref);
    // Get the download URL
    imgref
      .getDownloadURL()
      .then(function(url: string | any) {
        // Insert url into an <img> tag to "download"
        // Or inserted into an <img> element:
        setDownloadUrl(url);
        console.log ("found URL");
        console.log (url);
      })
      .catch(function(error: any) {
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

  return <IonImg src={downloadUrl} />;
};
