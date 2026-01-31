-- Enable RLS (just in case)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE (anon and authenticated) to insert/select/update students
-- In a real app, you'd restrict this to authenticated users or teachers
CREATE POLICY "Allow public access to students" ON students
FOR ALL USING (true) WITH CHECK (true);

-- Allow ANYONE to read profiles (needed for dropdown)
CREATE POLICY "Allow public read access to profiles" ON profiles
FOR SELECT USING (true);

-- Allow ANYONE to update profiles (needed for parent profile sync)
CREATE POLICY "Allow public update access to profiles" ON profiles
FOR UPDATE USING (true) WITH CHECK (true);
