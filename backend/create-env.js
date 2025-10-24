// Create a test .env file with correct format
const fs = require('fs');

const correctEnvContent = `PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://rudharbajaj:Rudhar1234@foodiehub-cluster.9yk2joc.mongodb.net/foodiehub?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-make-it-very-long-and-random
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/`;

console.log('🔧 Creating correct .env file...');
console.log('Content to write:');
console.log(correctEnvContent);
console.log('\n');

// Write the correct .env file
fs.writeFileSync('.env', correctEnvContent);
console.log('✅ .env file created successfully!');
console.log('Now test the connection with: node diagnostic.js');
