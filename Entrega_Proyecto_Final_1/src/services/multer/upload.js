
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const { type } = req.body;
      if (type === 'profile') {
        cb(null, 'uploads/profiles');
      } else if (type === 'product') {
        cb(null, 'uploads/products');
      } else if (type === 'document') {
        cb(null, 'uploads/documents');
      } else {
        cb(new Error('Tipo de archivo no válido'));
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

export default upload