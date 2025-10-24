import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneIcon, 
  EnvelopeIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '3rem 0 1rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              marginBottom: '1rem'
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
                color: 'white'
              }}>FoodieHub</span>
            </Link>
            <p style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              marginBottom: '1rem'
            }}>
              Your favorite food delivered fast and fresh. Order from the best restaurants in your area.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#9ca3af',
              fontSize: '0.875rem'
            }}>
              <PhoneIcon style={{ width: '1rem', height: '1rem' }} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#9ca3af',
              fontSize: '0.875rem',
              marginTop: '0.5rem'
            }}>
              <EnvelopeIcon style={{ width: '1rem', height: '1rem' }} />
              <span>support@foodiehub.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white'
            }}>Quick Links</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Help Center', path: '/help' },
                { name: 'Careers', path: '/careers' }
              ].map((link) => (
                <li key={link.name} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    to={link.path}
                    style={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s'
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white'
            }}>Customer Service</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { name: 'Order Tracking', path: '/track' },
                { name: 'Delivery Info', path: '/delivery' },
                { name: 'Returns', path: '/returns' },
                { name: 'FAQ', path: '/faq' }
              ].map((link) => (
                <li key={link.name} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    to={link.path}
                    style={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s'
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white'
            }}>Legal</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Cookie Policy', path: '/cookies' },
                { name: 'Accessibility', path: '/accessibility' }
              ].map((link) => (
                <li key={link.name} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    to={link.path}
                    style={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s'
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#9ca3af',
            fontSize: '0.875rem'
          }}>
            <span>Made with</span>
            <HeartIcon style={{ width: '1rem', height: '1rem', color: '#dc2626' }} />
            <span>for food lovers</span>
          </div>
          <p style={{
            color: '#9ca3af',
            fontSize: '0.875rem',
            margin: 0
          }}>
            © 2024 FoodieHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
