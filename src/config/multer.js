// multer.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(__dirname, '../../public/uploads/')); // ที่อยู่ที่จะเก็บไฟล์อัพโหลด
//     },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`; // สร้าง suffix ที่ไม่ซ้ำกัน
//       cb(null, `${uniqueSuffix}-${file.originalname}`); // ตั้งชื่อไฟล์ใหม่ที่จะเซฟลงไป
//     }
//   });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/uploads')); 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original filename
    }
  });

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, PNG, and GIF files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 },// 1MB file size limit
  fileFilter: fileFilter
});

export default upload;
