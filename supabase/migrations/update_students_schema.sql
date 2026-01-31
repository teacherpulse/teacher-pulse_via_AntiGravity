-- Add missing columns to students table
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS admission_number TEXT,
ADD COLUMN IF NOT EXISTS age_group TEXT,
ADD COLUMN IF NOT EXISTS parent_name TEXT,
ADD COLUMN IF NOT EXISTS parent_contact_number TEXT,
ADD COLUMN IF NOT EXISTS locality TEXT, -- Urban, Semi-Urban, Rural
ADD COLUMN IF NOT EXISTS parent_work TEXT,
ADD COLUMN IF NOT EXISTS gender TEXT, -- Male, Female, Other
ADD COLUMN IF NOT EXISTS parent_gender TEXT; -- Male, Female, Other

-- Optional: Link to parent profile if robust mapping is desired, but denormalization is fine for now
-- ALTER TABLE students ADD COLUMN IF NOT EXISTS parent_profile_id UUID REFERENCES profiles(id);
