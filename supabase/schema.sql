-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
-- Matches Supabase auth.users
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  role text default 'teacher' check (role in ('admin', 'teacher')),
  department text,
  joining_date date,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for Profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- EVALUATIONS TABLE
create table evaluations (
  id uuid default uuid_generate_v4() primary key,
  teacher_id uuid references profiles(id) not null,
  evaluator_id uuid references profiles(id) not null,
  term text not null,
  evaluation_date date default now(),
  status text default 'draft' check (status in ('draft', 'published')),
  overall_score numeric(4, 2), -- e.g. 3.50
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for Evaluations
alter table evaluations enable row level security;
create policy "Admins can do anything with evaluations" on evaluations for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Teachers can view their own evaluations" on evaluations for select using (
  teacher_id = auth.uid() and status = 'published'
);


-- MODULE 1: CLASSROOM TEACHING MASTERY
create table module_classroom_teaching_mastery (
  id uuid default uuid_generate_v4() primary key,
  evaluation_id uuid references evaluations(id) on delete cascade unique,
  criteria_scores jsonb default '{}'::jsonb, -- Store scores for specific criteria
  feedback text,
  module_score numeric(4, 2)
);

-- MODULE 2: CORRECTION QUALITY INDEX
create table module_correction_quality_index (
  id uuid default uuid_generate_v4() primary key,
  evaluation_id uuid references evaluations(id) on delete cascade unique,
  criteria_scores jsonb default '{}'::jsonb,
  feedback text,
  module_score numeric(4, 2)
);

-- MODULE 3: LEARNING TOOLS OPTIMIZATION
create table module_learning_tools_optimization (
  id uuid default uuid_generate_v4() primary key,
  evaluation_id uuid references evaluations(id) on delete cascade unique,
  criteria_scores jsonb default '{}'::jsonb,
  feedback text,
  module_score numeric(4, 2)
);

-- MODULE 4: PROFESSIONAL INTEGRITY & EXCELLENCE
create table module_professional_integrity_excellence (
  id uuid default uuid_generate_v4() primary key,
  evaluation_id uuid references evaluations(id) on delete cascade unique,
  criteria_scores jsonb default '{}'::jsonb,
  feedback text,
  module_score numeric(4, 2)
);

-- Enable RLS for Modules (Inherit check from evaluation potentially, or just Admin/Teacher rules)
-- Simple rule: Admin all, Teacher view linked evaluation
alter table module_classroom_teaching_mastery enable row level security;
create policy "Module 1 Admin" on module_classroom_teaching_mastery for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Module 1 Teacher" on module_classroom_teaching_mastery for select using (
  exists (select 1 from evaluations e where e.id = evaluation_id and e.teacher_id = auth.uid() and e.status = 'published')
);

-- Repeat for other modules (Simplified for brevity, but needed in prod)
alter table module_correction_quality_index enable row level security;
create policy "Module 2 Admin" on module_correction_quality_index for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Module 2 Teacher" on module_correction_quality_index for select using (
  exists (select 1 from evaluations e where e.id = evaluation_id and e.teacher_id = auth.uid() and e.status = 'published')
);

alter table module_learning_tools_optimization enable row level security;
create policy "Module 3 Admin" on module_learning_tools_optimization for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Module 3 Teacher" on module_learning_tools_optimization for select using (
  exists (select 1 from evaluations e where e.id = evaluation_id and e.teacher_id = auth.uid() and e.status = 'published')
);

alter table module_professional_integrity_excellence enable row level security;
create policy "Module 4 Admin" on module_professional_integrity_excellence for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
  exists (select 1 from evaluations e where e.id = evaluation_id and e.teacher_id = auth.uid() and e.status = 'published')
);

-- MODULE 5: ALMF (HODs)
create table module_almf (
  id uuid default uuid_generate_v4() primary key,
  evaluation_id uuid references evaluations(id) on delete cascade unique,
  criteria_scores jsonb default '{}'::jsonb,
  feedback text,
  module_score numeric(4, 2)
);

alter table module_almf enable row level security;
create policy "Module 5 Admin" on module_almf for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Module 5 Teacher" on module_almf for select using (
  exists (select 1 from evaluations e where e.id = evaluation_id and e.teacher_id = auth.uid() and e.status = 'published')
);
