#!/usr/bin/env node

/**
 * Manual integration test for project assignment and event RSVP functionality
 * 
 * This script tests:
 * 1. Project interest registration
 * 2. Event RSVP
 * 3. Join request submission
 * 4. Admin decision handling
 * 
 * Run this script while the dev server is running: node scripts/test-project-features.js
 */

const BASE_URL = "http://localhost:3000";

async function testAPI(endpoint, payload, testName) {
  console.log(`\n🧪 Testing: ${testName}`);
  console.log(`   Endpoint: POST ${endpoint}`);
  console.log(`   Payload:`, JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const status = response.ok ? "✅ SUCCESS" : "❌ FAILED";

    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Result: ${status}`);
    console.log(`   Response:`, JSON.stringify(data, null, 2));

    return { success: response.ok, data };
  } catch (error) {
    console.log(`   ❌ ERROR:`, error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log("=".repeat(60));
  console.log("🚀 Starting Integration Tests for Project Features");
  console.log("=".repeat(60));

  const results = {
    passed: 0,
    failed: 0,
    total: 0,
  };

  // Test 1: Register project interest (valid)
  results.total++;
  const test1 = await testAPI(
    "/api/project-interest",
    {
      projectId: "test-project-123",
      userId: "test-user-456",
    },
    "Register Project Interest (Valid)"
  );
  if (test1.success) results.passed++;
  else results.failed++;

  // Test 2: Register project interest (missing projectId)
  results.total++;
  const test2 = await testAPI(
    "/api/project-interest",
    {
      userId: "test-user-456",
    },
    "Register Project Interest (Missing projectId - should fail)"
  );
  if (!test2.success) results.passed++; // Should fail
  else results.failed++;

  // Test 3: Register project interest (missing userId)
  results.total++;
  const test3 = await testAPI(
    "/api/project-interest",
    {
      projectId: "test-project-123",
    },
    "Register Project Interest (Missing userId - should fail)"
  );
  if (!test3.success) results.passed++; // Should fail
  else results.failed++;

  // Test 4: Event RSVP (valid)
  results.total++;
  const test4 = await testAPI(
    "/api/event-rsvp",
    {
      eventId: "test-event-789",
      userId: "test-user-456",
    },
    "Event RSVP (Valid)"
  );
  if (test4.success) results.passed++;
  else results.failed++;

  // Test 5: Event RSVP (missing eventId)
  results.total++;
  const test5 = await testAPI(
    "/api/event-rsvp",
    {
      userId: "test-user-456",
    },
    "Event RSVP (Missing eventId - should fail)"
  );
  if (!test5.success) results.passed++; // Should fail
  else results.failed++;

  // Test 6: Event RSVP (missing userId)
  results.total++;
  const test6 = await testAPI(
    "/api/event-rsvp",
    {
      eventId: "test-event-789",
    },
    "Event RSVP (Missing userId - should fail)"
  );
  if (!test6.success) results.passed++; // Should fail
  else results.failed++;

  // Test 7: Submit join request (valid)
  results.total++;
  const test7 = await testAPI(
    "/api/join",
    {
      displayName: "Test User",
      email: "test@example.com",
      phone: "1234567890",
      github: "testuser",
      portfolio: "https://testuser.dev",
      interests: ["Web Development", "Machine Learning"],
      experience: "intermediate",
      goals: "Learn new technologies and contribute to open source",
      role: "student",
      availability: "Weekends",
    },
    "Submit Join Request (Valid)"
  );
  if (test7.success) results.passed++;
  else results.failed++;

  // Test 8: Submit join request (missing required fields)
  results.total++;
  const test8 = await testAPI(
    "/api/join",
    {
      displayName: "Test User",
      email: "test@example.com",
    },
    "Submit Join Request (Incomplete - should fail)"
  );
  if (!test8.success) results.passed++; // Should fail
  else results.failed++;

  // Test 9: Admin decision (approve)
  results.total++;
  const test9 = await testAPI(
    "/api/admin/decision",
    {
      id: "test-request-001",
      decision: "approve",
    },
    "Admin Decision (Approve)"
  );
  if (test9.success) results.passed++;
  else results.failed++;

  // Test 10: Admin decision (hold)
  results.total++;
  const test10 = await testAPI(
    "/api/admin/decision",
    {
      id: "test-request-002",
      decision: "hold",
    },
    "Admin Decision (Hold)"
  );
  if (test10.success) results.passed++;
  else results.failed++;

  // Test 11: Admin decision (missing id)
  results.total++;
  const test11 = await testAPI(
    "/api/admin/decision",
    {
      decision: "approve",
    },
    "Admin Decision (Missing id - should fail)"
  );
  if (!test11.success) results.passed++; // Should fail
  else results.failed++;

  // Test 12: Admin decision (invalid decision)
  results.total++;
  const test12 = await testAPI(
    "/api/admin/decision",
    {
      id: "test-request-003",
      decision: "invalid",
    },
    "Admin Decision (Invalid decision - should fail)"
  );
  if (!test12.success) results.passed++; // Should fail
  else results.failed++;

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 Test Summary");
  console.log("=".repeat(60));
  console.log(`Total Tests: ${results.total}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);
  console.log("=".repeat(60));

  if (results.failed === 0) {
    console.log("\n🎉 All tests passed! The project features are working correctly.");
  } else {
    console.log("\n⚠️  Some tests failed. Please review the errors above.");
  }

  process.exit(results.failed === 0 ? 0 : 1);
}

// Check if server is running
fetch(BASE_URL)
  .then(() => {
    console.log("✅ Dev server is running at", BASE_URL);
    runTests();
  })
  .catch(() => {
    console.error("❌ Dev server is not running at", BASE_URL);
    console.error("Please start the dev server first: npm run dev");
    process.exit(1);
  });
