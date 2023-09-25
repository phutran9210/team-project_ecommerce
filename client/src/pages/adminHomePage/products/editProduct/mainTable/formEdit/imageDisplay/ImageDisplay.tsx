import React, { useEffect, useState } from "react";
import { Image, Button, Upload, notification } from "antd";
import app from "../../../../../../../service/firebase/firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
const storage = getStorage(app);

interface ImageDisplayProps {
  src?: string;
  limit: number;
  data?: string[];
  onPrimaryImageUpdate?: (primaryImage: string | undefined) => void;
  onImagesUpdate?: (images: string[]) => void;
}

const uploadImageToFirebase = async (file: any): Promise<string> => {
  const uniqueFileName = `${Date.now()}-${file.name}`;
  const fileRef = ref(storage, `uploads/${uniqueFileName}`);

  return new Promise(async (resolve, reject) => {
    const uploadTask = uploadBytesResumable(fileRef, file.originFileObj);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Error uploading image: ", error);
        reject("Failed to upload image");
      },
      async () => {
        const downloadURL = await getDownloadURL(fileRef);
        resolve(downloadURL);
      }
    );
  });
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  src,
  limit,
  data,
  onPrimaryImageUpdate,
  onImagesUpdate,
}) => {
  const [useSrc] = useState<boolean>(!!src);
  const [images, setImages] = useState<string[]>(data || []);
  const [primaryImageSrc, setPrimaryImageSrc] = useState<string | undefined>(
    src
  );

  const [uploadFileList, setUploadFileList] = useState<any[]>([]);

  useEffect(() => {
    if (onImagesUpdate) {
      onImagesUpdate(images);
    }
    if (onPrimaryImageUpdate) {
      onPrimaryImageUpdate(primaryImageSrc);
    }
  }, []);

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    onImagesUpdate?.(newImages);
  };

  const removeSrc = () => {
    setPrimaryImageSrc(undefined);
    onImagesUpdate?.([]);
  };
  // xử lý upload
  let isNotificationShown = false;
  const handleUploadChange = async (info: any) => {
    const { fileList } = info;
    if (fileList.length === 0) {
      return;
    }

    const invalidFiles = fileList.filter((file: any) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      return !["png", "jpeg", "jpg", "heic", "heif"].includes(fileExtension);
    });

    if (invalidFiles.length) {
      notification.error({
        message: "Only .png, .jpg, and .jpeg files are accepted!",
        duration: 3,
        placement: "bottomRight",
      });
      return;
    }

    // Tính toán số lượng ảnh hiện có
    const currentImageCount = useSrc
      ? primaryImageSrc
        ? 1
        : 0
      : images.length;

    // Kiểm tra số lượng ảnh có vượt quá giới hạn hay không
    if (currentImageCount + fileList.length > limit) {
      if (!isNotificationShown) {
        notification.error({
          message: "The number of photos exceeds the allowed limit!",
          duration: 3,
          placement: "bottomRight",
        });
        isNotificationShown = true;

        setTimeout(() => {
          isNotificationShown = false;
        }, 1000);
      }
      setUploadFileList([]);
      return;
    }

    const uploadedImageURLs = await Promise.all(
      fileList.map((file: any) => uploadImageToFirebase(file))
    );
    if (!data) {
      setPrimaryImageSrc(uploadedImageURLs[0]);
    }

    setImages([...images, ...uploadedImageURLs]);
    onImagesUpdate?.([...images, ...uploadedImageURLs]);
  };

  return (
    <div>
      {primaryImageSrc && (
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginRight: "10px",
          }}
        >
          <div>
            {" "}
            <Image width={60} src={primaryImageSrc} />
            <Button
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: 18,
                height: 18,
                padding: 0,
                backgroundColor: "red",
              }}
              onClick={removeSrc}
            ></Button>
          </div>
        </div>
      )}

      {data &&
        images.slice(0, limit).map((imageSrc, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            <Image width={60} src={imageSrc} />
            <Button
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: 18,
                height: 18,
                padding: 0,
                backgroundColor: "red",
              }}
              onClick={() => handleRemoveImage(index)}
            ></Button>
          </div>
        ))}
      <Upload
        accept=".png,.jpg,.jpeg,.heic,.heif"
        fileList={uploadFileList}
        style={{ display: "inline-block" }}
        showUploadList={false}
        multiple={true}
        beforeUpload={() => false}
        onChange={handleUploadChange}
      >
        <Button>Upload</Button>
      </Upload>
    </div>
  );
};

export default ImageDisplay;
