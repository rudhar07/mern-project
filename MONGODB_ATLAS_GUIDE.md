# 🚀 MongoDB Atlas Setup Guide for FoodieHub

## Quick Setup Steps

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project called "FoodieHub"

### 2. Create a Free Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select your preferred cloud provider (AWS, Google Cloud, Azure)
4. Choose a region closest to your location
5. Name your cluster (e.g., "foodiehub-cluster")
6. Click "Create Cluster"

### 3. Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### 4. Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your specific IP addresses
5. Click "Confirm"

### 5. Get Your Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as driver
5. Copy the connection string

### 6. Update Your Backend Configuration

Create a `.env` file in the `backend` folder:

```env
PORT=5000
NODE_ENV=development

# Replace with your actual MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/foodiehub?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-make-it-very-long-and-random
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/
```

**Replace the placeholders:**
- `<username>` - Your MongoDB Atlas username
- `<password>` - Your MongoDB Atlas password  
- `<cluster-url>` - Your cluster URL from Atlas

### 7. Test the Connection

1. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. You should see: `✅ Connected to MongoDB Atlas: <cluster-name>`

### 8. Seed Sample Data (Optional)

To populate your database with sample restaurants and menu items:

```bash
cd backend
npm run seed
```

This will create:
- 2 sample users (customer and restaurant owner)
- 2 sample restaurants (Italian and Chinese)
- 6 sample menu items

## 🔒 Security Best Practices

### For Development:
- Use the free M0 tier
- Allow access from anywhere (0.0.0.0/0)
- Use strong passwords
- Never commit `.env` files

### For Production:
- Upgrade to a paid tier
- Restrict IP access to your server IPs only
- Use environment variables
- Enable MongoDB Atlas security features
- Regular security audits

## 🚨 Troubleshooting

### Connection Issues:
- **Timeout**: Check your IP whitelist in Atlas
- **Authentication failed**: Verify username/password
- **Network error**: Ensure cluster is running
- **SSL error**: Use `mongodb+srv://` protocol

### Common Solutions:
1. **Clear browser cache** if using Atlas web interface
2. **Check cluster status** in Atlas dashboard
3. **Verify connection string** format
4. **Test with MongoDB Compass** (desktop app)

## 📊 Monitoring Your Database

MongoDB Atlas provides:
- **Real-time monitoring** of your cluster
- **Performance metrics** and alerts
- **Backup and restore** capabilities
- **Scaling options** as your app grows

## 🎯 Next Steps

Once your Atlas connection is working:

1. **Test the API endpoints** with sample data
2. **Implement authentication** features
3. **Add more restaurants** and menu items
4. **Set up production environment**
5. **Configure automated backups**

## 📞 Support

- **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com/
- **Community Forum**: https://community.mongodb.com/
- **Atlas Support**: Available in your Atlas dashboard

---

**Happy coding! 🍕 Your food delivery app is ready to scale with MongoDB Atlas!**
