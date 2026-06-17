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
