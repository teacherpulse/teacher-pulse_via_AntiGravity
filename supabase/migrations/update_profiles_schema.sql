-- Add columns to profiles table to support parent mapping
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS work TEXT,
ADD COLUMN IF NOT EXISTS locality TEXT;
