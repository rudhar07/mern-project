import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  StarIcon,
  ClockIcon,
  TruckIcon,
  MapPinIcon,
  HeartIcon,
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { addItemWithToast, getItemQuantity, updateQuantity } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample restaurant data
  const sampleRestaurant = {
    id: parseInt(id),
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.8,
    reviewCount: 1247,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    minimumOrder: 15,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop",
    isOpen: true,
    description: "Authentic Italian pizza made with fresh ingredients and traditional recipes. Family-owned since 1985.",
    address: "123 Main Street, New York, NY 10001",
    phone: "(555) 123-4567",
    hours: {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "11:00 AM - 11:00 PM",
      sunday: "12:00 PM - 9:00 PM"
    }
  };

  // Sample menu data
  const sampleMenuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic pizza with fresh mozzarella, tomato sauce, and basil",
      price: 16.99,
      category: "Pizza",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
      isPopular: true,
      isVegetarian: true,
      allergens: ["Gluten", "Dairy"],
      preparationTime: 15
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Traditional pizza topped with spicy pepperoni and mozzarella",
      price: 18.99,
      category: "Pizza",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop",
      isPopular: true,
      isVegetarian: false,
      allergens: ["Gluten", "Dairy", "Pork"],
      preparationTime: 15
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with parmesan cheese and caesar dressing",
      price: 12.99,
      category: "Salads",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
      isPopular: false,
      isVegetarian: true,
      allergens: ["Dairy", "Eggs"],
      preparationTime: 10
    },
    {
      id: 4,
      name: "Chicken Wings",
      description: "Crispy chicken wings with your choice of sauce",
      price: 14.99,
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1567620832904-9fe5cf23db13?w=300&h=200&fit=crop",
      isPopular: true,
      isVegetarian: false,
      allergens: ["Gluten"],
      preparationTime: 20
    },
    {
      id: 5,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee and mascarpone",
      price: 8.99,
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1571877227200-a5d1179037cf?w=300&h=200&fit=crop",
      isPopular: false,
      isVegetarian: true,
      allergens: ["Dairy", "Eggs", "Gluten"],
      preparationTime: 5
    },
    {
      id: 6,
      name: "Pasta Carbonara",
      description: "Creamy pasta with bacon, eggs, and parmesan cheese",
      price: 16.99,
      category: "Pasta",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
      isPopular: true,
      isVegetarian: false,
      allergens: ["Gluten", "Dairy", "Eggs", "Pork"],
      preparationTime: 18
    }
  ];

  const categories = ['All', 'Pizza', 'Pasta', 'Salads', 'Appetizers', 'Desserts'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRestaurant(sampleRestaurant);
        setMenuItems(sampleMenuItems);
        setSelectedCategory('All');
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (menuItem) => {
    if (isAdding) return;
    
    setIsAdding(true);
    
    // Check if item already exists
    const currentQuantity = getItemQuantity(menuItem.id);
    const isNewItem = currentQuantity === 0;
    
    addItemWithToast({
      menuItem,
      quantity: 1,
      customizations: [],
      // persist restaurant id so checkout can include required restaurant field
      restaurantId: restaurant?.id || restaurant?._id
    });
    
    // Show toast after state update
    setTimeout(() => {
      if (isNewItem) {
        toast.success('Item added to cart');
      } else {
        toast.success('Item quantity updated in cart');
      }
      setIsAdding(false);
    }, 100);
  };

  const filteredMenuItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const groupedMenuItems = filteredMenuItems.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #dc2626',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>Loading restaurant...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
            Restaurant not found
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            The restaurant you're looking for doesn't exist.
          </p>
          <Link to="/restaurants" className="btn btn-primary">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Restaurant Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '2rem 1rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {/* Restaurant Image */}
            <div style={{ position: 'relative' }}>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                style={{
                  width: '100%',
                  height: '16rem',
                  objectFit: 'cover',
                  borderRadius: '0.75rem'
                }}
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              >
                {isFavorite ? (
                  <HeartSolidIcon style={{ width: '1.25rem', height: '1.25rem', color: '#dc2626' }} />
                ) : (
                  <HeartIcon style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                )}
              </button>
            </div>

            {/* Restaurant Info */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <h1 style={{
                  fontSize: '2.25rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  margin: 0
                }}>{restaurant.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <StarSolidIcon style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    color: '#fbbf24',
                    marginRight: '0.25rem'
                  }} />
                  <span style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#111827'
                  }}>{restaurant.rating}</span>
                  <span style={{
                    color: '#6b7280',
                    marginLeft: '0.5rem'
                  }}>({restaurant.reviewCount})</span>
                </div>
              </div>

              <p style={{
                color: '#6b7280',
                fontSize: '1.125rem',
                marginBottom: '1rem'
              }}>{restaurant.cuisine} • {restaurant.description}</p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <ClockIcon style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Delivery</div>
                    <div style={{ fontWeight: '500', color: '#111827' }}>{restaurant.deliveryTime}</div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <TruckIcon style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Delivery Fee</div>
                    <div style={{ fontWeight: '500', color: '#111827' }}>${restaurant.deliveryFee}</div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <MapPinIcon style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Min. Order</div>
                    <div style={{ fontWeight: '500', color: '#111827' }}>${restaurant.minimumOrder}</div>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem'
              }}>
                <Link
                  to="/cart"
                  className="btn btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem'
                  }}
                >
                  <ShoppingCartIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                  View Cart
                </Link>
                <button
                  className="btn btn-outline"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem'
                  }}
                >
                  <MapPinIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                  Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Category Filter */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: selectedCategory === category ? '#dc2626' : 'white',
                color: selectedCategory === category ? 'white' : '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {Object.entries(groupedMenuItems).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '2px solid #dc2626'
            }}>{category}</h2>
            
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card"
                  style={{
                    display: 'flex',
                    padding: '1.5rem',
                    gap: '1rem',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '6rem',
                      height: '6rem',
                      objectFit: 'cover',
                      borderRadius: '0.5rem'
                    }}
                  />
                  
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#111827',
                        margin: 0
                      }}>{item.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {item.isPopular && (
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}>Popular</span>
                        )}
                        {item.isVegetarian && (
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#dcfce7',
                            color: '#166534',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}>Veg</span>
                        )}
                      </div>
                    </div>
                    
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      marginBottom: '0.5rem',
                      lineHeight: '1.4'
                    }}>{item.description}</p>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '0.5rem'
                    }}>
                      <span>Prep: {item.preparationTime} min</span>
                      <span>•</span>
                      <span>Allergens: {item.allergens.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#111827'
                    }}>${item.price}</div>
                    
                    {getItemQuantity(item.id) > 0 ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '0.5rem',
                        padding: '0.25rem'
                      }}>
                        <button
                          onClick={() => {
                            const currentQuantity = getItemQuantity(item.id);
                            const newQuantity = currentQuantity - 1;
                            
                            updateQuantity(item.id, newQuantity);
                            
                            // Show toast after state update if item was removed
                            if (newQuantity <= 0) {
                              setTimeout(() => {
                                toast.success('Item removed from cart');
                              }, 100);
                            }
                          }}
                          style={{
                            width: '2rem',
                            height: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.25rem',
                            cursor: 'pointer'
                          }}
                        >
                          <MinusIcon style={{ width: '1rem', height: '1rem' }} />
                        </button>
                        <span style={{
                          minWidth: '2rem',
                          textAlign: 'center',
                          fontWeight: '500'
                        }}>{getItemQuantity(item.id)}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const currentQuantity = getItemQuantity(item.id);
                            updateQuantity(item.id, currentQuantity + 1);
                          }}
                          style={{
                            width: '2rem',
                            height: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.25rem',
                            cursor: 'pointer'
                          }}
                        >
                          <PlusIcon style={{ width: '1rem', height: '1rem' }} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        disabled={isAdding}
                        className="btn btn-primary"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          fontSize: '0.875rem',
                          opacity: isAdding ? 0.6 : 1,
                          cursor: isAdding ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <PlusIcon style={{ width: '1rem', height: '1rem' }} />
                        {isAdding ? 'Adding...' : 'Add'}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RestaurantDetailPage;