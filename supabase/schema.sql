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
