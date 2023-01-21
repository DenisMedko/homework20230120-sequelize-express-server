const router = require('express').Router();
const createHttpError = require('http-errors');
const apiRouter = require('./apiRouter');
const { heroMW, abilityMW } = require('../middlewares/modelNameMW')

router.use('/api/heroes', heroMW, apiRouter);
router.use('/api/abilities', abilityMW, apiRouter);

router.use('*', function(req, res, next) {
    const err = createHttpError(404, `Page not found ${req.path}`);
    next(err);
});

module.exports = router;