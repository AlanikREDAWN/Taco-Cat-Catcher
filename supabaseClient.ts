// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var supabase_js_1 = require("@supabase/supabase-js");
// var supabaseUrl = process.env.SUPABASE_URL || "";
// var supabaseAnonKey = process.env.SUPABASE_KEY || "";
// var supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
// exports.default = supabase;

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseAnonKey: string = process.env.SUPABASE_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing SUPABASE_URL or SUPABASE_KEY in environment variables.');
}

// Verifying the constants are correctly initialized
console.log(`Supabase URL: ${supabaseUrl}`);
console.log(`Supabase KEY: ${supabaseAnonKey}`);

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };