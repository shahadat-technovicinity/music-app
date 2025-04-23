import multer from "multer";
import path from "path";

const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 2097152;
const ALLOWED_FILE_TYPE = process.env.ALLOWED_FILE_TYPE || [
  "jpeg",
  "jpg",
  "png",
];

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, process.env.UPLOAD_FILE || "public/images/users");
  // },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);

    cb(null, Date.now() + "-" + file.originalname);
  },
});


const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  if (!ALLOWED_FILE_TYPE.includes(extname.substring(1))) {
    return cb(
      new Error(
        `Only ${ALLOWED_FILE_TYPE.join(", ")} files are allowed!`,
        false
      )
    );
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});
export { upload };

////////////
// middleware/uploadFile.js
// middleware/uploadFile.js
// import multer from "multer";

// const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 25 * 1024 * 1024; // 25MB max
// const ALLOWED_MIME_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'audio/mpeg',
//   'audio/mp3',
// ];

// const storage = multer.memoryStorage(); // Required for Cloudinary streaming

// const fileFilter = (req, file, cb) => {
//   if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
//     return cb(
//       new Error(
//         `Unsupported file type. Only JPEG, PNG, and MP3 are allowed.`
//       ),
//       false
//     );
//   }
//   cb(null, true);
// };

// export const upload = multer({
//   storage,
//   limits: { fileSize: MAX_FILE_SIZE },
//   fileFilter,
// });
