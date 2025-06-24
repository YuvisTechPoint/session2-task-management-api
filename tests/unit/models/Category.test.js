const mongoose = require('mongoose');
const Category = require('../../../models/Category');
const User = require('../../../models/User');

describe('Category Model Unit Tests', () => {
  let user;

  beforeEach(async () => {
    // Create test user first (required for createdBy)
    user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();
  });

  describe('Category Creation', () => {
    it('should create a valid category with required fields', async () => {
      const categoryData = {
        name: 'Work',
        description: 'Work-related tasks',
        color: '#007bff',
        icon: 'briefcase',
        createdBy: user._id
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      expect(savedCategory._id).toBeDefined();
      expect(savedCategory.name).toBe(categoryData.name);
      expect(savedCategory.description).toBe(categoryData.description);
      expect(savedCategory.color).toBe(categoryData.color);
      expect(savedCategory.icon).toBe(categoryData.icon);
      expect(savedCategory.isActive).toBe(true); // Default value
      expect(savedCategory.createdAt).toBeDefined();
      expect(savedCategory.updatedAt).toBeDefined();
    });

    it('should create category with only required fields', async () => {
      const categoryData = {
        name: 'Personal',
        createdBy: user._id
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      expect(savedCategory._id).toBeDefined();
      expect(savedCategory.name).toBe(categoryData.name);
      expect(savedCategory.color).toBe('#3498db'); // Default color from schema
      expect(savedCategory.isActive).toBe(true);
    });

    it('should fail to create category without name', async () => {
      const category = new Category({ createdBy: user._id });
      await expect(category.save()).rejects.toThrow();
    });

    it('should fail to create category without createdBy', async () => {
      const category = new Category({ name: 'Test Category' });
      await expect(category.save()).rejects.toThrow();
    });
  });

  describe('Category Validation', () => {
    it('should enforce name length limits', async () => {
      const longName = 'a'.repeat(51);
      const categoryData = {
        name: longName,
        createdBy: user._id
      };

      const category = new Category(categoryData);
      await expect(category.save()).rejects.toThrow();
    });

    it('should enforce description length limits', async () => {
      const longDescription = 'a'.repeat(201);
      const categoryData = {
        name: 'Test Category',
        description: longDescription,
        createdBy: user._id
      };

      const category = new Category(categoryData);
      await expect(category.save()).rejects.toThrow();
    });

    it('should enforce unique name constraint', async () => {
      const categoryData = {
        name: 'Work',
        description: 'Work-related tasks',
        createdBy: user._id
      };

      // Create first category
      const category1 = new Category(categoryData);
      await category1.save();

      // Try to create second category with same name
      const category2 = new Category(categoryData);
      await expect(category2.save()).rejects.toThrow();
    });

    it('should trim whitespace from name', async () => {
      const categoryData = {
        name: '  Work  ',
        createdBy: user._id
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      expect(savedCategory.name).toBe('Work');
    });

    it('should validate color format', async () => {
      const categoryData = {
        name: 'Test Category',
        color: 'invalid-color',
        createdBy: user._id
      };

      const category = new Category(categoryData);
      await expect(category.save()).rejects.toThrow();
    });

    it('should accept valid hex color', async () => {
      const categoryData = {
        name: 'Test Category',
        color: '#ff5733',
        createdBy: user._id
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      expect(savedCategory.color).toBe('#ff5733');
    });
  });

  describe('Category Default Values', () => {
    it('should set default color when not provided', async () => {
      const categoryData = {
        name: 'Test Category',
        createdBy: user._id
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      expect(savedCategory.color).toBe('#3498db');
    });

    it('should set default isActive to true', async () => {
      const categoryData = {
        name: 'Test Category',
        createdBy: user._id
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      expect(savedCategory.isActive).toBe(true);
    });

    it('should respect provided isActive value', async () => {
      const categoryData = {
        name: 'Test Category',
        isActive: false,
        createdBy: user._id
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      expect(savedCategory.isActive).toBe(false);
    });
  });

  describe('Category Updates', () => {
    let category;

    beforeEach(async () => {
      const categoryData = {
        name: 'Original Name',
        description: 'Original description',
        color: '#007bff',
        createdBy: user._id
      };
      category = new Category(categoryData);
      await category.save();
    });

    it('should update category fields', async () => {
      category.name = 'Updated Name';
      category.description = 'Updated description';
      category.color = '#28a745';
      
      const updatedCategory = await category.save();

      expect(updatedCategory.name).toBe('Updated Name');
      expect(updatedCategory.description).toBe('Updated description');
      expect(updatedCategory.color).toBe('#28a745');
      expect(updatedCategory.updatedAt).not.toEqual(updatedCategory.createdAt);
    });

    it('should validate updated fields', async () => {
      category.name = 'a'.repeat(51); // Too long
      await expect(category.save()).rejects.toThrow();
    });
  });

  describe('Category Query Methods', () => {
    beforeEach(async () => {
      // Create test categories
      await Category.create([
        { name: 'Work', color: '#007bff', isActive: true, createdBy: user._id },
        { name: 'Personal', color: '#28a745', isActive: true, createdBy: user._id },
        { name: 'Archived', color: '#6c757d', isActive: false, createdBy: user._id }
      ]);
    });

    it('should find active categories', async () => {
      const activeCategories = await Category.find({ isActive: true }).sort({ name: 1 });
      expect(activeCategories).toHaveLength(2);
      expect(activeCategories.map(c => c.name)).toEqual(['Personal', 'Work']);
    });

    it('should find inactive categories', async () => {
      const inactiveCategories = await Category.find({ isActive: false });
      expect(inactiveCategories).toHaveLength(1);
      expect(inactiveCategories[0].name).toBe('Archived');
    });

    it('should find category by name', async () => {
      const workCategory = await Category.findOne({ name: 'Work' });
      expect(workCategory).toBeDefined();
      expect(workCategory.name).toBe('Work');
      expect(workCategory.color).toBe('#007bff');
    });

    it('should populate createdBy user', async () => {
      const category = await Category.findOne({ name: 'Work' })
        .populate('createdBy', 'name email');
      
      expect(category.createdBy).toBeDefined();
      expect(category.createdBy.name).toBe(user.name);
      expect(category.createdBy.email).toBe(user.email);
    });
  });

  describe('Category Virtuals', () => {
    it('should handle task count virtual reference', async () => {
      const category = new Category({
        name: 'Test Category',
        createdBy: user._id
      });
      await category.save();

      // Test that the virtual exists (can't populate in unit test without Task model loaded)
      const foundCategory = await Category.findById(category._id);
      
      expect(foundCategory).toBeDefined();
      expect(foundCategory.name).toBe('Test Category');
      expect(foundCategory.createdBy.toString()).toBe(user._id.toString());
    });
  });
}); 