import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

const uploadFile = async (file) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadedFileData = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "hireheaven",
          access_mode: "public",
        },
        (err, result) => {
          return resolve(result);
        }
      )
      .end(buffer);
  });

  return uploadedFileData;
};

export default uploadFile;
