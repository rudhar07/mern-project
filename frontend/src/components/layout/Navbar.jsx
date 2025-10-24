import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '4rem'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none'
        }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            background: 'linear-gradient(90deg, #dc2626 0%, #2563eb 100%)',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem' }}>🍕</span>
          </div>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #dc2626 0%, #2563eb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>FoodieHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '2rem'
        }} className="desktop-nav">
          <Link
            to="/restaurants"
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              textDecoration: 'none',
              color: isActive('/restaurants') ? '#dc2626' : '#374151',
              backgroundColor: isActive('/restaurants') ? '#fef2f2' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            Restaurants
          </Link>

          {user && (
            <>
              <Link
                to="/orders"
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  color: isActive('/orders') ? '#dc2626' : '#374151',
                  backgroundColor: isActive('/orders') ? '#fef2f2' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                My Orders
              </Link>
              <Link
                to="/profile"
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  color: isActive('/profile') ? '#dc2626' : '#374151',
                  backgroundColor: isActive('/profile') ? '#fef2f2' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                Profile
              </Link>
            </>
          )}
        </div>

        {/* Search Bar */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          flex: 1,
          maxWidth: '28rem',
          margin: '0 2rem'
        }} className="desktop-search">
          <form onSubmit={handleSearch} style={{ width: '100%' }}>
            <div style={{ position: 'relative' }}>
              <MagnifyingGlassIcon style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1rem',
                height: '1rem',
                color: '#9ca3af'
              }} />
              <input
                type="text"
                placeholder="Search restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '1rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>
          </form>
        </div>

        {/* Right Side Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Location */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.875rem',
            color: '#6b7280'
          }} className="desktop-location">
            <MapPinIcon style={{ width: '1rem', height: '1rem' }} />
            <span>New York, NY</span>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            style={{
              position: 'relative',
              padding: '0.5rem',
              color: '#374151',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
          >
            <ShoppingCartIcon style={{ width: '1.5rem', height: '1.5rem' }} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: 'absolute',
                  top: '-0.25rem',
                  right: '-0.25rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  fontSize: '0.75rem',
                  borderRadius: '50%',
                  height: '1.25rem',
                  width: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '500'
                }}
              >
                {totalItems}
              </motion.span>
            )}
          </Link>

          {/* User Menu */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: '#fef2f2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UserIcon style={{ width: '1.25rem', height: '1.25rem', color: '#dc2626' }} />
                </div>
                <span style={{
                  display: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151'
                }} className="desktop-username">
                  {user.name}
                </span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link
                to="/login"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  borderRadius: '0.5rem'
                }}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'block',
              padding: '0.5rem',
              color: '#374151',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
            className="mobile-menu-btn"
          >
            {isMenuOpen ? (
              <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }} />
            ) : (
              <Bars3Icon style={{ width: '1.5rem', height: '1.5rem' }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            borderTop: '1px solid #e5e7eb',
            padding: '1rem 0'
          }}
          className="mobile-menu"
        >
          <div style={{ padding: '0 1rem' }}>
            {/* Mobile Search */}
            <form onSubmit={handleSearch} style={{ marginBottom: '0.5rem' }}>
              <div style={{ position: 'relative' }}>
                <MagnifyingGlassIcon style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1rem',
                  height: '1rem',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '2.5rem',
                    paddingRight: '1rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <Link
              to="/restaurants"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                marginBottom: '0.25rem',
                transition: 'background-color 0.2s'
              }}
            >
              Restaurants
            </Link>

            {user && (
              <>
                <Link
                  to="/orders"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    marginBottom: '0.25rem',
                    transition: 'background-color 0.2s'
                  }}
                >
                  My Orders
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    marginBottom: '0.25rem',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '0.5rem',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Sign Out
                </button>
              </>
            )}

            {!user && (
              <div style={{ padding: '0 1rem', marginTop: '0.5rem' }}>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    marginBottom: '0.5rem',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-primary"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    borderRadius: '0.5rem',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-search { display: flex !important; }
          .desktop-location { display: flex !important; }
          .desktop-username { display: block !important; }
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }

        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-search { display: none !important; }
          .desktop-location { display: none !important; }
          .desktop-username { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
