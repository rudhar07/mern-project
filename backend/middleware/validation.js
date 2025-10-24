const Joi = require('joi');

const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^\+?[\d\s-()]+$/).required(),
    role: Joi.string().valid('customer', 'restaurant_owner', 'delivery_driver').default('customer')
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      message: 'Validation error', 
      details: error.details[0].message 
    });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      message: 'Validation error', 
      details: error.details[0].message 
    });
  }
  next();
};

const validateRestaurant = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500).required(),
    cuisine: Joi.array().items(Joi.string().valid(
      'Italian', 'Chinese', 'Indian', 'Mexican', 'American', 
      'Thai', 'Japanese', 'Mediterranean', 'Fast Food', 
      'Desserts', 'Vegetarian', 'Vegan'
    )).min(1).required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      coordinates: Joi.object({
        lat: Joi.number().required(),
        lng: Joi.number().required()
      }).required()
    }).required(),
    contact: Joi.object({
      phone: Joi.string().required(),
      email: Joi.string().email().required()
    }).required(),
    deliveryInfo: Joi.object({
      estimatedTime: Joi.number().min(15).max(120).required(),
      deliveryFee: Joi.number().min(0).required(),
      minimumOrder: Joi.number().min(0).required(),
      deliveryRadius: Joi.number().min(1).max(50).required()
    }).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      message: 'Validation error', 
      details: error.details[0].message 
    });
  }
  next();
};

const validateMenuItem = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(300).required(),
    category: Joi.string().valid(
      'Appetizers', 'Main Course', 'Desserts', 'Beverages', 
      'Salads', 'Soups', 'Pizza', 'Pasta', 'Rice', 
      'Noodles', 'Sandwiches', 'Burgers'
    ).required(),
    price: Joi.number().min(0).required(),
    ingredients: Joi.array().items(Joi.string()),
    allergens: Joi.array().items(Joi.string().valid(
      'Gluten', 'Dairy', 'Nuts', 'Soy', 'Eggs', 
      'Fish', 'Shellfish', 'Sesame'
    )),
    dietaryInfo: Joi.array().items(Joi.string().valid(
      'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 
      'Kosher', 'Low-Carb', 'Keto', 'Paleo'
    )),
    spiceLevel: Joi.string().valid('Mild', 'Medium', 'Hot', 'Extra Hot').default('Mild'),
    preparationTime: Joi.number().min(5).max(60).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      message: 'Validation error', 
      details: error.details[0].message 
    });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateRestaurant,
  validateMenuItem
};
