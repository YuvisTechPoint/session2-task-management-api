# Sample cURL Commands for Task Management API

## Health Check Endpoints

### 1. Health Check
```bash
curl -X GET "http://localhost:5000/health" \
  -H "Content-Type: application/json"
```

### 2. Welcome/API Info
```bash
curl -X GET "http://localhost:5000/" \
  -H "Content-Type: application/json"
```

## User Management

### 3. Register New User
```bash
curl -X POST "http://localhost:5000/api/v1/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123",
    "role": "user",
    "department": "Engineering"
  }'
```

### 4. User Login
```bash
curl -X POST "http://localhost:5000/api/v1/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

### 5. Get All Users
```bash
curl -X GET "http://localhost:5000/api/v1/users?page=1&limit=10" \
  -H "Content-Type: application/json"
```

### 6. Get User by ID (replace USER_ID)
```bash
curl -X GET "http://localhost:5000/api/v1/users/USER_ID" \
  -H "Content-Type: application/json"
```

## Category Management

### 7. Create Category
```bash
curl -X POST "http://localhost:5000/api/v1/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Development",
    "description": "Software development tasks",
    "color": "#3498db",
    "icon": "code"
  }'
```

### 8. Get All Categories
```bash
curl -X GET "http://localhost:5000/api/v1/categories?page=1&limit=10" \
  -H "Content-Type: application/json"
```

### 9. Get Category by ID (replace CATEGORY_ID)
```bash
curl -X GET "http://localhost:5000/api/v1/categories/CATEGORY_ID" \
  -H "Content-Type: application/json"
```

## Task Management

### 10. Create Task (replace USER_ID and CATEGORY_ID)
```bash
curl -X POST "http://localhost:5000/api/v1/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete API Documentation",
    "description": "Write comprehensive API documentation for the task management system",
    "priority": "high",
    "status": "pending",
    "dueDate": "2024-07-15T18:00:00.000Z",
    "estimatedHours": 8,
    "assignedTo": "USER_ID",
    "category": "CATEGORY_ID"
  }'
```

### 11. Get All Tasks
```bash
curl -X GET "http://localhost:5000/api/v1/tasks?page=1&limit=10" \
  -H "Content-Type: application/json"
```

### 12. Get Tasks with Filters
```bash
curl -X GET "http://localhost:5000/api/v1/tasks?status=pending&priority=high&page=1&limit=5" \
  -H "Content-Type: application/json"
```

### 13. Search Tasks
```bash
curl -X GET "http://localhost:5000/api/v1/tasks?search=documentation" \
  -H "Content-Type: application/json"
```

### 14. Get Task by ID (replace TASK_ID)
```bash
curl -X GET "http://localhost:5000/api/v1/tasks/TASK_ID" \
  -H "Content-Type: application/json"
```

### 15. Update Task (replace TASK_ID)
```bash
curl -X PUT "http://localhost:5000/api/v1/tasks/TASK_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete API Documentation - Updated",
    "status": "in-progress",
    "actualHours": 4
  }'
```

### 16. Delete Task (replace TASK_ID)
```bash
curl -X DELETE "http://localhost:5000/api/v1/tasks/TASK_ID" \
  -H "Content-Type: application/json"
```

## Analytics

### 17. Get Analytics Dashboard
```bash
curl -X GET "http://localhost:5000/api/v1/analytics/dashboard?timeframe=30d" \
  -H "Content-Type: application/json"
```

### 18. Get Analytics with Different Timeframe
```bash
curl -X GET "http://localhost:5000/api/v1/analytics/dashboard?timeframe=7d" \
  -H "Content-Type: application/json"
```

## Advanced Examples

### 19. Create Multiple Tasks for Testing
```bash
# Task 1 - Bug Fix
curl -X POST "http://localhost:5000/api/v1/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fix authentication bug",
    "description": "Resolve login issues reported by users",
    "priority": "urgent",
    "status": "pending",
    "dueDate": "2024-07-10T12:00:00.000Z",
    "estimatedHours": 4,
    "assignedTo": "USER_ID",
    "category": "CATEGORY_ID"
  }'

# Task 2 - Feature Development
curl -X POST "http://localhost:5000/api/v1/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implement dark mode",
    "description": "Add dark mode theme to the application",
    "priority": "medium",
    "status": "pending",
    "dueDate": "2024-07-20T18:00:00.000Z",
    "estimatedHours": 12,
    "assignedTo": "USER_ID",
    "category": "CATEGORY_ID"
  }'

# Task 3 - Testing
curl -X POST "http://localhost:5000/api/v1/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Write unit tests",
    "description": "Create comprehensive unit tests for the API",
    "priority": "high",
    "status": "pending",
    "dueDate": "2024-07-25T17:00:00.000Z",
    "estimatedHours": 16,
    "assignedTo": "USER_ID",
    "category": "CATEGORY_ID"
  }'
```

### 20. Get Overdue Tasks
```bash
curl -X GET "http://localhost:5000/api/v1/tasks?overdue=true" \
  -H "Content-Type: application/json"
```

## Instructions for Use:

1. **Start your API server first:**
   ```bash
   npm start
   ```

2. **Replace placeholders:** Before running the cURL commands, replace:
   - `USER_ID` with actual user ID from registration response
   - `CATEGORY_ID` with actual category ID from category creation response
   - `TASK_ID` with actual task ID from task creation response

3. **Run commands in sequence:** Start with user registration, then category creation, then task creation for best results.

4. **For Keploy Testing:** These commands can be copied directly into Keploy's API testing platform after starting your server.

## Testing Workflow Example:

```bash
# 1. Start server
npm start

# 2. Create user and save USER_ID
# 3. Create category and save CATEGORY_ID  
# 4. Create tasks using the IDs
# 5. Test various GET endpoints
# 6. Test UPDATE and DELETE operations
# 7. Check analytics dashboard
``` 