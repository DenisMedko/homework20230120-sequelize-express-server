const createHttpError = require("http-errors");

module.exports.createModel = async (req, res, next) => {
  try {
    const { body, ModelClass } = req;

    const newModel = await ModelClass.create(body);

    res.status(201).send({ data: newModel });
  } catch (error) {
    next(error);
  }
};

module.exports.getModels = async (req, res, next) => {
  const { ModelClass, relationsArray } = req;

  const models = await ModelClass.findAll({
    include: relationsArray,
  });

  res.send({ data: models });
};

module.exports.getModel = async (req, res, next) => {
  const {
    ModelClass,
    modelName,
    params: { id },
  } = req;

  const model = await ModelClass.findByPk(id);

  if (model) {
    res.send({ data: model });
  } else {
    const error = createHttpError(404, `No such ${modelName} found`);
    next(error);
  }
};

module.exports.updateModel = async (req, res, next) => {
  try {
    const {
      ModelClass,
      modelName,
      params: { id },
      body,
    } = req;

    const model = await ModelClass.findByPk(id);

    if (!model) {
      throw createHttpError(404, `No such ${modelName} found`);
    }

    const updatedModel = await model.update(body, { returning: true });

    res.send({ data: updatedModel });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteModel = async (req, res, next) => {
  const {
    ModelClass,
    modelName,
    params: { id },
  } = req;

  const model = await ModelClass.findByPk(id);

  if (!model) {
    next(createHttpError(404, `No such ${modelName} found`));
  }

  await model.destroy();

  res.send({ data: model });
};
