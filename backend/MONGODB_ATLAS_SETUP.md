# MongoDB Atlas Setup Guide

## Step 1: Create Your .env File

Create a file named `.env` in the `backend` folder with the following content:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
# Replace <username>, <password>, and <cluster-url> with your actual values
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

## Step 2: Replace the Placeholders

1. **Replace `<username>`** with your MongoDB Atlas username
2. **Replace `<password>`** with your MongoDB Atlas password
3. **Replace `<cluster-url>`** with your actual cluster URL from Atlas
4. **Replace `foodiehub`** with your preferred database name

## Example Connection String:
```
mongodb+srv://myuser:mypassword@foodiehub-cluster.abc123.mongodb.net/foodiehub?retryWrites=true&w=majority
```

## Step 3: Test the Connection

After updating your .env file, restart your backend server:

```bash
cd backend
npm run dev
```

You should see: "✅ Connected to MongoDB" in your console.

## Security Notes:

1. **Never commit your .env file** to version control
2. **Use strong passwords** for your database user
3. **Restrict IP access** in production
4. **Use environment variables** in production deployments
5. **Rotate your JWT secret** regularly

## Troubleshooting:

- **Connection timeout**: Check your IP whitelist in Atlas
- **Authentication failed**: Verify username/password
- **Network error**: Ensure your cluster is running
- **SSL error**: Make sure you're using the `mongodb+srv://` protocol
