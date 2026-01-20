# 🌱 Agrove - Digital Farm Management & Advisory Portal

A comprehensive full-stack web application for modern farm management, enabling farmers to manage farms, crops, and activities with real-time analytics and expert advisories.

## 📋 Features

### ✅ Completed Features

#### 1. **Authentication & Authorization**
- User registration and login with JWT-based authentication
- Role-based access control (Farmer, Admin)
- Secure password hashing with bcryptjs
- Token validation middleware

#### 2. **Farm Management**
- Create, read, update, and delete farms
- Track farm details (name, location, total area, soil type)
- Organize fields within farms
- Real-time data persistence

#### 3. **Crop Management**
- Add and manage crops for each farm
- Track planting dates, expected harvest dates
- Monitor crop status (planning, growing, harvested)
- Calculate yield estimations

#### 4. **Activity/Task Logging**
- Log farm activities (sowing, irrigation, fertilizing, pesticide, weeding, harvesting)
- Track activity dates and descriptions
- Mark activities as pending or completed
- View activity history per farm

#### 5. **Advisory Hub**
- Access expert farming advisories
- Categorized content (weather, pest, disease, fertilizer, irrigation)
- Global and farm-specific advisories
- Severity levels for urgent guidance

#### 6. **User Interface**
- Modern, responsive design with Tailwind CSS
- Dark mode toggle with persistent preference
- Mobile-friendly navigation
- Smooth animations and transitions
- Interactive cards and modals

#### 7. **Notifications**
- Toast notifications for success/error/warning messages
- User-friendly feedback on all actions
- Loading states for async operations

#### 8. **Dashboard & Analytics**
- Overview of user's farms
- Activity statistics
- Real-time data visualization (with Recharts)
- Export data functionality

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with the following variables
MONGO_URI=mongodb://localhost:27017/sapphire
JWT_SECRET=your_super_secret_jwt_key_12345
PORT=5000

# Start MongoDB (if not already running)
mongod --dbpath "C:\data\db"  # Windows
# or
mongod  # Linux/Mac

# Start the backend server
npm start
# Server will run on http://localhost:5000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
# Application will open at http://localhost:3000
```

---

## 📁 Project Structure

```
sapphire_project/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema with roles
│   │   ├── Farm.js          # Farm schema
│   │   ├── Crop.js          # Crop management
│   │   ├── Activity.js       # Activity logging
│   │   └── Advisory.js       # Advisory content
│   ├── routes/
│   │   ├── authRoutes.js     # Authentication endpoints
│   │   ├── farmRoutes.js     # Farm CRUD operations
│   │   ├── cropRoutes.js     # Crop CRUD operations
│   │   ├── activityRoutes.js # Activity CRUD operations
│   │   └── advisoryRoutes.js # Advisory CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── server.js             # Express server setup
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavbarNew.js           # Modern navigation
│   │   │   ├── FieldManagement.js     # Farm management UI
│   │   │   ├── ActivityLog.js         # Activity tracking UI
│   │   │   ├── AdvisoryHub.js         # Advisory content display
│   │   │   ├── Analytics.js           # Dashboard analytics
│   │   │   ├── DataExport.js          # Data export
│   │   │   └── Profile.js             # User profile
│   │   ├── pages/
│   │   │   ├── Login.js               # Login page (redesigned)
│   │   │   ├── Register.js            # Registration page (redesigned)
│   │   │   ├── Dashboard.js           # Main dashboard
│   │   │   ├── DashboardNew.js        # New dashboard component
│   │   │   └── AddFarm.js             # Add farm page
│   │   ├── services/
│   │   │   ├── api.js                 # Axios API client
│   │   │   └── toast.js               # Toast notification service
│   │   ├── App.js                     # Main app component with dark mode
│   │   ├── index.js                   # React entry point
│   │   ├── index.css                  # Tailwind CSS directives
│   │   └── App.css                    # Global styles
│   ├── tailwind.config.js             # Tailwind configuration
│   ├── postcss.config.js              # PostCSS configuration
│   ├── package.json                   # Frontend dependencies
│   └── .env                           # Frontend environment variables
│
└── README.md                          # This file
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register     # Create new user account
POST   /api/auth/login        # User login
```

### Farms
```
GET    /api/farms             # Get all user farms
POST   /api/farms             # Create new farm
GET    /api/farms/:id         # Get specific farm
PUT    /api/farms/:id         # Update farm
DELETE /api/farms/:id         # Delete farm
```

### Crops
```
GET    /api/crops/farm/:farmId # Get crops for a farm
POST   /api/crops              # Create new crop
GET    /api/crops/:id          # Get specific crop
PUT    /api/crops/:id          # Update crop
DELETE /api/crops/:id          # Delete crop
```

### Activities
```
GET    /api/activities         # Get all user activities
GET    /api/activities/farm/:farmId # Get farm activities
POST   /api/activities         # Create new activity
PUT    /api/activities/:id     # Update activity
DELETE /api/activities/:id     # Delete activity
```

### Advisories
```
GET    /api/advisories         # Get all advisories
GET    /api/advisories/category/:category # Get by category
GET    /api/advisories/:id     # Get specific advisory
POST   /api/advisories         # Create advisory (admin)
PUT    /api/advisories/:id     # Update advisory (admin)
DELETE /api/advisories/:id     # Delete advisory (admin)
```

---

## 🎨 Features in Detail

### Dark Mode
- Toggle dark mode using the moon/sun icon in the navbar
- Preference is saved in localStorage
- Applies to entire application

### Responsive Design
- Mobile-first approach
- Tailwind CSS responsive classes
- Works seamlessly on phones, tablets, and desktops

### Form Validation
- Client-side validation with error messages
- Server-side validation on all API endpoints
- Input sanitization and error handling

### Error Handling
- Try-catch blocks on all async operations
- User-friendly error messages via toast notifications
- Automatic session expiration handling

### Database
- MongoDB for data persistence
- Mongoose for schema validation
- Proper indexing on frequently queried fields
- Cascading deletes for related data

---

## 🔐 Security Features

1. **JWT Authentication**
   - Secure token-based authentication
   - Token validation on protected routes
   - Automatic logout on token expiration

2. **Password Security**
   - Bcryptjs for password hashing (10 salt rounds)
   - Never stores plain passwords

3. **CORS**
   - Configured to allow frontend requests
   - Prevents unauthorized cross-origin requests

4. **Authorization**
   - Role-based access control
   - User can only access their own data
   - Admin-only endpoints for administrative operations

---

## 📦 Dependencies

### Backend
```json
{
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongodb": "^7.0.0",
  "mongoose": "^9.1.3",
  "nodemon": "^3.1.11" (dev)
}
```

### Frontend
```json
{
  "axios": "^1.13.2",
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "react-router-dom": "^7.12.0",
  "react-icons": "latest",
  "react-toastify": "latest",
  "tailwindcss": "latest",
  "postcss": "latest",
  "autoprefixer": "latest",
  "recharts": "^3.6.0"
}
```

---

## 🚀 Deployment

### Backend Deployment (Heroku Example)
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret_key
git push heroku main
```

### Frontend Deployment (Netlify Example)
```bash
# Build production bundle
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

---

## 🧪 Testing

### Test Login
- Email: test@example.com
- Password: password123

### Test with Sample Data
1. Create a farm with name "Test Farm"
2. Add crops and activities
3. Check dashboard for updates
4. View advisories from Advisory Hub

---

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/sapphire
JWT_SECRET=your_super_secret_jwt_key_12345
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
Solution: Ensure MongoDB is running with: mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
Solution: Change PORT in .env or kill existing process
```

### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS
Solution: Check CORS configuration in server.js
```

### Token Expiration
```
Issue: 401 Unauthorized after some time
Solution: Login again - tokens have an expiration time
```

---

## 📊 Database Schema Examples

### User Document
```javascript
{
  _id: ObjectId,
  name: "John Farmer",
  email: "john@example.com",
  password: "hashed_password",
  role: "farmer",
  phone: "1234567890",
  location: "Rural Area",
  createdAt: ISODate
}
```

### Farm Document
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  farmName: "Green Acres",
  location: "District Name",
  totalArea: 50,
  soilType: "Loamy",
  fields: [],
  status: "active",
  createdAt: ISODate
}
```

---

## 🎯 Future Enhancements

- [ ] Weather API integration
- [ ] Pest detection using AI/ML
- [ ] Mobile app (React Native)
- [ ] Payment integration for premium features
- [ ] SMS notifications
- [ ] Multi-language support
- [ ] Offline mode with sync
- [ ] Social features (farmer community)
- [ ] Video tutorials
- [ ] Expert consultation booking

---

## 📞 Support

For issues, questions, or suggestions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check console logs for error messages
4. Contact the development team

---

## 📄 License

This project is provided as-is for educational and agricultural purposes.

---

## 🙏 Acknowledgments

Built with:
- **React** - Frontend library
- **Express.js** - Backend framework
- **MongoDB** - Database
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **React Toastify** - Notifications
- **Recharts** - Data visualization

---

## 📈 Project Status

- ✅ Core functionality complete
- ✅ Database schemas implemented
- ✅ API endpoints created
- ✅ UI/UX redesigned with Tailwind
- ✅ Dark mode implemented
- ✅ Authentication & authorization
- ✅ Error handling & validation
- 🔄 Testing in progress
- 📋 Documentation complete

---

**Last Updated:** January 20, 2026
**Version:** 1.0.0 (Beta)

---

*Let's revolutionize farming with technology! 🚜🌾*
