const createHttpError = require("http-errors");

module.exports.addPowers = async (req, res, next) => {
  const {
    ModelClass,
    modelName,
    body : {powerIdArray},
    file,
    params: { id },
  } = req;
  
  try {
    if (modelName !== 'Hero') {
      throw createHttpError(404, `You can't add pictures to ${modelName}`);
    }
    if (!powerIdArray) {
      throw createHttpError(404, `powerIdArray is not defined for ${modelName}`);  
    }
    const hero = await ModelClass.findByPk(id);
    if (!hero) {
       throw createHttpError(404, `${modelName} not found`);
    }
    
    hero.setPowers(powerIdArray);

    res.status(201).send({ data: powerIdArray });

  } catch (error) {
    next(error);
  }
};
