const { Hero, Picture, Power } = require("../models");

module.exports.heroMW = (req, res, next) => {
  req.modelName = "Hero";
  req.ModelClass = Hero;
  req.relationsArray = [
    {
      model: Picture,
      as: "pictures",
      attributes: {
        exclude: ["heroId"],
      },
    },
    {
      model: Power,
      as: "powers",
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  ];
  next();
};
module.exports.pictureMW = (req, res, next) => {
  req.modelName = "Picture";
  req.ModelClass = Picture;
  req.relationsArray = [
    {
      model: Hero,
      as: "heroes",
      attributes: ["id", "nickname"],
    },
  ];
  next();
};
module.exports.powerMW = (req, res, next) => {
  req.modelName = "Power";
  req.ModelClass = Power;
  req.relationsArray = [
    {
      model: Hero,
      as: "heroes",
      attributes: ["id", "nickname"],
      through: { attributes: [] },
    },
  ];
  next();
};
