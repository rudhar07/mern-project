import React, { useState } from 'react';
import toast from 'react-hot-toast';

const PaymentForm = ({ total, onPaymentSuccess, onPaymentCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [processing, setProcessing] = useState(false);

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Max 16 digits + 3 spaces
    } else if (field === 'expiry') {
      // Format expiry date MM/YY
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      // Only allow 3-4 digits
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }
    
    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validateCardDetails = () => {
    const { number, expiry, cvv, name } = cardDetails;
    
    if (!name.trim()) {
      toast.error('Please enter cardholder name');
      return false;
    }
    
    if (number.replace(/\s/g, '').length !== 16) {
      toast.error('Please enter a valid 16-digit card number');
      return false;
    }
    
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      toast.error('Please enter expiry date in MM/YY format');
      return false;
    }
    
    if (cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return false;
    }
    
    return true;
  };

  const handlePayment = async () => {
    if (paymentMethod === 'card' && !validateCardDetails()) {
      return;
    }

    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment success/failure (90% success rate for demo)
      const success = Math.random() > 0.1;
      
      if (success) {
        toast.success('Payment successful! Your order is being processed.');
        onPaymentSuccess({
          method: paymentMethod,
          amount: total,
          transactionId: `TXN_${Date.now()}`,
          timestamp: new Date().toISOString()
        });
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      toast.error('Payment processing error. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '1rem',
      border: '1px solid #e5e7eb',
      padding: '2rem'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '1.5rem',
        color: '#111827'
      }}>
        Payment Details
      </h2>

      {/* Payment Method Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: '#374151'
        }}>
          Payment Method
        </h3>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {[
            { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
            { id: 'upi', label: 'UPI', icon: '📱' },
            { id: 'wallet', label: 'Digital Wallet', icon: '💰' },
            { id: 'cod', label: 'Cash on Delivery', icon: '💵' }
          ].map((method) => (
            <label
              key={method.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '2px solid',
                borderColor: paymentMethod === method.id ? '#dc2626' : '#d1d5db',
                background: paymentMethod === method.id ? '#fef2f2' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                flex: '1',
                minWidth: '120px'
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ display: 'none' }}
              />
              <span style={{ fontSize: '1.25rem' }}>{method.icon}</span>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500',
                color: paymentMethod === method.id ? '#dc2626' : '#374151'
              }}>
                {method.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Card Details Form */}
      {paymentMethod === 'card' && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#374151'
          }}>
            Card Information
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => handleCardInputChange('name', e.target.value)}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dc2626';
                  e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                Card Number
              </label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) => handleCardInputChange('number', e.target.value)}
                placeholder="1234 5678 9012 3456"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dc2626';
                  e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: '#374151'
                }}>
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                  placeholder="MM/YY"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#dc2626';
                    e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: '#374151'
                }}>
                  CVV
                </label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                  placeholder="123"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#dc2626';
                    e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPI Details */}
      {paymentMethod === 'upi' && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#374151'
          }}>
            UPI Details
          </h3>
          <div style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            textAlign: 'center'
          }}>
            <p style={{ color: '#0369a1', marginBottom: '0.5rem' }}>
              Scan QR code or enter UPI ID
            </p>
            <div style={{
              width: '120px',
              height: '120px',
              background: '#e5e7eb',
              borderRadius: '0.5rem',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              📱
            </div>
          </div>
        </div>
      )}

      {/* Digital Wallet */}
      {paymentMethod === 'wallet' && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#374151'
          }}>
            Digital Wallet
          </h3>
          <div style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            textAlign: 'center'
          }}>
            <p style={{ color: '#166534', marginBottom: '0.5rem' }}>
              Choose your preferred wallet
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              {['PayPal', 'Apple Pay', 'Google Pay'].map((wallet) => (
                <button
                  key={wallet}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #22c55e',
                    background: 'white',
                    color: '#22c55e',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#22c55e';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.color = '#22c55e';
                  }}
                >
                  {wallet}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cash on Delivery */}
      {paymentMethod === 'cod' && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            background: '#fef3c7',
            border: '1px solid #fbbf24',
            textAlign: 'center'
          }}>
            <p style={{ color: '#92400e', marginBottom: '0.5rem' }}>
              💵 Pay when your order arrives
            </p>
            <p style={{ fontSize: '0.875rem', color: '#92400e' }}>
              Additional ₹20 handling fee applies
            </p>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div style={{
        padding: '1.5rem',
        borderRadius: '0.5rem',
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: '#374151'
        }}>
          Order Summary
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: '#6b7280' }}>Subtotal:</span>
          <span style={{ color: '#374151' }}>${(total * 0.8).toFixed(2)}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: '#6b7280' }}>Delivery Fee:</span>
          <span style={{ color: '#374151' }}>${(total * 0.1).toFixed(2)}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: '#6b7280' }}>Tax:</span>
          <span style={{ color: '#374151' }}>${(total * 0.1).toFixed(2)}</span>
        </div>
        
        {paymentMethod === 'cod' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#6b7280' }}>COD Fee:</span>
            <span style={{ color: '#374151' }}>$0.20</span>
          </div>
        )}
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '0.75rem',
          borderTop: '1px solid #d1d5db',
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#111827'
        }}>
          <span>Total:</span>
          <span>${(paymentMethod === 'cod' ? total + 0.20 : total).toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button
          onClick={onPaymentCancel}
          disabled={processing}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #d1d5db',
            background: 'white',
            color: '#374151',
            fontWeight: '500',
            cursor: processing ? 'not-allowed' : 'pointer',
            opacity: processing ? 0.5 : 1
          }}
        >
          Cancel
        </button>
        
        <button
          onClick={handlePayment}
          disabled={processing}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: processing ? '#9ca3af' : '#dc2626',
            color: 'white',
            fontWeight: '600',
            cursor: processing ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease-in-out',
            opacity: processing ? 0.7 : 1
          }}
        >
          {processing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid transparent',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Processing...
            </div>
          ) : (
            `Pay $${(paymentMethod === 'cod' ? total + 0.20 : total).toFixed(2)}`
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
