const { Hero, Picture, Power } = require('../models');

module.exports.heroMW = (req, res, next) => {
    req.modelName = 'Hero';
    req.ModelClass = Hero;
    next();
};
module.exports.pictureMW = (req, res, next) => {
    req.modelName = 'Picture';
    req.ModelClass = Picture;
    next();
}
module.exports.powerMW = (req, res, next) => {
    req.modelName = 'Power';
    req.ModelClass = Power;
    next();
}