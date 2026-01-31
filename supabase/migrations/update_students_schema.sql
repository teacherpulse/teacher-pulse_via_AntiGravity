-- Add missing columns to students table
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS admission_number TEXT,
ADD COLUMN IF NOT EXISTS age_group TEXT,
ADD COLUMN IF NOT EXISTS parent_name TEXT,
ADD COLUMN IF NOT EXISTS parent_contact_number TEXT,
ADD COLUMN IF NOT EXISTS locality TEXT, -- Urban, Semi-Urban, Rural
ADD COLUMN IF NOT EXISTS parent_work TEXT;

-- Optional: Link to parent profile if robust mapping is desired, but denormalization is fine for now
-- ALTER TABLE students ADD COLUMN IF NOT EXISTS parent_profile_id UUID REFERENCES profiles(id);

-- Ensure RLS (Row Level Security) allows read/write if not already set
-- (Assuming existing policy covers it, checking strictly columns here)
