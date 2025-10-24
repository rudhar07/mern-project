import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  MinusIcon,
  TrashIcon,
  ShoppingCartIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  const handleQuantityChange = (menuItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(menuItemId);
    } else {
      updateQuantity(menuItemId, newQuantity);
    }
  };

  const deliveryFee = totalPrice > 0 ? 2.99 : 0;
  const tax = (totalPrice + deliveryFee) * 0.08; // 8% tax
  const finalTotal = totalPrice + deliveryFee + tax;

  if (items.length === 0) {
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
          padding: '2rem',
          maxWidth: '28rem'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>🛒</div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '0.5rem'
          }}>Your cart is empty</h2>
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            lineHeight: '1.5'
          }}>
            Looks like you haven't added any items to your cart yet. 
            Browse our restaurants and add some delicious food!
          </p>
          <Link
            to="/restaurants"
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem'
            }}
          >
            <ShoppingCartIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            Browse Restaurants
          </Link>
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
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <Link
              to="/restaurants"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '0.875rem'
              }}
            >
              <ArrowLeftIcon style={{ width: '1rem', height: '1rem' }} />
              Back to Restaurants
            </Link>
          </div>
          
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '0.25rem'
          }}>
            Shopping Cart
          </h1>
          <p style={{ color: '#6b7280' }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2rem 1rem',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem'
      }}>
        {/* Cart Items */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#111827'
            }}>Cart Items</h2>
            <button
              onClick={clearCart}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <TrashIcon style={{ width: '1rem', height: '1rem' }} />
              Clear Cart
            </button>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {items.map((item, index) => (
              <motion.div
                key={`${item.menuItem.id}-${index}`}
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
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  style={{
                    width: '5rem',
                    height: '5rem',
                    objectFit: 'cover',
                    borderRadius: '0.5rem'
                  }}
                />
                
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '0.25rem'
                  }}>{item.menuItem.name}</h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem'
                  }}>{item.menuItem.description}</p>
                  
                  {item.customizations.length > 0 && (
                    <div style={{ marginBottom: '0.5rem' }}>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        marginBottom: '0.25rem'
                      }}>Customizations:</p>
                      {item.customizations.map((custom, idx) => (
                        <span
                          key={idx}
                          style={{
                            display: 'inline-block',
                            padding: '0.125rem 0.5rem',
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            marginRight: '0.25rem',
                            marginBottom: '0.25rem'
                          }}
                        >
                          {custom.name}: {custom.option}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {item.specialInstructions && (
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      fontStyle: 'italic'
                    }}>
                      Note: {item.specialInstructions}
                    </p>
                  )}
                </div>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    ${(item.menuItem.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '0.5rem',
                    padding: '0.25rem'
                  }}>
                    <button
                      onClick={() => handleQuantityChange(item.menuItem.id, item.quantity - 1)}
                      style={{
                        width: '2rem',
                        height: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <MinusIcon style={{ width: '1rem', height: '1rem' }} />
                    </button>
                    <span style={{
                      minWidth: '2rem',
                      textAlign: 'center',
                      fontWeight: '500'
                    }}>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.menuItem.id, item.quantity + 1)}
                      style={{
                        width: '2rem',
                        height: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <PlusIcon style={{ width: '1rem', height: '1rem' }} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => {
                      removeItem(item.menuItem.id);
                      setTimeout(() => {
                        toast.success('Item removed from cart');
                      }, 100);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#fef2f2',
                      color: '#dc2626',
                      border: '1px solid #fecaca',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <TrashIcon style={{ width: '0.875rem', height: '0.875rem' }} />
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '1.5rem'
            }}>Order Summary</h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div style={{
                height: '1px',
                backgroundColor: '#e5e7eb',
                margin: '0.5rem 0'
              }} />
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827'
              }}>
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link
              to="/checkout"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                fontWeight: '600',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'block'
              }}
            >
              Proceed to Checkout
            </Link>
            
            <p style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              textAlign: 'center',
              marginTop: '1rem',
              lineHeight: '1.4'
            }}>
              By placing your order, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;