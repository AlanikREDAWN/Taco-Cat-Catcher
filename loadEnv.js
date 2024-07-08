require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

console.log(`SUPABASE_URL: ${SUPABASE_URL}`);
console.log(`SUPABASE_KEY: ${SUPABASE_KEY}`);