const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../helpers/testApp');
const Task = require('../../models/Task');
const User = require('../../models/User');
const Category = require('../../models/Category');

describe('Tasks API Integration Tests', () => {
  let user, category, taskId;

  beforeEach(async () => {
    // Create test user
    user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();

    // Create test category
    category = new Category({
      name: 'Test Category',
      description: 'Test description',
      color: '#007bff',
      createdBy: user._id
    });
    await category.save();

    // Create test task
    const task = new Task({
      title: 'Test Task',
      description: 'Test description',
      priority: 'high',
      status: 'pending',
      category: category._id,
      assignedTo: user._id,
      dueDate: new Date(Date.now() + 86400000),
      estimatedHours: 4
    });
    const savedTask = await task.save();
    taskId = savedTask._id;
  });

  describe('GET /api/v1/tasks', () => {
    it('should get all tasks with default pagination', async () => {
      const response = await request(app)
        .get('/api/v1/tasks')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.tasks).toHaveLength(1);
      expect(response.body.data.pagination).toBeDefined();
      expect(response.body.data.pagination.currentPage).toBe(1);
      expect(response.body.data.pagination.totalTasks).toBe(1);
    });

    it('should filter tasks by status', async () => {
      // Create another task with different status
      await Task.create({
        title: 'Completed Task',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date(),
        status: 'completed'
      });

      const response = await request(app)
        .get('/api/v1/tasks?status=completed')
        .expect(200);

      expect(response.body.data.tasks).toHaveLength(1);
      expect(response.body.data.tasks[0].status).toBe('completed');
    });

    it('should filter tasks by priority', async () => {
      const response = await request(app)
        .get('/api/v1/tasks?priority=high')
        .expect(200);

      expect(response.body.data.tasks).toHaveLength(1);
      expect(response.body.data.tasks[0].priority).toBe('high');
    });

    it('should search tasks by title', async () => {
      const response = await request(app)
        .get('/api/v1/tasks?search=Test')
        .expect(200);

      expect(response.body.data.tasks).toHaveLength(1);
      expect(response.body.data.tasks[0].title).toContain('Test');
    });

    it('should handle pagination correctly', async () => {
      // Create additional tasks
      for (let i = 0; i < 5; i++) {
        await Task.create({
          title: `Task ${i}`,
          category: category._id,
          assignedTo: user._id,
          dueDate: new Date()
        });
      }

      const response = await request(app)
        .get('/api/v1/tasks?page=1&limit=3')
        .expect(200);

      expect(response.body.data.tasks).toHaveLength(3);
      expect(response.body.data.pagination.currentPage).toBe(1);
      expect(response.body.data.pagination.totalTasks).toBe(6);
      expect(response.body.data.pagination.hasNext).toBe(true);
    });

    it('should sort tasks correctly', async () => {
      // Create task with earlier date
      await Task.create({
        title: 'Earlier Task',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date(),
        createdAt: new Date(Date.now() - 86400000)
      });

      const response = await request(app)
        .get('/api/v1/tasks?sortBy=createdAt&sortOrder=asc')
        .expect(200);

      expect(response.body.data.tasks).toHaveLength(2);
      expect(response.body.data.tasks[0].title).toBe('Earlier Task');
    });
  });

  describe('GET /api/v1/tasks/:id', () => {
    it('should get a single task by ID', async () => {
      const response = await request(app)
        .get(`/api/v1/tasks/${taskId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(taskId.toString());
      expect(response.body.data.title).toBe('Test Task');
      expect(response.body.data.assignedTo).toBeDefined();
      expect(response.body.data.category).toBeDefined();
    });

    it('should return 404 for non-existent task', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/v1/tasks/${nonExistentId}`)
        .expect(404);

      expect(response.body.error).toBe('Task not found');
    });

    it('should return 400 for invalid task ID format', async () => {
      const response = await request(app)
        .get('/api/v1/tasks/invalid-id')
        .expect(400);

      expect(response.body.error).toBe('Invalid task ID format');
    });
  });

  describe('POST /api/v1/tasks', () => {
    it('should create a new task with valid data', async () => {
      const taskData = {
        title: 'New Task',
        description: 'New task description',
        priority: 'medium',
        status: 'pending',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date(Date.now() + 86400000),
        estimatedHours: 3
      };

      const response = await request(app)
        .post('/api/v1/tasks')
        .send(taskData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Task created successfully');
      expect(response.body.data.title).toBe(taskData.title);
      expect(response.body.data.priority).toBe(taskData.priority);
    });

    it('should fail to create task without required fields', async () => {
      const invalidTaskData = {
        title: 'Incomplete Task'
        // Missing required fields
      };

      const response = await request(app)
        .post('/api/v1/tasks')
        .send(invalidTaskData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });

    it('should fail to create task with invalid user', async () => {
      const taskData = {
        title: 'Task with Invalid User',
        category: category._id,
        assignedTo: new mongoose.Types.ObjectId(),
        dueDate: new Date()
      };

      const response = await request(app)
        .post('/api/v1/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.error).toBe('Invalid user assignment');
    });

    it('should fail to create task with invalid category', async () => {
      const taskData = {
        title: 'Task with Invalid Category',
        category: new mongoose.Types.ObjectId(),
        assignedTo: user._id,
        dueDate: new Date()
      };

      const response = await request(app)
        .post('/api/v1/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.error).toBe('Invalid category');
    });

    it('should validate task data correctly', async () => {
      const invalidTaskData = {
        title: 'a'.repeat(101), // Too long
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date()
      };

      const response = await request(app)
        .post('/api/v1/tasks')
        .send(invalidTaskData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('PUT /api/v1/tasks/:id', () => {
    it('should update an existing task', async () => {
      const updateData = {
        title: 'Updated Task Title',
        description: 'Updated description',
        priority: 'low',
        status: 'in-progress',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date(Date.now() + 172800000), // 2 days
        estimatedHours: 6
      };

      const response = await request(app)
        .put(`/api/v1/tasks/${taskId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.priority).toBe(updateData.priority);
      expect(response.body.data.status).toBe(updateData.status);
    });

    it('should return 404 for non-existent task update', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const updateData = {
        title: 'Updated Title',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date()
      };

      const response = await request(app)
        .put(`/api/v1/tasks/${nonExistentId}`)
        .send(updateData)
        .expect(404);

      expect(response.body.error).toBe('Task not found');
    });

    it('should validate update data', async () => {
      const invalidUpdateData = {
        title: 'a'.repeat(101), // Too long
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date()
      };

      const response = await request(app)
        .put(`/api/v1/tasks/${taskId}`)
        .send(invalidUpdateData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('DELETE /api/v1/tasks/:id', () => {
    it('should delete an existing task', async () => {
      const response = await request(app)
        .delete(`/api/v1/tasks/${taskId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Task deleted successfully');

      // Verify task is deleted
      const deletedTask = await Task.findById(taskId);
      expect(deletedTask).toBeNull();
    });

    it('should return 404 for non-existent task deletion', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/v1/tasks/${nonExistentId}`)
        .expect(404);

      expect(response.body.error).toBe('Task not found');
    });

    it('should return 400 for invalid task ID format', async () => {
      const response = await request(app)
        .delete('/api/v1/tasks/invalid-id')
        .expect(400);

      expect(response.body.error).toBe('Invalid task ID format');
    });
  });

  describe('PATCH /api/v1/tasks/:id/status', () => {
    it('should update task status', async () => {
      const response = await request(app)
        .patch(`/api/v1/tasks/${taskId}/status`)
        .send({ status: 'completed' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('completed');
      expect(response.body.data.completedAt).toBeDefined();
    });

    it('should validate status value', async () => {
      const response = await request(app)
        .patch(`/api/v1/tasks/${taskId}/status`)
        .send({ status: 'invalid-status' })
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });

    it('should return 404 for non-existent task', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .patch(`/api/v1/tasks/${nonExistentId}/status`)
        .send({ status: 'completed' })
        .expect(404);

      expect(response.body.error).toBe('Task not found');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid ObjectId gracefully', async () => {
      const response = await request(app)
        .get('/api/v1/tasks/invalid-object-id')
        .expect(400);

      expect(response.body.error).toBe('Invalid task ID format');
    });
  });
}); 