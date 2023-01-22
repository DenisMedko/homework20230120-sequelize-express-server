module.exports.heroMW = (req, res, next) => {
    req.modelName = 'Hero';
    next();
};
module.exports.powerMW = (req, res, next) => {
    req.modelName = 'Power';
    next();
}