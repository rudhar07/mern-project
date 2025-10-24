import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
  TruckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { restaurantAPI } from '../services/api';

const RestaurantsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const [deliveryTime, setDeliveryTime] = useState('all');

  // Sample data for demonstration
  const sampleRestaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.8,
      reviewCount: 1247,
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      minimumOrder: 15,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      isOpen: true,
      tags: ["Pizza", "Italian", "Fast Food"]
    },
    {
      id: 2,
      name: "Burger Barn",
      cuisine: "American",
      rating: 4.6,
      reviewCount: 892,
      deliveryTime: "20-30 min",
      deliveryFee: 1.99,
      minimumOrder: 12,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      isOpen: true,
      tags: ["Burgers", "American", "Fast Food"]
    },
    {
      id: 3,
      name: "Sushi Zen",
      cuisine: "Japanese",
      rating: 4.9,
      reviewCount: 634,
      deliveryTime: "30-40 min",
      deliveryFee: 3.99,
      minimumOrder: 20,
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      isOpen: false,
      tags: ["Sushi", "Japanese", "Healthy"]
    },
    {
      id: 4,
      name: "Taco Fiesta",
      cuisine: "Mexican",
      rating: 4.4,
      reviewCount: 456,
      deliveryTime: "15-25 min",
      deliveryFee: 1.49,
      minimumOrder: 10,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      isOpen: true,
      tags: ["Tacos", "Mexican", "Spicy"]
    },
    {
      id: 5,
      name: "Curry House",
      cuisine: "Indian",
      rating: 4.7,
      reviewCount: 789,
      deliveryTime: "35-45 min",
      deliveryFee: 2.49,
      minimumOrder: 18,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      isOpen: true,
      tags: ["Curry", "Indian", "Spicy"]
    },
    {
      id: 6,
      name: "Noodle Express",
      cuisine: "Chinese",
      rating: 4.3,
      reviewCount: 321,
      deliveryTime: "20-30 min",
      deliveryFee: 1.99,
      minimumOrder: 14,
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
      isOpen: true,
      tags: ["Noodles", "Chinese", "Asian"]
    }
  ];

  const cuisines = ['All', 'Italian', 'American', 'Japanese', 'Mexican', 'Indian', 'Chinese', 'Thai', 'Mediterranean'];

  useEffect(() => {
    // Simulate API call
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        // In real app, this would be: await restaurantAPI.getAll({ search: searchQuery, cuisine: selectedCuisine })
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        setRestaurants(sampleRestaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [searchQuery, selectedCuisine]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleCuisineFilter = (cuisine) => {
    setSelectedCuisine(cuisine === 'All' ? '' : cuisine);
    setShowFilters(false);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = !searchQuery || 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCuisine = !selectedCuisine || restaurant.cuisine === selectedCuisine;
    
    return matchesSearch && matchesCuisine;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deliveryTime':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case 'deliveryFee':
        return a.deliveryFee - b.deliveryFee;
      default:
        return 0;
    }
  });

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
          <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>Loading restaurants...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0'
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.25rem'
              }}>
                Restaurants
              </h1>
              <p style={{ color: '#6b7280' }}>
                {filteredRestaurants.length} restaurants available
              </p>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: showFilters ? '#dc2626' : 'white',
                color: showFilters ? 'white' : '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <FunnelIcon style={{ width: '1.25rem', height: '1.25rem' }} />
              <span>Filters</span>
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
            <div style={{ position: 'relative' }}>
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
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '3rem',
                  paddingRight: '1rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
          </form>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '1rem'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827'
                }}>Filter by</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  <XMarkIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {/* Cuisine Filter */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>Cuisine</label>
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  >
                    {cuisines.map(cuisine => (
                      <option key={cuisine} value={cuisine === 'All' ? '' : cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="rating">Rating</option>
                    <option value="deliveryTime">Delivery Time</option>
                    <option value="deliveryFee">Delivery Fee</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Cuisine Filters */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {cuisines.map(cuisine => (
              <button
                key={cuisine}
                onClick={() => handleCuisineFilter(cuisine)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: selectedCuisine === cuisine || (cuisine === 'All' && !selectedCuisine) ? '#dc2626' : 'white',
                  color: selectedCuisine === cuisine || (cuisine === 'All' && !selectedCuisine) ? 'white' : '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {sortedRestaurants.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>🍽️</div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.5rem'
            }}>No restaurants found</h3>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCuisine('');
                setSearchParams({});
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {sortedRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
                style={{
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                }}
              >
                <Link to={`/restaurants/${restaurant.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      style={{
                        width: '100%',
                        height: '12rem',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem'
                    }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: restaurant.isOpen ? '#dcfce7' : '#fef2f2',
                        color: restaurant.isOpen ? '#166534' : '#991b1b'
                      }}>
                        {restaurant.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
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
                      </div>
                    </div>

                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      marginBottom: '1rem'
                    }}>{restaurant.cuisine} • {restaurant.reviewCount} reviews</p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ClockIcon style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TruckIcon style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                        <span>${restaurant.deliveryFee} delivery</span>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      {restaurant.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      <span>Min. order: ${restaurant.minimumOrder}</span>
                      <span style={{
                        color: '#dc2626',
                        fontWeight: '500'
                      }}>View Menu →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
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

export default RestaurantsPage;