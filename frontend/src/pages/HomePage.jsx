import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  TruckIcon,
  ShieldCheckIcon,
  HeartIcon,
  FireIcon,
  SparklesIcon,
  GiftIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFavorite = (restaurantId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(restaurantId)) {
        newFavorites.delete(restaurantId);
      } else {
        newFavorites.add(restaurantId);
      }
      return newFavorites;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to restaurants page with search query
      window.location.href = `/restaurants?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // Enhanced sample data
  const featuredRestaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.8,
      reviewCount: 1247,
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      isOpen: true,
      isPopular: true,
      discount: "20% off"
    },
    {
      id: 2,
      name: "Burger Barn",
      cuisine: "American",
      rating: 4.6,
      reviewCount: 892,
      deliveryTime: "20-30 min",
      deliveryFee: 1.99,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      isOpen: true,
      isPopular: true,
      discount: "Free delivery"
    },
    {
      id: 3,
      name: "Sushi Zen",
      cuisine: "Japanese",
      rating: 4.9,
      reviewCount: 1563,
      deliveryTime: "30-40 min",
      deliveryFee: 3.99,
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      isOpen: false,
      isPopular: false,
      discount: null
    },
    {
      id: 4,
      name: "Taco Fiesta",
      cuisine: "Mexican",
      rating: 4.7,
      reviewCount: 634,
      deliveryTime: "25-35 min",
      deliveryFee: 2.49,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      isOpen: true,
      isPopular: true,
      discount: "15% off"
    }
  ];

  const features = [
    {
      icon: <TruckIcon style={{ width: '2rem', height: '2rem' }} />,
      title: "Lightning Fast Delivery",
      description: "Get your food delivered in 30 minutes or less with our optimized delivery network",
      color: "#dc2626"
    },
    {
      icon: <ShieldCheckIcon style={{ width: '2rem', height: '2rem' }} />,
      title: "Safe & Secure",
      description: "Your data and payments are protected with bank-level security encryption",
      color: "#059669"
    },
    {
      icon: <HeartIcon style={{ width: '2rem', height: '2rem' }} />,
      title: "Fresh & Quality",
      description: "Only the freshest ingredients from trusted restaurants and local suppliers",
      color: "#dc2626"
    },
    {
      icon: <GiftIcon style={{ width: '2rem', height: '2rem' }} />,
      title: "Amazing Deals",
      description: "Enjoy exclusive discounts, free delivery, and special offers every day",
      color: "#7c3aed"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "500+", label: "Restaurants" },
    { number: "1M+", label: "Orders Delivered" },
    { number: "4.8", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #eff6ff 100%)',
        padding: '4rem 0 6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f3f4f6" fill-opacity="0.3"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5
        }} />
        
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                color: '#dc2626',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '1rem'
              }}
            >
              <SparklesIcon style={{ width: '1rem', height: '1rem' }} />
              New: Free delivery on orders over $25
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '1.5rem',
                lineHeight: '1.1'
              }}
            >
              <span style={{
                background: 'linear-gradient(90deg, #dc2626 0%, #2563eb 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}>Delicious Food</span>
              <br />
              Delivered to Your Door
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                fontSize: '1.25rem',
                color: '#6b7280',
                marginBottom: '2rem',
                maxWidth: '42rem',
                margin: '0 auto 2rem'
              }}
            >
              Order from your favorite restaurants and get fresh, hot food delivered right to your doorstep in minutes.
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                maxWidth: '42rem',
                margin: '0 auto 2rem'
              }}
            >
              <form onSubmit={handleSearch} style={{ position: 'relative' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <MagnifyingGlassIcon style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '1.25rem',
                      height: '1.25rem',
                      color: '#9ca3af'
                    }} />
                    <input
                      type="text"
                      placeholder="Search restaurants, cuisines, dishes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        paddingLeft: '3rem',
                        paddingRight: '1rem',
                        paddingTop: '1rem',
                        paddingBottom: '1rem',
                        fontSize: '1.125rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        outline: 'none',
                        transition: 'all 0.2s',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#dc2626';
                        e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      }}
                    />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <MapPinIcon style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '1.25rem',
                      height: '1.25rem',
                      color: '#9ca3af'
                    }} />
                    <input
                      type="text"
                      placeholder="Enter your location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      style={{
                        width: '100%',
                        paddingLeft: '3rem',
                        paddingRight: '1rem',
                        paddingTop: '1rem',
                        paddingBottom: '1rem',
                        fontSize: '1.125rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        outline: 'none',
                        transition: 'all 0.2s',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#dc2626';
                        e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      padding: '1rem 2rem',
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#b91c1c';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#dc2626';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <MagnifyingGlassIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                    Search Restaurants
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '2rem',
                marginTop: '3rem',
                padding: '2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '1rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {stats.map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#dc2626',
                    marginBottom: '0.25rem'
                  }}>{stat.number}</div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '6rem 0',
        backgroundColor: 'white',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '1rem'
              }}
            >
              Why Choose <span style={{ color: '#dc2626' }}>FoodieHub</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: '1.25rem',
                color: '#6b7280',
                maxWidth: '42rem',
                margin: '0 auto'
              }}
            >
              We make food delivery simple, fast, and reliable with cutting-edge technology and exceptional service
            </motion.p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  borderRadius: '1rem',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '5rem',
                  height: '5rem',
                  backgroundColor: `${feature.color}15`,
                  color: feature.color,
                  borderRadius: '50%',
                  marginBottom: '1.5rem',
                  transition: 'all 0.3s'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>{feature.title}</h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section style={{
        padding: '6rem 0',
        backgroundColor: '#f9fafb',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '1rem'
              }}
            >
              Featured <span style={{ color: '#dc2626' }}>Restaurants</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: '1.25rem',
                color: '#6b7280',
                maxWidth: '42rem',
                margin: '0 auto'
              }}
            >
              Discover amazing food from top-rated restaurants in your area
            </motion.p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {featuredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    style={{
                      width: '100%',
                      height: '14rem',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    {restaurant.isPopular && (
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <FireIcon style={{ width: '0.75rem', height: '0.75rem' }} />
                        Popular
                      </span>
                    )}
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: restaurant.isOpen ? '#dcfce7' : '#fef2f2',
                      color: restaurant.isOpen ? '#166534' : '#991b1b'
                    }}>
                      {restaurant.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>

                  {/* Discount Badge */}
                  {restaurant.discount && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: '#dc2626',
                      color: 'white'
                    }}>
                      {restaurant.discount}
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(restaurant.id);
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
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
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    {favorites.has(restaurant.id) ? (
                      <HeartSolidIcon style={{ width: '1.25rem', height: '1.25rem', color: '#dc2626' }} />
                    ) : (
                      <HeartIcon style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                    )}
                  </button>
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#111827',
                      margin: 0
                    }}>{restaurant.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <StarSolidIcon style={{
                        width: '1rem',
                        height: '1rem',
                        color: '#fbbf24',
                        marginRight: '0.25rem'
                      }} />
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827'
                      }}>{restaurant.rating}</span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        marginLeft: '0.25rem'
                      }}>({restaurant.reviewCount})</span>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                  }}>{restaurant.cuisine}</p>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>
                      <ClockIcon style={{
                        width: '1rem',
                        height: '1rem',
                        marginRight: '0.25rem'
                      }} />
                      {restaurant.deliveryTime}
                    </div>
                    <div style={{
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>
                      ${restaurant.deliveryFee} delivery
                    </div>
                  </div>
                  
                  <Link
                    to={`/restaurants/${restaurant.id}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      textAlign: 'center',
                      textDecoration: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#b91c1c';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#dc2626';
                    }}
                  >
                    View Menu
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div style={{
            textAlign: 'center',
            marginTop: '4rem'
          }}>
            <Link
              to="/restaurants"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: 'white',
                color: '#dc2626',
                border: '2px solid #dc2626',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontSize: '1.125rem',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#dc2626';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#dc2626';
              }}
            >
              View All Restaurants
              <MagnifyingGlassIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1rem'
            }}
          >
            Ready to Order?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '1.25rem',
              color: '#fecaca',
              marginBottom: '3rem',
              maxWidth: '42rem',
              margin: '0 auto 3rem'
            }}
          >
            Join thousands of satisfied customers and experience the best food delivery service in town
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Link
              to="/register"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                color: '#dc2626',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
            >
              <UserGroupIcon style={{ width: '1.25rem', height: '1.25rem' }} />
              Get Started Free
            </Link>
            <Link
              to="/restaurants"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white',
                color: 'white',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#dc2626';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <MagnifyingGlassIcon style={{ width: '1.25rem', height: '1.25rem' }} />
              Browse Restaurants
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
