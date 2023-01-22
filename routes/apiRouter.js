const apiRouter = require('express').Router();
const createHttpError = require('http-errors');
const path = require('path');
const multer = require('multer');
const baseController = require('../controllers/baseController');
const pictureController = require('../controllers/pictureController');
const heroController = require('../controllers/heroController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

//common routes
apiRouter.get('/', baseController.getModels);
apiRouter.get('/:id', baseController.getModel);
apiRouter.post('/', baseController.createModel);
apiRouter.put('/:id', baseController.updateModel);   
apiRouter.delete('/:id', baseController.deleteModel);
//special routes
apiRouter.post('/:id/pic', upload.single('pic'), pictureController.addPicToModel);
apiRouter.post('/:id/powers', heroController.addPowers);



apiRouter.use('*', function(req, res, next) {
    const err = createHttpError(404, `Route not found ${req.path}`);
    next(err);
});

module.exports = apiRouter;