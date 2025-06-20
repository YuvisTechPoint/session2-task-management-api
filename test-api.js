#!/usr/bin/env node

/**
 * 🧪 Session 2 API Test Script
 * Keploy API Fellowship - Task Management API
 * 
 * This script tests the main API endpoints to ensure everything is working correctly.
 */

const https = require('http');

const BASE_URL = 'http://localhost:5000';

console.log('🚀 Starting Session 2 API Tests...\n');

// Test helper function
function testEndpoint(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Session2-API-Test/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Run tests
async function runTests() {
  const tests = [
    {
      name: '🏥 Health Check',
      path: '/health',
      expectedStatus: 200
    },
    {
      name: '🏠 Welcome Endpoint',
      path: '/',
      expectedStatus: 200
    },
    {
      name: '🎉 Session 2 Completion',
      path: '/api/v1/session2/complete',
      expectedStatus: 200
    },
    {
      name: '📚 API Documentation',
      path: '/api/docs',
      expectedStatus: 200
    },
    {
      name: '📋 Tasks Endpoint',
      path: '/api/v1/tasks',
      expectedStatus: 200
    },
    {
      name: '👥 Users Endpoint',
      path: '/api/v1/users',
      expectedStatus: 200
    },
    {
      name: '🏷️ Categories Endpoint',
      path: '/api/v1/categories',
      expectedStatus: 200
    },
    {
      name: '📊 Analytics Dashboard',
      path: '/api/v1/analytics/dashboard',
      expectedStatus: 200
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}`);
      const result = await testEndpoint(test.path);
      
      if (result.status === test.expectedStatus) {
        console.log(`✅ PASSED - Status: ${result.status}`);
        passed++;
      } else {
        console.log(`❌ FAILED - Expected: ${test.expectedStatus}, Got: ${result.status}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ FAILED - Error: ${error.message}`);
      failed++;
    }
    console.log('');
  }

  console.log('📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! Your Session 2 API is ready for submission! 🚀');
  } else {
    console.log('\n⚠️  Some tests failed. Please check your server and try again.');
  }
}

// Check if server is running
testEndpoint('/health')
  .then(() => {
    console.log('✅ Server detected, running tests...\n');
    runTests();
  })
  .catch(() => {
    console.log('❌ Server not running. Please start your API with: npm start');
    console.log('   Then run this test again with: node test-api.js');
    process.exit(1);
  }); 