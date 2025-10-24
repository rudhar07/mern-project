// Test different connection string formats
require('dotenv').config();

console.log('🔍 Current Connection String Analysis');
console.log('=====================================\n');

const uri = process.env.MONGODB_URI;
console.log('Current MONGODB_URI:');
console.log(uri);
console.log('\n');

// Parse the connection string manually
const parts = uri.split('://');
if (parts.length === 2) {
  const protocol = parts[0];
  const rest = parts[1];
  
  console.log('Protocol:', protocol);
  
  // Split by @ to separate credentials from host
  const credentialParts = rest.split('@');
  if (credentialParts.length === 2) {
    const credentials = credentialParts[0];
    const hostAndDb = credentialParts[1];
    
    console.log('Credentials part:', credentials);
    
    // Split credentials by :
    const credParts = credentials.split(':');
    if (credParts.length === 2) {
      console.log('Username:', credParts[0]);
      console.log('Password length:', credParts[1].length);
    }
    
    console.log('Host and DB part:', hostAndDb);
    
    // Split host and database
    const hostDbParts = hostAndDb.split('/');
    if (hostDbParts.length >= 2) {
      console.log('Host:', hostDbParts[0]);
      console.log('Database:', hostDbParts[1].split('?')[0]);
    }
  }
}

console.log('\n🔧 Suggested Fix:');
console.log('Make sure your .env file has exactly this format:');
console.log('MONGODB_URI=mongodb+srv://rudharbajaj:<password>@cluster0.wn0wu9t.mongodb.net/foodiehub?retryWrites=true&w=majority');
console.log('\nReplace <password> with your actual password (URL encode special characters if needed)');
console.log('Make sure there are NO extra spaces or characters');
