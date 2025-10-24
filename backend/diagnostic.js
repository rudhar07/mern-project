// Detailed MongoDB Atlas connection diagnostic
require('dotenv').config();
const mongoose = require('mongoose');

const diagnosticTest = async () => {
  console.log('🔍 MongoDB Atlas Connection Diagnostic');
  console.log('=====================================\n');

  // Check environment variables
  console.log('1. Environment Variables:');
  console.log(`   MONGODB_URI exists: ${process.env.MONGODB_URI ? '✅ Yes' : '❌ No'}`);
  
  if (process.env.MONGODB_URI) {
    // Parse connection string to check format
    const uri = process.env.MONGODB_URI;
    console.log(`   Connection string format: ${uri.startsWith('mongodb+srv://') ? '✅ Correct' : '❌ Incorrect'}`);
    
    // Extract username (without showing password)
    const usernameMatch = uri.match(/mongodb\+srv:\/\/([^:]+):/);
    if (usernameMatch) {
      console.log(`   Username found: ${usernameMatch[1]}`);
    } else {
      console.log('   ❌ Username not found in connection string');
    }
    
    // Check if password exists
    const passwordMatch = uri.match(/mongodb\+srv:\/\/[^:]+:([^@]+)@/);
    if (passwordMatch) {
      console.log(`   Password length: ${passwordMatch[1].length} characters`);
    } else {
      console.log('   ❌ Password not found in connection string');
    }
    
    // Check cluster URL
    const clusterMatch = uri.match(/@([^/]+)\//);
    if (clusterMatch) {
      console.log(`   Cluster URL: ${clusterMatch[1]}`);
    } else {
      console.log('   ❌ Cluster URL not found');
    }
    
    // Check database name
    const dbMatch = uri.match(/\/([^?]+)\?/);
    if (dbMatch) {
      console.log(`   Database name: ${dbMatch[1]}`);
    } else {
      console.log('   ❌ Database name not found');
    }
  }

  console.log('\n2. Connection Test:');
  
  try {
    // Set connection options
    const options = {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 10000, // 10 second timeout
    };
    
    console.log('   Attempting connection with 5-second timeout...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log('   ✅ Connection successful!');
    console.log(`   📍 Host: ${conn.connection.host}`);
    console.log(`   🗄️ Database: ${conn.connection.name}`);
    console.log(`   🔌 Ready state: ${conn.connection.readyState}`);
    
    // Test a simple operation
    console.log('\n3. Database Operations Test:');
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`   📋 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('   Collections:');
      collections.forEach(col => console.log(`     - ${col.name}`));
    }
    
    await mongoose.connection.close();
    console.log('\n   🔌 Connection closed successfully');
    
  } catch (error) {
    console.log('   ❌ Connection failed');
    console.log(`   Error type: ${error.name}`);
    console.log(`   Error message: ${error.message}`);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n🔧 Authentication Issues:');
      console.log('   - Double-check username and password');
      console.log('   - Ensure password doesn\'t contain special characters that need URL encoding');
      console.log('   - Verify user has "Read and write to any database" permissions');
      console.log('   - Check if user is active in Database Access');
    }
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('\n🔧 Network Issues:');
      console.log('   - Check internet connection');
      console.log('   - Verify cluster URL is correct');
      console.log('   - Ensure IP address is whitelisted in Network Access');
    }
    
    if (error.message.includes('timeout')) {
      console.log('\n🔧 Timeout Issues:');
      console.log('   - Check network connectivity');
      console.log('   - Verify cluster is running');
      console.log('   - Try increasing timeout values');
    }
  }
};

diagnosticTest();
