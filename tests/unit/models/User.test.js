const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');

describe('User Model Unit Tests', () => {
  describe('User Creation', () => {
    it('should create a valid user with required fields', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.name).toBe(userData.name);
      expect(savedUser.email).toBe(userData.email.toLowerCase());
      expect(savedUser.role).toBe(userData.role);
      expect(savedUser.isActive).toBe(true);
      expect(savedUser.password).not.toBe(userData.password); // Should be hashed
      expect(savedUser.createdAt).toBeDefined();
      expect(savedUser.updatedAt).toBeDefined();
    });

    it('should fail to create user without required fields', async () => {
      const user = new User({});
      await expect(user.save()).rejects.toThrow();
    });

    it('should fail to create user with invalid email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    it('should fail to create user with short password', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123' // Too short
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    it('should fail to create user with invalid role', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'invalid-role'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });
  });

  describe('User Validation', () => {
    it('should enforce name length limits', async () => {
      const longName = 'a'.repeat(51);
      const userData = {
        name: longName,
        email: 'john@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    it('should enforce bio length limits', async () => {
      const longBio = 'a'.repeat(201);
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        bio: longBio
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    it('should enforce unique email constraint', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      // Create first user
      const user1 = new User(userData);
      await user1.save();

      // Try to create second user with same email
      const user2 = new User(userData);
      await expect(user2.save()).rejects.toThrow();
    });

    it('should convert email to lowercase', async () => {
      const userData = {
        name: 'John Doe',
        email: 'JOHN@EXAMPLE.COM',
        password: 'password123'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.email).toBe('john@example.com');
    });
  });

  describe('Password Hashing', () => {
    it('should hash password before saving', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      await user.save();

      expect(user.password).not.toBe(userData.password);
      expect(user.password).toMatch(/^\$2[aby]\$12\$/); // bcrypt hash pattern
    });

    it('should not rehash password if not modified', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      await user.save();
      const originalHash = user.password;

      // Update user without changing password
      user.name = 'Jane Doe';
      await user.save();

      expect(user.password).toBe(originalHash);
    });
  });

  describe('User Methods', () => {
    let user;

    beforeEach(async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };
      user = new User(userData);
      await user.save();
    });

    it('should compare password correctly', async () => {
      const isMatch = await user.comparePassword('password123');
      expect(isMatch).toBe(true);

      const isNotMatch = await user.comparePassword('wrongpassword');
      expect(isNotMatch).toBe(false);
    });

    it('should update last login', async () => {
      expect(user.lastLogin).toBeUndefined();

      await user.updateLastLogin();

      expect(user.lastLogin).toBeDefined();
      expect(user.lastLogin).toBeInstanceOf(Date);
    });
  });

  describe('User Virtuals', () => {
    it('should return correct profile virtual', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'admin',
        bio: 'Test bio',
        skills: ['JavaScript', 'Node.js'],
        department: 'Engineering'
      };

      const user = new User(userData);
      await user.save();

      const profile = user.profile;

      expect(profile.id).toEqual(user._id);
      expect(profile.name).toBe(userData.name);
      expect(profile.email).toBe(userData.email);
      expect(profile.role).toBe(userData.role);
      expect(profile.bio).toBe(userData.bio);
      expect(profile.skills).toEqual(userData.skills);
      expect(profile.department).toBe(userData.department);
      expect(profile.password).toBeUndefined();
    });
  });

  describe('User Preferences', () => {
    it('should set default preferences', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      await user.save();

      expect(user.preferences.theme).toBe('light');
      expect(user.preferences.notifications.email).toBe(true);
      expect(user.preferences.notifications.push).toBe(true);
      expect(user.preferences.timezone).toBe('UTC');
    });

    it('should handle custom preferences', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        preferences: {
          theme: 'dark',
          notifications: {
            email: false,
            push: true
          },
          timezone: 'EST'
        }
      };

      const user = new User(userData);
      await user.save();

      expect(user.preferences.theme).toBe('dark');
      expect(user.preferences.notifications.email).toBe(false);
      expect(user.preferences.notifications.push).toBe(true);
      expect(user.preferences.timezone).toBe('EST');
    });

    it('should validate theme preference', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        preferences: {
          theme: 'invalid-theme'
        }
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });
  });

  describe('User Skills and Department', () => {
    it('should handle skills array', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        skills: ['JavaScript', 'Node.js', 'React', 'MongoDB']
      };

      const user = new User(userData);
      await user.save();

      expect(user.skills).toHaveLength(4);
      expect(user.skills).toContain('JavaScript');
      expect(user.skills).toContain('Node.js');
      expect(user.skills).toContain('React');
      expect(user.skills).toContain('MongoDB');
    });

    it('should handle department field', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        department: 'Engineering'
      };

      const user = new User(userData);
      await user.save();

      expect(user.department).toBe('Engineering');
    });
  });
}); 