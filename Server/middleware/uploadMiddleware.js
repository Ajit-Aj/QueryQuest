// import multer from "multer";
// import path from "path";

// // // Set up storage engine
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "uploads/");
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
// //   },
// // });

// // // File filter to only accept certain file types
// // const fileFilter = (req, file, cb) => {
// //   const fileTypes = /jpeg|jpg|png/;
// //   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
// //   const mimetype = fileTypes.test(file.mimetype);

// //   if (extname && mimetype) {
// //     return cb(null, true);
// //   } else {
// //     cb("Error: Images Only!");
// //   }
// // };

// // // Initialize multer
// // const upload = multer({
// //   storage: storage,
// //   fileFilter: fileFilter,
// //   limits: { fileSize: 1024 * 1024 }, // 1MB limit
// // });


// // Multer configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   }
// });
// const upload = multer({ storage });

// export default upload;


import multer from "multer";
import path from "path";

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the folder to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Create a unique filename
  }
});

// File filter to only accept specific file types
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/; // Acceptable file types
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Only images (jpeg, jpg, png) are allowed!");
  }
};

// Initialize multer with storage, file filter, and size limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 }, // 1MB file size limit
});

export default upload;
