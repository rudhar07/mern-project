# 🍕 FoodieHub - Modern Food Delivery App

A full-stack MERN application with a stunning modern UI for food delivery. Built with React, TypeScript, Express.js, MongoDB, and Tailwind CSS.

## ✨ Features

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Modern Components**: Built with Tailwind CSS and Framer Motion
- **Dark/Light Theme**: Elegant color schemes and gradients
- **Smooth Animations**: Micro-interactions and page transitions

### 🚀 Backend Features
- **RESTful API**: Complete CRUD operations for all entities
- **JWT Authentication**: Secure user authentication and authorization
- **MongoDB Integration**: Scalable database with Mongoose ODM
- **File Upload**: Support for restaurant and menu item images
- **Rate Limiting**: API protection and security
- **Input Validation**: Comprehensive data validation with Joi

### 🍽️ Food Delivery Features
- **Restaurant Listings**: Browse restaurants with filters and search
- **Menu Management**: Detailed menu items with customizations
- **Shopping Cart**: Real-time cart updates with local storage
- **Order Tracking**: Real-time order status updates
- **User Profiles**: Complete user management system
- **Reviews & Ratings**: Customer feedback system

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Query** for server state management
- **React Hook Form** for form handling
- **Zod** for validation
- **Heroicons** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Joi** for validation
- **Helmet** for security
- **CORS** for cross-origin requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-delivery-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create `backend/.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/food-delivery
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=uploads/
   ```

   Create `frontend/.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

7. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

8. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📁 Project Structure

```
food-delivery-app/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API services
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Utility functions
│   └── public/          # Static assets
└── README.md
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Update password

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `GET /api/restaurants/nearby` - Get nearby restaurants
- `POST /api/restaurants` - Create restaurant (Owner/Admin)
- `PUT /api/restaurants/:id` - Update restaurant (Owner/Admin)
- `DELETE /api/restaurants/:id` - Delete restaurant (Owner/Admin)

### Menu Items
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get menu item by ID
- `GET /api/menu/restaurant/:id` - Get restaurant menu
- `POST /api/menu` - Create menu item (Owner/Admin)
- `PUT /api/menu/:id` - Update menu item (Owner/Admin)
- `DELETE /api/menu/:id` - Delete menu item (Owner/Admin)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status (Owner/Admin)
- `PUT /api/orders/:id/rating` - Rate order

## 🎨 UI Components

The app includes a comprehensive set of reusable components:

- **Layout Components**: Navbar, Footer, Sidebar
- **UI Components**: Button, Input, Card, Modal, Toast
- **Form Components**: LoginForm, RegisterForm, ProfileForm
- **Restaurant Components**: RestaurantCard, RestaurantList, RestaurantDetail
- **Menu Components**: MenuItem, MenuList, MenuCategory
- **Cart Components**: CartItem, CartSummary, CartActions

## 🔧 Development

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Update environment variables for production
3. Deploy to Heroku, Vercel, or your preferred platform

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Update API URL in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** for the amazing utility-first CSS framework
- **Framer Motion** for smooth animations
- **Heroicons** for beautiful icons
- **React Query** for server state management
- **MongoDB** for the flexible database solution

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact us at support@foodiehub.com

---

**Made with ❤️ for food lovers everywhere!** 🍕🍔🍜
