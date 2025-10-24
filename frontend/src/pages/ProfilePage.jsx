import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    preferences: {
      dietaryRestrictions: [],
      favoriteCuisines: [],
      notifications: {
        email: true,
        sms: true,
        push: true
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchProfile();
  }, [user]); // Add user as dependency

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // First try to get user profile from auth endpoint
      const response = await api.get('/auth/me');
      const userData = response.data.user || response.data;
      
      // Set profile with user data
      setProfile({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        preferences: {
          dietaryRestrictions: userData.preferences?.dietaryRestrictions || [],
          favoriteCuisines: userData.preferences?.favoriteCuisines || [],
          notifications: {
            email: userData.preferences?.notifications?.email ?? true,
            sms: userData.preferences?.notifications?.sms ?? true,
            push: userData.preferences?.notifications?.push ?? true
          }
        }
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      // If API fails, use the logged-in user data as fallback
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        preferences: {
          dietaryRestrictions: user.preferences?.dietaryRestrictions || [],
          favoriteCuisines: user.preferences?.favoriteCuisines || [],
          notifications: {
            email: user.preferences?.notifications?.email ?? true,
            sms: user.preferences?.notifications?.sms ?? true,
            push: user.preferences?.notifications?.push ?? true
          }
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handlePreferenceChange = (type, value) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: value
      }
    }));
  };

  const handleNotificationChange = (type, value) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: {
          ...prev.preferences.notifications,
          [type]: value
        }
      }
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Use the correct auth endpoint for profile updates
      await api.put('/auth/profile', {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        preferences: profile.preferences
      });
      
      // Show toast after successful save
      setTimeout(() => {
        toast.success('Profile updated successfully!');
      }, 100);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to update profile');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    
    // Show toast after logout
    setTimeout(() => {
      toast.success('Logged out successfully!');
    }, 100);
  };

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
    'Nut-Free', 'Halal', 'Kosher', 'Low-Carb', 'Keto'
  ];

  const cuisineOptions = [
    'Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 
    'Thai', 'Mediterranean', 'American', 'French', 'Korean'
  ];

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

  if (!user) {
    return (
      <div style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>
          Please log in to view your profile
        </h2>
        <p style={{ color: '#6b7280' }}>
          You need to be logged in to access your profile settings.
        </p>
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
          My Profile
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          Manage your account settings and preferences
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Sidebar */}
        <div style={{ 
          width: '250px', 
          minWidth: '250px',
          background: 'white',
          borderRadius: '1rem',
          border: '1px solid #e5e7eb',
          padding: '1.5rem',
          height: 'fit-content'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #dc2626 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: 'white',
              fontWeight: '600'
            }}>
              {profile.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600',
                marginBottom: '0.25rem',
                color: '#111827'
              }}>
                {profile.name || 'User'}
              </h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280' 
              }}>
                {profile.email}
              </p>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { id: 'profile', label: 'Profile Info', icon: '👤' },
              { id: 'preferences', label: 'Preferences', icon: '⚙️' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' },
              { id: 'security', label: 'Security', icon: '🔒' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: activeTab === tab.id ? '#dc2626' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#374151',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  textAlign: 'left',
                  width: '100%'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = '#f3f4f6';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '1.125rem' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div style={{ 
            marginTop: '2rem', 
            paddingTop: '1rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: '#ef4444',
                color: 'white',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                textAlign: 'left',
                width: '100%'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#dc2626';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#ef4444';
              }}
            >
              <span style={{ fontSize: '1.125rem' }}>🚪</span>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, minWidth: '400px' }}>
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            border: '1px solid #e5e7eb',
            padding: '2rem'
          }}>
            {/* Profile Info Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  marginBottom: '1.5rem',
                  color: '#111827'
                }}>
                  Profile Information
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      marginBottom: '0.5rem',
                      color: '#374151'
                    }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
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
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        fontSize: '1rem',
                        outline: 'none',
                        background: '#f9fafb'
                      }}
                      disabled
                    />
                    <p style={{ 
                      fontSize: '0.75rem', 
                      color: '#6b7280', 
                      marginTop: '0.25rem' 
                    }}>
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      marginBottom: '0.5rem',
                      color: '#374151'
                    }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
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
                      Default Address
                    </label>
                    <textarea
                      value={profile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        fontSize: '1rem',
                        outline: 'none',
                        resize: 'vertical'
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
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  marginBottom: '1.5rem',
                  color: '#111827'
                }}>
                  Food Preferences
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      marginBottom: '1rem',
                      color: '#374151'
                    }}>
                      Dietary Restrictions
                    </h3>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem' 
                    }}>
                      {dietaryOptions.map((option) => (
                        <label
                          key={option}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #d1d5db',
                            cursor: 'pointer',
                            background: profile.preferences.dietaryRestrictions?.includes(option) ? '#dc2626' : 'white',
                            color: profile.preferences.dietaryRestrictions?.includes(option) ? 'white' : '#374151',
                            transition: 'all 0.2s ease-in-out'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={profile.preferences.dietaryRestrictions?.includes(option) || false}
                            onChange={(e) => {
                              const current = profile.preferences.dietaryRestrictions || [];
                              const updated = e.target.checked
                                ? [...current, option]
                                : current.filter(item => item !== option);
                              handlePreferenceChange('dietaryRestrictions', updated);
                            }}
                            style={{ display: 'none' }}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      marginBottom: '1rem',
                      color: '#374151'
                    }}>
                      Favorite Cuisines
                    </h3>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem' 
                    }}>
                      {cuisineOptions.map((option) => (
                        <label
                          key={option}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #d1d5db',
                            cursor: 'pointer',
                            background: profile.preferences.favoriteCuisines?.includes(option) ? '#2563eb' : 'white',
                            color: profile.preferences.favoriteCuisines?.includes(option) ? 'white' : '#374151',
                            transition: 'all 0.2s ease-in-out'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={profile.preferences.favoriteCuisines?.includes(option) || false}
                            onChange={(e) => {
                              const current = profile.preferences.favoriteCuisines || [];
                              const updated = e.target.checked
                                ? [...current, option]
                                : current.filter(item => item !== option);
                              handlePreferenceChange('favoriteCuisines', updated);
                            }}
                            style={{ display: 'none' }}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  marginBottom: '1.5rem',
                  color: '#111827'
                }}>
                  Notification Settings
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { key: 'email', label: 'Email Notifications', description: 'Receive order updates via email' },
                    { key: 'sms', label: 'SMS Notifications', description: 'Receive order updates via text message' },
                    { key: 'push', label: 'Push Notifications', description: 'Receive notifications on your device' }
                  ].map((notification) => (
                    <div
                      key={notification.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb',
                        background: 'white'
                      }}
                    >
                      <div>
                        <h3 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600',
                          marginBottom: '0.25rem',
                          color: '#111827'
                        }}>
                          {notification.label}
                        </h3>
                        <p style={{ 
                          fontSize: '0.875rem', 
                          color: '#6b7280' 
                        }}>
                          {notification.description}
                        </p>
                      </div>
                      <label style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '50px',
                        height: '24px'
                      }}>
                        <input
                          type="checkbox"
                          checked={profile.preferences.notifications?.[notification.key] || false}
                          onChange={(e) => handleNotificationChange(notification.key, e.target.checked)}
                          style={{ display: 'none' }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: profile.preferences.notifications?.[notification.key] ? '#dc2626' : '#d1d5db',
                          borderRadius: '24px',
                          transition: '0.3s'
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '""',
                            height: '18px',
                            width: '18px',
                            left: '3px',
                            bottom: '3px',
                            background: 'white',
                            borderRadius: '50%',
                            transition: '0.3s',
                            transform: profile.preferences.notifications?.[notification.key] ? 'translateX(26px)' : 'translateX(0)'
                          }}></span>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  marginBottom: '1.5rem',
                  color: '#111827'
                }}>
                  Security Settings
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb',
                    background: '#f9fafb'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: '#111827'
                    }}>
                      Change Password
                    </h3>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280',
                      marginBottom: '1rem'
                    }}>
                      Update your password to keep your account secure
                    </p>
                    <button
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #dc2626',
                        background: 'white',
                        color: '#dc2626',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = '#dc2626';
                        e.target.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'white';
                        e.target.style.color = '#dc2626';
                      }}
                    >
                      Change Password
                    </button>
                  </div>

                  <div style={{
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb',
                    background: '#f9fafb'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: '#111827'
                    }}>
                      Two-Factor Authentication
                    </h3>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280',
                      marginBottom: '1rem'
                    }}>
                      Add an extra layer of security to your account
                    </p>
                    <button
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #2563eb',
                        background: 'white',
                        color: '#2563eb',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = '#2563eb';
                        e.target.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'white';
                        e.target.style.color = '#2563eb';
                      }}
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            {activeTab !== 'security' && (
              <div style={{ 
                marginTop: '2rem', 
                display: 'flex', 
                justifyContent: 'flex-end' 
              }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    padding: '0.75rem 2rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: saving ? '#9ca3af' : '#dc2626',
                    color: 'white',
                    fontWeight: '600',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    opacity: saving ? 0.7 : 1
                  }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;