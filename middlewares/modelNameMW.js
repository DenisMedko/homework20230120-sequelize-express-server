module.exports.heroMW = (req, res, next) => {
    req.modelName = 'Hero';
    next();
};
module.exports.abilityMW = (req, res, next) => {
    req.modelName = 'Ability';
    next();
}