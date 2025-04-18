-- Insert test companies
INSERT INTO public.companies (name, subscription_status)
VALUES 
  ('Acme Corporation', 'active'),
  ('TechStart Inc', 'trial'),
  ('Global Solutions', 'active');

-- Insert test skills
INSERT INTO public.skills (name, category, description)
VALUES 
  ('JavaScript', 'Programming', 'JavaScript programming language'),
  ('React', 'Frontend', 'React.js framework'),
  ('Node.js', 'Backend', 'Node.js runtime environment'),
  ('TypeScript', 'Programming', 'TypeScript programming language'),
  ('Python', 'Programming', 'Python programming language'),
  ('SQL', 'Database', 'Structured Query Language'),
  ('Project Management', 'Management', 'Project management skills'),
  ('Team Leadership', 'Management', 'Team leadership and management'),
  ('Communication', 'Soft Skills', 'Effective communication skills'),
  ('Problem Solving', 'Soft Skills', 'Analytical and problem-solving abilities');

-- Note: To insert profiles and employee_skills, you'll need to:
-- 1. Create users through Supabase Auth first
-- 2. Get their user IDs
-- 3. Then run the following SQL (replace the UUIDs with actual user IDs):

-- Example (uncomment and modify after creating users):
/*
-- Insert test profiles
INSERT INTO public.profiles (id, email, full_name, company_id, role)
VALUES 
  ('user-uuid-1', 'admin@acme.com', 'Admin User', (SELECT id FROM companies WHERE name = 'Acme Corporation'), 'admin'),
  ('user-uuid-2', 'manager@acme.com', 'Manager User', (SELECT id FROM companies WHERE name = 'Acme Corporation'), 'manager'),
  ('user-uuid-3', 'employee@acme.com', 'Employee User', (SELECT id FROM companies WHERE name = 'Acme Corporation'), 'employee');

-- Insert test employee skills
INSERT INTO public.employee_skills (employee_id, skill_id, proficiency_level, verified)
VALUES 
  ('user-uuid-1', (SELECT id FROM skills WHERE name = 'JavaScript'), 5, true),
  ('user-uuid-1', (SELECT id FROM skills WHERE name = 'React'), 4, true),
  ('user-uuid-2', (SELECT id FROM skills WHERE name = 'Project Management'), 5, true),
  ('user-uuid-2', (SELECT id FROM skills WHERE name = 'Team Leadership'), 4, true),
  ('user-uuid-3', (SELECT id FROM skills WHERE name = 'Python'), 3, false),
  ('user-uuid-3', (SELECT id FROM skills WHERE name = 'SQL'), 3, false);
*/ 