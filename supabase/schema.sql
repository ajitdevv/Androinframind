-- Create contacts table for project inquiries
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    work_email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service TEXT NOT NULL,
    budget TEXT NOT NULL,
    project_details TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public submission of the contact form)
CREATE POLICY "Allow anonymous insert access" 
ON public.contacts 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow authenticated users (admin) to read submissions
CREATE POLICY "Allow authenticated read access" 
ON public.contacts 
FOR SELECT 
TO authenticated 
USING (true);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    desc_text TEXT NOT NULL,
    badge TEXT NOT NULL,
    features TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects
CREATE POLICY "Allow public read access to projects"
ON public.projects FOR SELECT USING (true);

-- Allow authenticated users (admin) to manage projects
CREATE POLICY "Allow admin to manage projects"
ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    tag TEXT NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    author TEXT NOT NULL,
    date_text TEXT NOT NULL,
    read_time TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for blogs
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to blogs
CREATE POLICY "Allow public read access to blogs"
ON public.blogs FOR SELECT USING (true);

-- Allow authenticated users (admin) to manage blogs
CREATE POLICY "Allow admin to manage blogs"
ON public.blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);

