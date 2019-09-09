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
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
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
      cb(null, { fieldName: 'TESTING_METADATA' });
    },
    key(req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
