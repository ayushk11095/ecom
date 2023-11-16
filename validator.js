import Joi from "joi";

export async function orderCreateValidator(req, res, next) {
  const schema = Joi.object().keys({
    order_id: Joi.number().required(),
    item_name: Joi.string().required(),
    cost: Joi.number().required(),
    order_date: Joi.string()
      .regex(/^\d{4}\/\d{2}\/\d{2}$/)
      .required(),
    delivery_date: Joi.string()
      .regex(/^\d{4}\/\d{2}\/\d{2}$/)
      .required(),
  });

  const { error } = await schema.validate(req.body);
  if (error) {
    return res.json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
}

export async function orderUpdateValidator(req, res, next) {
  const schema = Joi.object().keys({
    delivery_date: Joi.string()
      .regex(/^\d{4}\/\d{2}\/\d{2}$/)
      .required(),
  });

  const { error } = await schema.validate(req.body);
  if (error) {
    return res.json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
}

export async function orderListValidator(req, res, next) {
  const schema = Joi.object().keys({
    delivery_date: Joi.string().regex(/^\d{4}\/\d{2}\/\d{2}$/),
  });

  const { error } = await schema.validate(req.body);
  if (error) {
    return res.json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
}
