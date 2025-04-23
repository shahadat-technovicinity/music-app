// import { v2 as cloudinary } from 'cloudinary';
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dnfgu6ltf",
//   api_key: process.env.CLOUDINARY_API_KEY || "877988418139969",
//   api_secret: process.env.CLOUDINARY_API_SECRET || "sD7CJwuR_O2en0mYp0W5uN-aUiw",
// });
// const uploadToCloudinary = async (req) => {
//   if (req.file) {
//     const resultUrl = await new Promise((resolve, reject) => {
//       if (!req.file) {
//         reject(new Error("No file provided"));
//         return;
//       }
//       cloudinary.uploader.upload(req.file.path, (error, result) => {
//         if (error) {
//           reject(new Error("Error uploading to Cloudinary: " + error.message));
//         } else if (result) {
//           resolve(result);
//         } else {
//           reject(new Error("No result from Cloudinary"));
//         }
//       });
//     });
//     return resultUrl; // Return the result URL
//   }
//   throw new Error("No file provided for upload");
// };
// export { uploadToCloudinary };


/////////////////
// utils/resultCloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dnfgu6ltf",
  api_key: process.env.CLOUDINARY_API_KEY || "877988418139969",
  api_secret: process.env.CLOUDINARY_API_SECRET || "sD7CJwuR_O2en0mYp0W5uN-aUiw",
});

export const uploadToCloudinary = async (buffer, folder = 'uploads') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto', // handles image/audio/video
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};
