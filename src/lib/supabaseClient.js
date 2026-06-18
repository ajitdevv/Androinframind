import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

export async function saveLead(lead) {
  try {
    if (supabaseUrl.includes('placeholder-project')) {
      saveToLocal('andro_leads', lead);
      return { success: true };
    }

    const { error } = await supabase.from('leads').insert([lead]);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.warn('Supabase insert failed, falling back to localStorage:', getErrorMessage(error));
    saveToLocal('andro_leads', lead);
    return { success: true };
  }
}

export async function saveContact(contact) {
  try {
    if (supabaseUrl.includes('placeholder-project')) {
      saveToLocal('andro_contacts', contact);
      return { success: true };
    }

    const { data, error } = await supabase.from('contacts').insert([contact]).select();
    if (error) throw error;

    // Optional direct trigger (if Database Webhook is not configured)
    try {
      await supabase.functions.invoke('send-inquiry-email', {
        body: contact,
      });
    } catch (funcErr) {
      console.warn('Edge function invocation skipped/failed:', funcErr);
    }

    return { success: true, data };
  } catch (error) {
    console.warn('Supabase contact insert failed, falling back to localStorage:', getErrorMessage(error));
    saveToLocal('andro_contacts', contact);
    return { success: true };
  }
}

export async function saveSubscription(sub) {
  try {
    if (supabaseUrl.includes('placeholder-project')) {
      saveToLocal('andro_subscriptions', sub);
      return { success: true };
    }

    const { error } = await supabase.from('subscriptions').insert([sub]);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.warn('Supabase subscribe failed, falling back to localStorage:', getErrorMessage(error));
    saveToLocal('andro_subscriptions', sub);
    return { success: true };
  }
}

function saveToLocal(key, data) {
  const raw = localStorage.getItem(key);
  const existing = raw ? JSON.parse(raw) : [];
  existing.push({ ...data, timestamp: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(existing));
}

export async function fetchProjects() {
  try {
    if (supabaseUrl.includes('placeholder-project')) return { success: false, data: [] };
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function saveProject(project) {
  try {
    if (supabaseUrl.includes('placeholder-project')) return { success: false };
    const { data, error } = await supabase.from('projects').upsert([project]).select();
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving project:', error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function deleteProject(id) {
  try {
    if (supabaseUrl.includes('placeholder-project')) return { success: false };
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function fetchBlogs() {
  try {
    if (supabaseUrl.includes('placeholder-project')) return { success: false, data: [] };
    const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function saveBlog(blog) {
  try {
    if (supabaseUrl.includes('placeholder-project')) return { success: false };
    const { data, error } = await supabase.from('blogs').upsert([blog]).select();
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving blog:', error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function deleteBlog(id) {
  try {
    if (supabaseUrl.includes('placeholder-project')) return { success: false };
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog:', error);
    return { success: false, error: getErrorMessage(error) };
  }
}

