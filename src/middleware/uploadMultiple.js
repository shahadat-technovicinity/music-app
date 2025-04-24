import multer from 'multer';

const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     'image/jpeg',
//     'image/png',
//     'audio/mpeg',
//     'audio/mp3',
//     'text/plain',
//     'application/pdf',
//   ];

//   if (!allowedTypes.includes(file.mimetype)) {
//     return cb(new Error('Only images (jpeg, png), audio (mp3), and lyrics (txt, pdf) are allowed'), false);
//   }
//   cb(null, true);
// };


const fileFilter = (req, file, cb) => {
  const mime = file.mimetype;
  const ext = file.originalname.split('.').pop().toLowerCase();

  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'audio/mpeg',
    'audio/mp3',
    'text/plain',
    'application/pdf',
    'application/octet-stream' // Some .lrc files may fall under this
  ];

  const allowedExtensions = ['jpg', 'jpeg', 'png', 'mp3', 'txt', 'pdf', 'lrc'];

  if (!allowedMimes.includes(mime) || !allowedExtensions.includes(ext)) {
    return cb(
      new Error('Only images (jpeg, png), audio (mp3), and lyrics (txt, pdf, lrc) are allowed'),
      false
    );
  }

  cb(null, true);
};

const uploadMulti = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB per file
  fileFilter,
});

export {uploadMulti};


// import multer from 'multer';
// const storage = multer.memoryStorage();
// const fileFilter = (req, file, cb) => {
//   const mime = file.mimetype;
//   const ext = file.originalname.split('.').pop().toLowerCase();

//   const allowedMimes = [
//     'image/jpeg',
//     'image/png',
//     'audio/mpeg',
//     'audio/mp3',
//     'text/plain',
//     'application/pdf',
//     'application/octet-stream' // Some .lrc files may fall under this
//   ];

//   const allowedExtensions = ['jpg', 'jpeg', 'png', 'mp3', 'txt', 'pdf', 'lrc'];

//   if (!allowedMimes.includes(mime) || !allowedExtensions.includes(ext)) {
//     return cb(
//       new Error('Only images (jpeg, png), audio (mp3), and lyrics (txt, pdf, lrc) are allowed'),
//       false
//     );
//   }

//   cb(null, true);
// };
// export {uploadMulti};