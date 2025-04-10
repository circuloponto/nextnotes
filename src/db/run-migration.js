// This script runs the SQL migration to add reminder columns to the notes table
import { supabase } from '../services/supabase';
import fs from 'fs';
import path from 'path';

const runMigration = async () => {
  try {
    console.log('Running migration to add reminder columns...');
    
    // Read the SQL file
    const sqlPath = path.join(process.cwd(), 'src', 'db', 'migrations', 'add_reminder_columns.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the SQL using Supabase's rpc call
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error('Migration failed:', error);
      return;
    }
    
    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Error running migration:', err);
  }
};

// Run the migration
runMigration();
