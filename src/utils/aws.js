const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../config/default');

aws.config.update({
  secretAccessKey: config.aws.secretAccessKey,
  accessKeyId: config.aws.accessKeyId,
  region: 'us-east-1',
});

// Initiliaze S3 Instance
const s3 = new aws.S3();

// What file types to filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/gzip' || file.mimetype === 'application/x-gzip') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only .tar.gz is allowed!'), false);
  }
};

const imageFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type, only .png or .jpg is allowed!'), false);
  }
};

// Upload
const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'arcc-league',
    metadata(req, file, cb) {
      cb(null, { fieldName: '' });
    },
    key(req, file, cb) {
      cb(null, `${Date.now().toString()}${file.originalname}`);
    },
  }),
});

const profileUpload = multer({
  imageFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'arcc-profile-pictures',
    metadata(req, file, cb) {
      cb(null, { fieldName: 'profile' });
    },
    key(req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = { upload, profileUpload };
