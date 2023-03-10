const { Picture } = require('../models');
const createHttpError = require("http-errors");

module.exports.addPicToModel = async (req, res, next) => {
  const {
    ModelClass,
    modelName,
    file,
    params: { id },
  } = req;
  
  try {
    if (modelName !== 'Hero') {
      throw createHttpError(404, `You can't add pictures to ${modelName}`);
    }
    
    const hero = await ModelClass.findByPk(id);
    if (!hero) {
       throw createHttpError(404, `${modelName} not found`);
    }
    
    const picture = await Picture.create({ picPath: file.filename });
    
    picture.setHero(hero);

    res.status(201).send({ data: picture });

  } catch (error) {
    next(error);
  }
};
