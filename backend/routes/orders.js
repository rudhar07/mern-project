const express = require('express');
const Order = require('../models/Order');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { customer: req.user._id };
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(query)
      .populate('restaurant', 'name cuisine rating')
      .populate('items.menuItem', 'name price images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('restaurant', 'name cuisine rating address contact')
      .populate('items.menuItem', 'name price images')
      .populate('delivery.driver', 'name phone');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is restaurant owner/admin
    if (order.customer._id.toString() !== req.user._id.toString() && 
        order.restaurant.owner.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      customer: req.user._id
    };

    const order = new Order(orderData);
    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('restaurant', 'name cuisine rating')
      .populate('items.menuItem', 'name price images');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: populatedOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error during order creation' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private (Restaurant Owner/Admin)
router.put('/:id/status', auth, authorize('restaurant_owner', 'admin'), async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'owner');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the restaurant or is admin
    if (order.restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error during order status update' });
  }
});

// @route   PUT /api/orders/:id/rating
// @desc    Rate order
// @access  Private
router.put('/:id/rating', auth, async (req, res) => {
  try {
    const { food, delivery, overall, review } = req.body;
    
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order
    if (order.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to rate this order' });
    }

    // Check if order is delivered
    if (order.status !== 'delivered') {
      return res.status(400).json({ message: 'Can only rate delivered orders' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        rating: { food, delivery, overall, review }
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Order rated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Rate order error:', error);
    res.status(500).json({ message: 'Server error during order rating' });
  }
});

module.exports = router;
