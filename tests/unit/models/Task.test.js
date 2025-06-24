const mongoose = require('mongoose');
const Task = require('../../../models/Task');
const User = require('../../../models/User');
const Category = require('../../../models/Category');

describe('Task Model Unit Tests', () => {
  let user, category;

  beforeEach(async () => {
    // Create test user and category
    user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();

    category = new Category({
      name: 'Test Category',
      description: 'Test description',
      color: '#007bff',
      createdBy: user._id
    });
    await category.save();
  });

  describe('Task Creation', () => {
    it('should create a valid task with required fields', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test description',
        priority: 'high',
        status: 'pending',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date(Date.now() + 86400000), // Tomorrow
        estimatedHours: 4
      };

      const task = new Task(taskData);
      const savedTask = await task.save();

      expect(savedTask._id).toBeDefined();
      expect(savedTask.title).toBe(taskData.title);
      expect(savedTask.description).toBe(taskData.description);
      expect(savedTask.priority).toBe(taskData.priority);
      expect(savedTask.status).toBe(taskData.status);
      expect(savedTask.estimatedHours).toBe(taskData.estimatedHours);
      expect(savedTask.createdAt).toBeDefined();
      expect(savedTask.updatedAt).toBeDefined();
    });

    it('should fail to create task without required fields', async () => {
      const task = new Task({});
      
      await expect(task.save()).rejects.toThrow();
    });

    it('should fail to create task with invalid priority', async () => {
      const taskData = {
        title: 'Test Task',
        priority: 'invalid-priority',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date()
      };

      const task = new Task(taskData);
      await expect(task.save()).rejects.toThrow();
    });

    it('should fail to create task with invalid status', async () => {
      const taskData = {
        title: 'Test Task',
        status: 'invalid-status',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date()
      };

      const task = new Task(taskData);
      await expect(task.save()).rejects.toThrow();
    });
  });

  describe('Task Validation', () => {
    it('should enforce title length limits', async () => {
      const longTitle = 'a'.repeat(101);
      const taskData = {
        title: longTitle,
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date()
      };

      const task = new Task(taskData);
      await expect(task.save()).rejects.toThrow();
    });

    it('should enforce description length limits', async () => {
      const longDescription = 'a'.repeat(501);
      const taskData = {
        title: 'Test Task',
        description: longDescription,
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date()
      };

      const task = new Task(taskData);
      await expect(task.save()).rejects.toThrow();
    });

    it('should enforce estimated hours limits', async () => {
      const taskData = {
        title: 'Test Task',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date(),
        estimatedHours: 50 // Exceeds max of 40
      };

      const task = new Task(taskData);
      await expect(task.save()).rejects.toThrow();
    });
  });

  describe('Task Virtuals', () => {
    it('should calculate isOverdue correctly for overdue task', async () => {
      const pastDate = new Date(Date.now() - 86400000); // Yesterday
      const taskData = {
        title: 'Overdue Task',
        category: category._id,
        assignedTo: user._id,
        dueDate: pastDate,
        status: 'pending'
      };

      const task = new Task(taskData);
      await task.save();

      expect(task.isOverdue).toBe(true);
    });

    it('should calculate isOverdue correctly for completed task', async () => {
      const pastDate = new Date(Date.now() - 86400000); // Yesterday
      const taskData = {
        title: 'Completed Task',
        category: category._id,
        assignedTo: user._id,
        dueDate: pastDate,
        status: 'completed'
      };

      const task = new Task(taskData);
      await task.save();

      expect(task.isOverdue).toBe(false);
    });

    it('should calculate progress percentage correctly', async () => {
      const taskData = {
        title: 'Test Task',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date()
      };

      // Test pending status
      const pendingTask = new Task({ ...taskData, status: 'pending' });
      expect(pendingTask.progressPercentage).toBe(0);

      // Test in-progress status
      const inProgressTask = new Task({ ...taskData, status: 'in-progress' });
      expect(inProgressTask.progressPercentage).toBe(50);

      // Test completed status
      const completedTask = new Task({ ...taskData, status: 'completed' });
      expect(completedTask.progressPercentage).toBe(100);
    });
  });

  describe('Task Pre-save Middleware', () => {
    it('should set completedAt when status changes to completed', async () => {
      const taskData = {
        title: 'Test Task',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date(),
        status: 'pending'
      };

      const task = new Task(taskData);
      await task.save();

      expect(task.completedAt).toBeUndefined();

      // Update status to completed
      task.status = 'completed';
      await task.save();

      expect(task.completedAt).toBeDefined();
      expect(task.completedAt).toBeInstanceOf(Date);
    });

    it('should clear completedAt when status changes from completed', async () => {
      const taskData = {
        title: 'Test Task',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date(),
        status: 'completed',
        completedAt: new Date()
      };

      const task = new Task(taskData);
      await task.save();

      expect(task.completedAt).toBeDefined();

      // Change status from completed
      task.status = 'in-progress';
      await task.save();

      expect(task.completedAt).toBeUndefined();
    });
  });

  describe('Task Schema Methods', () => {
    it('should handle tags array correctly', async () => {
      const taskData = {
        title: 'Test Task',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date(),
        tags: ['urgent', 'frontend', 'bug-fix']
      };

      const task = new Task(taskData);
      await task.save();

      expect(task.tags).toHaveLength(3);
      expect(task.tags).toContain('urgent');
      expect(task.tags).toContain('frontend');
      expect(task.tags).toContain('bug-fix');
    });

    it('should handle attachments array correctly', async () => {
      const taskData = {
        title: 'Test Task',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date(),
        attachments: [
          {
            filename: 'document.pdf',
            url: 'https://example.com/document.pdf'
          }
        ]
      };

      const task = new Task(taskData);
      await task.save();

      expect(task.attachments).toHaveLength(1);
      expect(task.attachments[0].filename).toBe('document.pdf');
      expect(task.attachments[0].url).toBe('https://example.com/document.pdf');
      expect(task.attachments[0].uploadDate).toBeDefined();
    });
  });
}); 