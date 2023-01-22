const apiRouter = require('express').Router();
const createHttpError = require('http-errors');
const path = require('path');
const multer = require('multer');
const baseController = require('../controllers/baseController');
const pictureController = require('../controllers/pictureController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

apiRouter.get('/', baseController.getModels);

apiRouter.get('/:id', baseController.getModel);

apiRouter.post('/', baseController.createModel);

apiRouter.post('/:id/pic', upload.single('pic'), pictureController.addPicToModel);

apiRouter.put('/:id', baseController.updateModel);
    
apiRouter.delete('/:id', baseController.deleteModel);

apiRouter.use('*', function(req, res, next) {
    const err = createHttpError(404, `Route not found ${req.path}`);
    next(err);
});

module.exports = apiRouter;