-- Create tables in correct order to handle dependencies
create table public.companies (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  logo_url text,
  subscription_status text default 'trial'::text not null
);

create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null,
  full_name text,
  avatar_url text,
  company_id uuid references public.companies on delete set null,
  role text
);

create table public.skills (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  category text not null,
  description text
);

create table public.employee_skills (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  employee_id uuid references public.profiles on delete cascade not null,
  skill_id uuid references public.skills on delete cascade not null,
  proficiency_level integer not null check (proficiency_level between 1 and 5),
  verified boolean default false not null
);

-- Create jobs table
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  company text not null,
  location text not null,
  description text not null,
  requirements text[] not null,
  salary_min integer,
  salary_max integer,
  job_type text not null,
  experience_level text not null,
  posted_by uuid references public.profiles on delete cascade not null,
  status text default 'active' not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.skills enable row level security;
alter table public.employee_skills enable row level security;
alter table public.jobs enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
on public.profiles for select
using (true);

create policy "Users can update their own profile"
on public.profiles for update
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Companies are viewable by everyone"
on public.companies for select
using (true);

create policy "Company admins can update their company"
on public.companies for update
using (
  exists (
    select 1 from public.profiles
    where profiles.company_id = companies.id
    and profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

create policy "Skills are viewable by everyone"
on public.skills for select
using (true);

create policy "Employee skills are viewable by company members"
on public.employee_skills for select
using (
  exists (
    select 1 from public.profiles
    where profiles.id = employee_skills.employee_id
    and profiles.company_id = (
      select company_id from public.profiles
      where id = auth.uid()
    )
  )
);

create policy "Users can update their own skills"
on public.employee_skills for update
using (employee_id = auth.uid());

create policy "Users can insert their own skills"
on public.employee_skills for insert
with check (employee_id = auth.uid());

create policy "Jobs are viewable by everyone"
on public.jobs for select
using (true);

create policy "Users can create jobs"
on public.jobs for insert
with check (auth.uid() = posted_by);

create policy "Users can update their own jobs"
on public.jobs for update
using (auth.uid() = posted_by);

create policy "Users can delete their own jobs"
on public.jobs for delete
using (auth.uid() = posted_by);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger handle_companies_updated_at
  before update on public.companies
  for each row
  execute function public.handle_updated_at();

create trigger handle_skills_updated_at
  before update on public.skills
  for each row
  execute function public.handle_updated_at();

create trigger handle_employee_skills_updated_at
  before update on public.employee_skills
  for each row
  execute function public.handle_updated_at();

create trigger handle_jobs_updated_at
  before update on public.jobs
  for each row
  execute function public.handle_updated_at(); 