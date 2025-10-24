const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    maxlength: [100, 'Menu item name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [300, 'Description cannot exceed 300 characters']
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Salads', 'Soups', 'Pizza', 'Pasta', 'Rice', 'Noodles', 'Sandwiches', 'Burgers']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  images: [{
    url: String,
    alt: String
  }],
  ingredients: [String],
  allergens: [{
    type: String,
    enum: ['Gluten', 'Dairy', 'Nuts', 'Soy', 'Eggs', 'Fish', 'Shellfish', 'Sesame']
  }],
  dietaryInfo: [{
    type: String,
    enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Low-Carb', 'Keto', 'Paleo']
  }],
  spiceLevel: {
    type: String,
    enum: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
    default: 'Mild'
  },
  availability: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    required: [true, 'Preparation time is required'],
    min: [5, 'Minimum preparation time is 5 minutes'],
    max: [60, 'Maximum preparation time is 60 minutes']
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  customizations: [{
    name: String,
    options: [{
      name: String,
      price: Number
    }]
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for restaurant and category
menuItemSchema.index({ restaurant: 1, category: 1 });

// Index for text search
menuItemSchema.index({ name: 'text', description: 'text', ingredients: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);
