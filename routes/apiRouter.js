const apiRouter = require('express').Router();
const createHttpError = require('http-errors');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

apiRouter.get('/', (req, res, next) => 
    res.send(`get all ${req.modelName}`));

apiRouter.get('/:id', (req, res, next) => 
    res.send(`get ${req.modelName} by id : ${req.params.id}`));

apiRouter.post('/:id', (req, res, next) => 
    res.send(`create ${req.modelName} by id : ${req.params.id} body : ${JSON.stringify(req.body)}`));

apiRouter.post('/:id/pic', upload.single('pic'), (req, res, next) => 
    res.send(`add pic to ${req.modelName} by id : ${req.params.id} file : ${req.file.filename}`));

apiRouter.put('/:id', (req, res, next) => 
    res.send(`update ${req.modelName} by id : ${req.params.id} body : ${JSON.stringify(req.body)}`));
    
apiRouter.delete('/:id', (req, res, next) => 
    res.send(`delete ${req.modelName} by id : ${req.params.id}`));

apiRouter.use('*', function(req, res, next) {
    const err = createHttpError(404, `Route not found ${req.path}`);
    next(err);
});

module.exports = apiRouter;