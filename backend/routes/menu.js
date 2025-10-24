const express = require('express');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const { auth, authorize } = require('../middleware/auth');
const { validateMenuItem } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/menu
// @desc    Get menu items with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      restaurant, 
      category, 
      dietaryInfo, 
      maxPrice, 
      minPrice,
      search,
      page = 1,
      limit = 20
    } = req.query;

    const query = { availability: true };

    if (restaurant) {
      query.restaurant = restaurant;
    }

    if (category) {
      query.category = { $in: category.split(',') };
    }

    if (dietaryInfo) {
      query.dietaryInfo = { $in: dietaryInfo.split(',') };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const menuItems = await MenuItem.find(query)
      .populate('restaurant', 'name cuisine rating')
      .sort({ category: 1, name: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await MenuItem.countDocuments(query);

    res.json({
      success: true,
      count: menuItems.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      menuItems
    });
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/menu/:id
// @desc    Get single menu item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id)
      .populate('restaurant', 'name cuisine rating address contact');

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({
      success: true,
      menuItem
    });
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/menu
// @desc    Create new menu item
// @access  Private (Restaurant Owner/Admin)
router.post('/', auth, authorize('restaurant_owner', 'admin'), validateMenuItem, async (req, res) => {
  try {
    const { restaurant } = req.body;

    // Verify restaurant ownership
    const restaurantDoc = await Restaurant.findById(restaurant);
    if (!restaurantDoc) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurantDoc.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to add menu items to this restaurant' });
    }

    const menuItem = new MenuItem(req.body);
    await menuItem.save();

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      menuItem
    });
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({ message: 'Server error during menu item creation' });
  }
});

// @route   PUT /api/menu/:id
// @desc    Update menu item
// @access  Private (Restaurant Owner/Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id)
      .populate('restaurant', 'owner');

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Check if user owns the restaurant or is admin
    if (menuItem.restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this menu item' });
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Menu item updated successfully',
      menuItem: updatedMenuItem
    });
  } catch (error) {
    console.error('Update menu item error:', error);
    res.status(500).json({ message: 'Server error during menu item update' });
  }
});

// @route   DELETE /api/menu/:id
// @desc    Delete menu item
// @access  Private (Restaurant Owner/Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id)
      .populate('restaurant', 'owner');

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Check if user owns the restaurant or is admin
    if (menuItem.restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this menu item' });
    }

    await MenuItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ message: 'Server error during menu item deletion' });
  }
});

// @route   GET /api/menu/restaurant/:restaurantId
// @desc    Get all menu items for a restaurant
// @access  Public
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const { category } = req.query;
    
    const query = { 
      restaurant: req.params.restaurantId, 
      availability: true 
    };

    if (category) {
      query.category = category;
    }

    const menuItems = await MenuItem.find(query)
      .sort({ category: 1, name: 1 });

    // Group by category
    const groupedMenu = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    res.json({
      success: true,
      count: menuItems.length,
      menuItems: groupedMenu
    });
  } catch (error) {
    console.error('Get restaurant menu error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
