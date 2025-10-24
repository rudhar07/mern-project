const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

// Sample data
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1234567890',
    role: 'customer',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    }
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '+1234567891',
    role: 'restaurant_owner',
    address: {
      street: '456 Oak Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    }
  }
];

const sampleRestaurants = [
  {
    name: 'Mario\'s Italian Kitchen',
    description: 'Authentic Italian cuisine with fresh ingredients and traditional recipes passed down through generations.',
    cuisine: ['Italian'],
    address: {
      street: '789 Broadway',
      city: 'New York',
      state: 'NY',
      zipCode: '10003',
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    contact: {
      phone: '+1234567892',
      email: 'info@mariositalian.com'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop', alt: 'Mario\'s Italian Kitchen exterior' }
    ],
    rating: { average: 4.5, count: 127 },
    deliveryInfo: {
      estimatedTime: 35,
      deliveryFee: 3.99,
      minimumOrder: 15.00,
      deliveryRadius: 5
    },
    operatingHours: {
      monday: { open: '11:00', close: '22:00', isOpen: true },
      tuesday: { open: '11:00', close: '22:00', isOpen: true },
      wednesday: { open: '11:00', close: '22:00', isOpen: true },
      thursday: { open: '11:00', close: '22:00', isOpen: true },
      friday: { open: '11:00', close: '23:00', isOpen: true },
      saturday: { open: '11:00', close: '23:00', isOpen: true },
      sunday: { open: '12:00', close: '21:00', isOpen: true }
    },
    features: ['Free Delivery', 'Vegetarian Options', 'Fast Delivery']
  },
  {
    name: 'Golden Dragon Chinese',
    description: 'Traditional Chinese dishes with modern presentation. Fresh ingredients and authentic flavors.',
    cuisine: ['Chinese'],
    address: {
      street: '321 Chinatown St',
      city: 'New York',
      state: 'NY',
      zipCode: '10013',
      coordinates: { lat: 40.7158, lng: -73.9973 }
    },
    contact: {
      phone: '+1234567893',
      email: 'orders@goldendragon.com'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop', alt: 'Golden Dragon Chinese restaurant' }
    ],
    rating: { average: 4.3, count: 89 },
    deliveryInfo: {
      estimatedTime: 25,
      deliveryFee: 2.99,
      minimumOrder: 12.00,
      deliveryRadius: 4
    },
    operatingHours: {
      monday: { open: '10:30', close: '23:30', isOpen: true },
      tuesday: { open: '10:30', close: '23:30', isOpen: true },
      wednesday: { open: '10:30', close: '23:30', isOpen: true },
      thursday: { open: '10:30', close: '23:30', isOpen: true },
      friday: { open: '10:30', close: '00:00', isOpen: true },
      saturday: { open: '10:30', close: '00:00', isOpen: true },
      sunday: { open: '10:30', close: '23:00', isOpen: true }
    },
    features: ['Fast Delivery', 'Vegetarian Options', 'Halal']
  }
];

const sampleMenuItems = [
  // Mario's Italian Kitchen items
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
    category: 'Pizza',
    price: 16.99,
    images: [{ url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop', alt: 'Margherita Pizza' }],
    ingredients: ['Mozzarella', 'Tomato sauce', 'Fresh basil', 'Olive oil'],
    allergens: ['Dairy', 'Gluten'],
    dietaryInfo: ['Vegetarian'],
    spiceLevel: 'Mild',
    preparationTime: 15,
    rating: { average: 4.6, count: 45 },
    isPopular: true
  },
  {
    name: 'Spaghetti Carbonara',
    description: 'Creamy pasta with pancetta, eggs, and parmesan cheese',
    category: 'Pasta',
    price: 18.99,
    images: [{ url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop', alt: 'Spaghetti Carbonara' }],
    ingredients: ['Spaghetti', 'Pancetta', 'Eggs', 'Parmesan', 'Black pepper'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    dietaryInfo: [],
    spiceLevel: 'Mild',
    preparationTime: 20,
    rating: { average: 4.4, count: 32 },
    isPopular: true
  },
  {
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
    category: 'Desserts',
    price: 8.99,
    images: [{ url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop', alt: 'Tiramisu' }],
    ingredients: ['Ladyfingers', 'Mascarpone', 'Coffee', 'Cocoa powder', 'Eggs'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    dietaryInfo: [],
    spiceLevel: 'Mild',
    preparationTime: 10,
    rating: { average: 4.8, count: 28 },
    isPopular: true
  },
  // Golden Dragon Chinese items
  {
    name: 'Kung Pao Chicken',
    description: 'Spicy stir-fried chicken with peanuts, vegetables, and chili peppers',
    category: 'Main Course',
    price: 14.99,
    images: [{ url: 'https://images.unsplash.com/photo-1563379091339-03246963d96a?w=400&h=300&fit=crop', alt: 'Kung Pao Chicken' }],
    ingredients: ['Chicken', 'Peanuts', 'Bell peppers', 'Chili peppers', 'Soy sauce'],
    allergens: ['Nuts', 'Soy'],
    dietaryInfo: [],
    spiceLevel: 'Hot',
    preparationTime: 18,
    rating: { average: 4.5, count: 67 },
    isPopular: true
  },
  {
    name: 'Vegetable Lo Mein',
    description: 'Stir-fried noodles with mixed vegetables in savory sauce',
    category: 'Noodles',
    price: 12.99,
    images: [{ url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', alt: 'Vegetable Lo Mein' }],
    ingredients: ['Lo mein noodles', 'Broccoli', 'Carrots', 'Bell peppers', 'Soy sauce'],
    allergens: ['Gluten', 'Soy'],
    dietaryInfo: ['Vegetarian'],
    spiceLevel: 'Mild',
    preparationTime: 12,
    rating: { average: 4.2, count: 41 },
    isPopular: false
  },
  {
    name: 'Spring Rolls',
    description: 'Crispy fried rolls filled with vegetables and served with sweet and sour sauce',
    category: 'Appetizers',
    price: 6.99,
    images: [{ url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop', alt: 'Spring Rolls' }],
    ingredients: ['Rice paper', 'Cabbage', 'Carrots', 'Bean sprouts', 'Sweet and sour sauce'],
    allergens: ['Gluten'],
    dietaryInfo: ['Vegetarian'],
    spiceLevel: 'Mild',
    preparationTime: 8,
    rating: { average: 4.3, count: 23 },
    isPopular: false
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Seed the database
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});

    console.log('🗑️ Cleared existing data');

    // Create users
    const users = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      users.push(user);
      console.log(`👤 Created user: ${user.name}`);
    }

    // Create restaurants
    const restaurants = [];
    for (let i = 0; i < sampleRestaurants.length; i++) {
      const restaurantData = {
        ...sampleRestaurants[i],
        owner: users[1]._id // Assign to restaurant owner
      };
      const restaurant = new Restaurant(restaurantData);
      await restaurant.save();
      restaurants.push(restaurant);
      console.log(`🏪 Created restaurant: ${restaurant.name}`);
    }

    // Create menu items
    const menuItems = [];
    for (let i = 0; i < sampleMenuItems.length; i++) {
      const menuItemData = {
        ...sampleMenuItems[i],
        restaurant: restaurants[Math.floor(i / 3)]._id // Assign to appropriate restaurant
      };
      const menuItem = new MenuItem(menuItemData);
      await menuItem.save();
      menuItems.push(menuItem);
      console.log(`🍽️ Created menu item: ${menuItem.name}`);
    }

    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Created ${users.length} users, ${restaurants.length} restaurants, and ${menuItems.length} menu items`);
    
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the seeder
const runSeeder = async () => {
  await connectDB();
  await seedDatabase();
};

// Check if this file is run directly
if (require.main === module) {
  runSeeder();
}

module.exports = { seedDatabase, connectDB };
