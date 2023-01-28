import { storage } from "../utils/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { convertBase64ToBlob } from "../utils/converToBlob";

export const uploadFile = async (
  type = "image",
  file,
  setPercentage = null
) => {
  return new Promise(async (resolve, reject) => {
    const metadata = {
      contentType: type === "image" ? "image/jpeg" : "video/mp4",
    };
    let fileToUpload;
    if (file instanceof File) {
      fileToUpload = file;
    } else {
      let fileName = new Date().getTime();
      const blob = convertBase64ToBlob(file);
      fileToUpload = new File([blob], fileName, { type: "image/jpeg" });
    }
    const fileName = new Date().getTime() + fileToUpload.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, fileToUpload, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage && setPercentage(progress);
      },
      (error) => {
        console.log("Something went wrong while uploading video", error);
        reject(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
};
