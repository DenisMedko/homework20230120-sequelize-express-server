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
    
    // const [updatedModels, [model]] = await ModelClass.update(
    //   { picPath: file.filename },
    //   { where: { id: id }, returning: true }
    // );

    // if (updatedModels !== 1) {
    //   throw createHttpError(404, `${modelName} not found`);
    // }
    const hero = await ModelClass.findByPk(id);
    if (!hero) {
       throw createHttpError(404, `${modelName} not found`);
    }
    console.log(Picture);
    const picture = await Picture.create({ picPath: file.filename });
    
    picture.setHero(hero);

    res.status(201).send({ data: picture });

  } catch (error) {
    next(error);
  }
};
