import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, preparing, out_for_delivery, delivered, cancelled

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      confirmed: '#3b82f6',
      preparing: '#8b5cf6',
      out_for_delivery: '#06b6d4',
      delivered: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      preparing: 'Preparing',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #f3f4f6', 
          borderTop: '4px solid #dc2626', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }}></div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          background: 'linear-gradient(90deg, #dc2626 0%, #2563eb 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent'
        }}>
          My Orders
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          Track your food delivery orders and view order history
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {['all', 'pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: filter === status ? '#dc2626' : '#f3f4f6',
              color: filter === status ? 'white' : '#374151',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              textTransform: 'capitalize'
            }}
            onMouseOver={(e) => {
              if (filter !== status) {
                e.target.style.background = '#e5e7eb';
              }
            }}
            onMouseOut={(e) => {
              if (filter !== status) {
                e.target.style.background = '#f3f4f6';
              }
            }}
          >
            {status === 'all' ? 'All Orders' : getStatusText(status)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          background: 'white',
          borderRadius: '1rem',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem',
            opacity: 0.5
          }}>
            📦
          </div>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            color: '#374151'
          }}>
            No orders found
          </h3>
          <p style={{ color: '#6b7280' }}>
            {filter === 'all' 
              ? "You haven't placed any orders yet." 
              : `No orders with status "${getStatusText(filter)}"`}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              style={{
                background: 'white',
                borderRadius: '1rem',
                border: '1px solid #e5e7eb',
                padding: '1.5rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s ease-in-out'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
              }}
            >
              {/* Order Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '0.25rem',
                    color: '#111827'
                  }}>
                    Order #{order.orderNumber}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem' 
                }}>
                  <div
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      background: `${getStatusColor(order.status)}20`,
                      color: getStatusColor(order.status),
                      fontWeight: '500',
                      fontSize: '0.875rem'
                    }}
                  >
                    {getStatusText(order.status)}
                  </div>
                </div>
              </div>

              {/* Restaurant Info */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                marginBottom: '1rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '0.5rem'
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '0.5rem',
                  background: '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  🍽️
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600',
                    marginBottom: '0.25rem',
                    color: '#111827'
                  }}>
                    {order.restaurant?.name || 'Restaurant'}
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {order.restaurant?.address || 'Address not available'}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  marginBottom: '0.75rem',
                  color: '#374151'
                }}>
                  Order Items ({order.items?.length || 0})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem'
                      }}
                    >
                      <div>
                        <p style={{ 
                          fontWeight: '500', 
                          color: '#111827',
                          marginBottom: '0.25rem'
                        }}>
                          {item.name}
                        </p>
                        <p style={{ 
                          fontSize: '0.875rem', 
                          color: '#6b7280' 
                        }}>
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p style={{ 
                        fontWeight: '600', 
                        color: '#111827' 
                      }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <div>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    marginBottom: '0.25rem'
                  }}>
                    Subtotal: ${order.pricing?.subtotal?.toFixed(2) || '0.00'}
                  </p>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    marginBottom: '0.25rem'
                  }}>
                    Delivery Fee: ${order.pricing?.deliveryFee?.toFixed(2) || '0.00'}
                  </p>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280'
                  }}>
                    Tax: ${order.pricing?.tax?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '700',
                    color: '#dc2626'
                  }}>
                    Total: ${order.pricing?.total?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>

              {/* Delivery Info */}
              {order.deliveryAddress && (
                <div style={{ 
                  marginTop: '1rem',
                  padding: '1rem',
                  background: '#f0f9ff',
                  borderRadius: '0.5rem',
                  border: '1px solid #bae6fd'
                }}>
                  <h4 style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: '#0369a1'
                  }}>
                    Delivery Address
                  </h4>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#0369a1',
                    lineHeight: '1.5'
                  }}>
                    {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                  </p>
                  {order.deliveryAddress.instructions && (
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#0369a1',
                      lineHeight: '1.5',
                      marginTop: '0.5rem',
                      fontStyle: 'italic'
                    }}>
                      Instructions: {order.deliveryAddress.instructions}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;