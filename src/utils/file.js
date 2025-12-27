import { v2 as cloudinary } from "cloudinary";

const cloudinaryFile = "mern-20250622";
 
async function uploadFile(files) {
  const uploadResults = [];
  for (const file of files) {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: cloudinaryFile,
          },
          (error, data) => {
            if (error) return reject(error);

            resolve(data);
          }
        )
        .end(file.buffer);
    });
uploadResults.push(result)
  }
  return uploadResults;
}

export default uploadFile;
