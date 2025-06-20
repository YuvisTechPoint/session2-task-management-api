# 🚀 Personal Task Management API - Session 2 Complete! 🎉

> **Keploy API Fellowship Session 2 - Assignment Delivered Successfully**  
> A comprehensive RESTful API for personal task management with advanced analytics, authentication, and reporting capabilities.

## 🏆 Session 2 Achievement Badge
```
✅ Custom API Server with 4+ Endpoints - COMPLETED
✅ MongoDB Database Integration - COMPLETED  
✅ CRUD Operations Implementation - COMPLETED
✅ Advanced Analytics Dashboard - COMPLETED
✅ Security & Performance Features - COMPLETED
✅ Comprehensive Documentation - COMPLETED
🎊 READY FOR SUBMISSION! 🎊
```

## 📋 Table of Contents

- [Session 2 Summary](#-session-2-summary)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Environment Setup](#-environment-setup)
- [Usage Examples](#-usage-examples)
- [Database Schema](#-database-schema)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Session 2 Completion](#-session-2-completion)

## 🎯 Session 2 Summary

This project fulfills all requirements for **Keploy API Fellowship Session 2**:

### ✅ Mandatory Requirements Met:
1. **Custom API Server**: Built with Express.js serving 20+ endpoints
2. **Database Integration**: MongoDB with Mongoose ODM for data persistence
3. **4+ API Endpoints**: Tasks, Users, Categories, and Analytics modules
4. **CRUD Operations**: Complete Create, Read, Update, Delete functionality
5. **Comprehensive Documentation**: Detailed API docs with examples

### 🌟 Bonus Features Added:
- **Authentication & Authorization**: JWT-based security
- **Advanced Analytics**: Dashboard with performance metrics  
- **Input Validation**: Express-validator for request validation
- **Security Middleware**: Helmet, CORS, Rate limiting
- **Performance Optimization**: MongoDB aggregations, compression
- **Error Handling**: Comprehensive error responses
- **API Testing**: Health checks and validation endpoints

## ✨ Features

### Core Functionality
- ✅ **Complete CRUD Operations** - Create, read, update, and delete tasks, users, and categories
- 🔍 **Advanced Filtering & Search** - Filter by status, priority, category, assignee, and search terms
- 📄 **Pagination & Sorting** - Efficient data handling with customizable pagination and sorting
- 🏷️ **Task Categorization** - Organize tasks with color-coded categories and icons
- ⏰ **Due Date Management** - Track deadlines and identify overdue tasks
- 🎯 **Priority System** - High, medium, and low priority task management

### Analytics & Reporting
- 📊 **Dashboard Analytics** - Comprehensive overview of task statistics and performance
- 📈 **User Performance Tracking** - Individual user productivity metrics and trends
- 📉 **Task Trends Analysis** - Historical data analysis and productivity insights
- 📋 **Export Capabilities** - Export analytics data in JSON/CSV formats
- 🔄 **Real-time Statistics** - Live updates on task completion rates and efficiency

### Security & Performance
- 🔒 **Input Validation** - Comprehensive request validation using express-validator
- 🛡️ **Security Headers** - Enhanced security with Helmet.js
- ⚡ **Rate Limiting** - Protection against API abuse
- 🗜️ **Response Compression** - Optimized data transfer with gzip compression
- 🚀 **MongoDB Aggregations** - High-performance database queries

## 🛠 Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Dependencies
- **express-validator** - Request validation
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing
- **compression** - Response compression
- **morgan** - HTTP request logger
- **express-rate-limit** - Rate limiting middleware
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variable management

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd api-fellowship-session2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Verify installation**
   ```bash
   curl http://localhost:5000/health
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Available Endpoints

#### 📋 Tasks
- `GET /tasks` - Get all tasks with filtering and pagination
- `GET /tasks/:id` - Get single task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update existing task
- `DELETE /tasks/:id` - Delete task
- `PATCH /tasks/:id/status` - Update task status

#### 👥 Users
- `GET /users` - Get all users
- `GET /users/:id` - Get single user
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Soft delete user
- `GET /users/:id/profile` - Get user profile with stats

#### 🏷️ Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get single category
- `POST /categories` - Create new category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id`

#### 📊 Analytics
- `GET /analytics/dashboard` - Dashboard overview
- `GET /analytics/tasks` - Task analytics  
- `GET /analytics/users/:id` - User performance analytics
- `GET /analytics/reports/export` - Export analytics data

#### 🎉 Session 2 Special
- `GET /api/v1/session2/complete` - Session 2 completion celebration endpoint

### Query Parameters

#### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

#### Filtering
- `status` - Filter by status (pending, in-progress, completed, cancelled)
- `priority` - Filter by priority (low, medium, high)
- `category` - Filter by category ID
- `assignedTo` - Filter by assigned user ID
- `search` - Search in title and description
- `overdue` - Filter overdue tasks (true/false)

#### Sorting
- `sortBy` - Field to sort by (default: createdAt)
- `sortOrder` - Sort direction (asc, desc)

## 🔧 Environment Setup

Create a `.env` file in the root directory (copy from `.env.example`):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/task-management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## 💡 Usage Examples

### Quick API Test
```bash
# 1. Start the server
npm start

# 2. Test health endpoint
curl http://localhost:5000/health

# 3. Check Session 2 completion
curl http://localhost:5000/api/v1/session2/complete

# 4. View API documentation
curl http://localhost:5000/
```

### Creating a User
```bash
curl -X POST http://localhost:5000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "role": "user"
  }'
```

### Creating a Category
```bash
curl -X POST http://localhost:5000/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Work",
    "description": "Work-related tasks",
    "color": "#3498db",
    "icon": "briefcase"
  }'
```

### Creating a Task
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete API Documentation",
    "description": "Write comprehensive API documentation",
    "priority": "high",
    "status": "pending",
    "dueDate": "2024-01-15T09:00:00.000Z",
    "estimatedHours": 4,
    "category": "<category-id>",
    "assignedTo": "<user-id>"
  }'
```

## 🧪 Testing

### Quick Test Script
```bash
# Test all endpoints
npm run test-api
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 🏆 Session 2 Completion

### ✅ Assignment Requirements Met

1. **Custom API Server** ✅
   - Built with Express.js
   - 20+ endpoints across 4 modules
   - RESTful design principles

2. **Database Integration** ✅
   - MongoDB with Mongoose ODM
   - Three main collections: Tasks, Users, Categories
   - Relationships and references

3. **CRUD Operations** ✅
   - Complete Create, Read, Update, Delete for all entities
   - Advanced filtering and pagination
   - Search functionality

4. **API Documentation** ✅
   - Comprehensive README
   - Inline API documentation
   - Example requests and responses

5. **Additional Features** 🌟
   - Authentication & JWT tokens
   - Input validation
   - Security middleware
   - Analytics dashboard
   - Performance optimizations

### 📤 GitHub Submission Instructions

Follow these steps to submit your Session 2 assignment:

#### 1. Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Session 2 Task Management API"
```

#### 2. Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `session2-task-management-api`
4. Make it public
5. Don't initialize with README (we already have one)

#### 3. Connect and Push to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/session2-task-management-api.git
git branch -M main
git push -u origin main
```

#### 4. Verify Your Submission
Your repository should contain:
- ✅ `package.json` with dependencies
- ✅ `app.js` - Main application file
- ✅ `models/` - Database models (Task, User, Category)
- ✅ `routes/` - API route handlers
- ✅ `README.md` - This comprehensive documentation
- ✅ `.env.example` - Environment variables template

#### 5. Test Your Deployed Code
```bash
# Clone your repo to test
git clone https://github.com/YOUR_USERNAME/session2-task-management-api.git
cd session2-task-management-api
npm install
npm start

# Test the completion endpoint
curl http://localhost:5000/api/v1/session2/complete
```

### 🎉 Submission Checklist

- [ ] GitHub repository created and public
- [ ] All code committed and pushed
- [ ] README.md is comprehensive and clear
- [ ] .env.example file included
- [ ] API runs without errors
- [ ] At least 4 different endpoints working
- [ ] Database integration functional
- [ ] CRUD operations implemented

### 🔗 Submit Your Assignment

**Repository URL Format:**
```
https://github.com/YOUR_USERNAME/session2-task-management-api
```

**Copy this template for submission:**
```
🚀 Session 2 Assignment Submission

Repository: https://github.com/YOUR_USERNAME/session2-task-management-api
API Features: ✅ 4+ Endpoints, ✅ MongoDB, ✅ CRUD, ✅ Analytics
Tech Stack: Node.js, Express.js, MongoDB, Mongoose
Bonus Features: Authentication, Security, Validation, Documentation

Ready for review! 🎯
```

---

## 🎊 Congratulations!

You've successfully completed **Keploy API Fellowship Session 2**! 

Your task management API demonstrates:
- Professional API design
- Database integration
- Security best practices
- Comprehensive documentation
- Production-ready features

**Keep building, keep learning! 🚀**

---

*Built with ❤️ for Keploy API Fellowship Session 2*