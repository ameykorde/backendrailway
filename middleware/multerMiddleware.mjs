import multer from 'multer';
import path from 'path';

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set destination folder for file upload
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    // Set filename for uploaded file with current timestamp and original extension
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Set up multer with configured storage
const upload = multer({ storage: storage });

// Export multer upload
export default upload;