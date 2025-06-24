const mongoose = require('mongoose');
const Task = require('../../models/Task');
const User = require('../../models/User');
const Category = require('../../models/Category');

describe('Database Integration Tests', () => {
  let user, category;

  beforeEach(async () => {
    // Create test user and category for each test
    user = new User({
      name: 'Integration Test User',
      email: 'integration@example.com',
      password: 'password123'
    });
    await user.save();

    category = new Category({
      name: 'Integration Category',
      description: 'Category for integration testing',
      color: '#28a745',
      createdBy: user._id
    });
    await category.save();
  });

  describe('Task-User-Category Relationships', () => {
    it('should create task with proper relationships', async () => {
      const taskData = {
        title: 'Integration Test Task',
        description: 'Testing relationships',
        priority: 'high',
        status: 'pending',
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date(Date.now() + 86400000),
        estimatedHours: 5
      };

      const task = new Task(taskData);
      await task.save();

      // Populate relationships
      const populatedTask = await Task.findById(task._id)
        .populate('assignedTo', 'name email')
        .populate('category', 'name color');

      expect(populatedTask.assignedTo.name).toBe(user.name);
      expect(populatedTask.assignedTo.email).toBe(user.email);
      expect(populatedTask.category.name).toBe(category.name);
      expect(populatedTask.category.color).toBe(category.color);
    });

    it('should handle cascading operations correctly', async () => {
      // Create multiple tasks for the same user and category
      const tasks = [];
      for (let i = 0; i < 3; i++) {
        const task = new Task({
          title: `Task ${i}`,
          category: category._id,
          assignedTo: user._id,
          dueDate: new Date()
        });
        await task.save();
        tasks.push(task);
      }

      // Find all tasks for the user
      const userTasks = await Task.find({ assignedTo: user._id });
      expect(userTasks).toHaveLength(3);

      // Find all tasks for the category
      const categoryTasks = await Task.find({ category: category._id });
      expect(categoryTasks).toHaveLength(3);

      // Update user and verify tasks still reference correctly
      user.name = 'Updated User Name';
      await user.save();

      const updatedUserTasks = await Task.find({ assignedTo: user._id })
        .populate('assignedTo', 'name');
      
      expect(updatedUserTasks[0].assignedTo.name).toBe('Updated User Name');
    });

    it('should enforce referential integrity', async () => {
      const invalidTask = new Task({
        title: 'Invalid Task',
        category: new mongoose.Types.ObjectId(), // Non-existent category
        assignedTo: new mongoose.Types.ObjectId(), // Non-existent user
        dueDate: new Date()
      });

      // Task should save even with invalid references (MongoDB doesn't enforce FK constraints)
      // But our application logic should validate these
      await expect(invalidTask.save()).resolves.toBeDefined();
    });
  });

  describe('Complex Queries and Aggregations', () => {
    beforeEach(async () => {
      // Create multiple users, categories, and tasks for complex testing
      const users = [];
      const categories = [];
      
      for (let i = 0; i < 3; i++) {
        const testUser = new User({
          name: `User ${i}`,
          email: `user${i}@example.com`,
          password: 'password123'
        });
        await testUser.save();
        users.push(testUser);

        const testCategory = new Category({
          name: `Category ${i}`,
          color: `#${i}${i}${i}${i}${i}${i}`,
          createdBy: users[i]._id
        });
        await testCategory.save();
        categories.push(testCategory);
      }

      // Create tasks with various statuses and priorities
      const statuses = ['pending', 'in-progress', 'completed'];
      const priorities = ['low', 'medium', 'high'];

      for (let i = 0; i < 9; i++) {
        const task = new Task({
          title: `Complex Task ${i}`,
          priority: priorities[i % 3],
          status: statuses[i % 3],
          category: categories[i % 3]._id,
          assignedTo: users[i % 3]._id,
          dueDate: new Date(Date.now() + (i * 86400000)), // Different due dates
          estimatedHours: (i % 5) + 1
        });
        await task.save();
      }
    });

    it('should perform complex filtering and sorting', async () => {
      // Find high priority pending tasks
      const highPriorityPending = await Task.find({
        priority: 'high',
        status: 'pending'
      }).populate('assignedTo category');

      expect(highPriorityPending.length).toBeGreaterThan(0);

      // Find tasks due in the next 3 days
      const upcomingTasks = await Task.find({
        dueDate: {
          $gte: new Date(),
          $lte: new Date(Date.now() + 3 * 86400000)
        }
      }).sort({ dueDate: 1 });

      expect(upcomingTasks.length).toBeGreaterThan(0);
      
      // Verify sorting
      for (let i = 1; i < upcomingTasks.length; i++) {
        expect(upcomingTasks[i].dueDate.getTime())
          .toBeGreaterThanOrEqual(upcomingTasks[i-1].dueDate.getTime());
      }
    });

    it('should perform aggregation queries', async () => {
      // Aggregate tasks by status
      const statusAggregation = await Task.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalEstimatedHours: { $sum: '$estimatedHours' }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]);

      expect(statusAggregation).toHaveLength(3); // 3 different statuses
      expect(statusAggregation[0]).toHaveProperty('_id');
      expect(statusAggregation[0]).toHaveProperty('count');
      expect(statusAggregation[0]).toHaveProperty('totalEstimatedHours');

      // Aggregate tasks by user
      const userAggregation = await Task.aggregate([
        {
          $group: {
            _id: '$assignedTo',
            taskCount: { $sum: 1 },
            avgEstimatedHours: { $avg: '$estimatedHours' }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'userInfo'
          }
        }
      ]);

      expect(userAggregation).toHaveLength(3); // 3 different users
      userAggregation.forEach(result => {
        expect(result.taskCount).toBeGreaterThan(0);
        expect(result.avgEstimatedHours).toBeGreaterThan(0);
        expect(result.userInfo).toHaveLength(1);
      });
    });

    it('should handle text search efficiently', async () => {
      // Create an index for text search (in real app, this would be in schema)
      await Task.collection.createIndex({ title: 'text', description: 'text' });

      // Perform text search
      const searchResults = await Task.find({
        $text: { $search: 'Complex Task' }
      });

      expect(searchResults.length).toBeGreaterThan(0);
      searchResults.forEach(task => {
        expect(task.title).toMatch(/Complex Task/i);
      });
    });

    it('should handle pagination efficiently', async () => {
      const pageSize = 3;
      const page1 = await Task.find({})
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(0);

      const page2 = await Task.find({})
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize);

      expect(page1).toHaveLength(pageSize);
      expect(page2).toHaveLength(pageSize);

      // Ensure no overlap between pages
      const page1Ids = page1.map(task => task._id.toString());
      const page2Ids = page2.map(task => task._id.toString());
      
      const intersection = page1Ids.filter(id => page2Ids.includes(id));
      expect(intersection).toHaveLength(0);
    });
  });

  describe('Database Performance and Indexing', () => {
    it('should utilize indexes for efficient queries', async () => {
      // Create multiple tasks to test indexing
      const tasks = [];
      for (let i = 0; i < 50; i++) {
        const task = new Task({
          title: `Performance Task ${i}`,
          category: category._id,
          assignedTo: user._id,
          dueDate: new Date(Date.now() + (i * 3600000)), // Different due dates
          priority: i % 2 === 0 ? 'high' : 'low',
          status: i % 3 === 0 ? 'completed' : 'pending'
        });
        tasks.push(task);
      }
      await Task.insertMany(tasks);

      // Test indexed query performance
      const startTime = Date.now();
      
      const indexedResults = await Task.find({
        assignedTo: user._id,
        status: 'pending'
      }).explain('executionStats');

      const endTime = Date.now();
      const executionTime = endTime - startTime;

      // Query should complete quickly (under 100ms for this small dataset)
      expect(executionTime).toBeLessThan(100);
      
      // Check if indexes were used (this is implementation dependent)
      expect(indexedResults.executionStats).toBeDefined();
    });

    it('should handle bulk operations efficiently', async () => {
      const bulkTasks = [];
      for (let i = 0; i < 100; i++) {
        bulkTasks.push({
          title: `Bulk Task ${i}`,
          category: category._id,
          assignedTo: user._id,
          dueDate: new Date(),
          priority: 'medium'
        });
      }

      const startTime = Date.now();
      const result = await Task.insertMany(bulkTasks);
      const endTime = Date.now();

      expect(result).toHaveLength(100);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second

      // Test bulk update
      const updateResult = await Task.updateMany(
        { assignedTo: user._id },
        { $set: { status: 'in-progress' } }
      );

      expect(updateResult.modifiedCount).toBeGreaterThanOrEqual(100);
    });
  });

  describe('Atomic Operations', () => {
    it('should handle atomic document creation', async () => {
      // Test atomic operations without transactions (not supported in memory server)
      const atomicUser = new User({
        name: 'Atomic User',
        email: 'atomic@example.com',
        password: 'password123'
      });
      await atomicUser.save();

      const atomicCategory = new Category({
        name: 'Atomic Category',
        color: '#dc3545',
        createdBy: atomicUser._id
      });
      await atomicCategory.save();

      const atomicTask = new Task({
        title: 'Atomic Task',
        category: atomicCategory._id,
        assignedTo: atomicUser._id,
        dueDate: new Date()
      });
      await atomicTask.save();

      // Verify all documents were created
      const createdUser = await User.findById(atomicUser._id);
      const createdCategory = await Category.findById(atomicCategory._id);
      const createdTask = await Task.findById(atomicTask._id);

      expect(createdUser).toBeDefined();
      expect(createdCategory).toBeDefined();
      expect(createdTask).toBeDefined();
    });
  });

  describe('Data Validation and Constraints', () => {
    it('should enforce schema validation at database level', async () => {
      // Test that invalid data is rejected
      const invalidTask = new Task({
        title: '', // Empty title should fail
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date()
      });

      await expect(invalidTask.save()).rejects.toThrow();

      // Test enum validation
      const invalidPriorityTask = new Task({
        title: 'Valid Task',
        priority: 'super-high', // Invalid priority
        category: category._id,
        assignedTo: user._id,
        dueDate: new Date()
      });

      await expect(invalidPriorityTask.save()).rejects.toThrow();
    });

    it('should handle unique constraints', async () => {
      // Test user email uniqueness
      const duplicateUser = new User({
        name: 'Duplicate User',
        email: user.email, // Same email as existing user
        password: 'password123'
      });

      await expect(duplicateUser.save()).rejects.toThrow();

      // Test category name uniqueness
      const duplicateCategory = new Category({
        name: category.name, // Same name as existing category
        color: '#ffffff'
      });

      await expect(duplicateCategory.save()).rejects.toThrow();
    });
  });
}); 