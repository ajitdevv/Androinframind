const url = 'https://lonndwanpxrkysbxgqcy.supabase.co/functions/v1/send-inquiry-email';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvbm5kd2FucHhya3lzYnhncWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NjA1MTIsImV4cCI6MjA5NzMzNjUxMn0.TupltngvEqUvVtov1Lc94sbipxE-1CZAEvqLnzPIDOM';

const body = {
  full_name: 'Test Email Diagnostics',
  work_email: 'test@diagnostics.com',
  service: 'Web Development',
  budget: '$5,000 - $15,000',
  project_details: 'Testing Resend email trigger function.'
};

fetch(url, {
  method: 'POST',
  headers: {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
})
.then(async res => {
  console.log('Status Code:', res.status);
  console.log('Status Text:', res.statusText);
  try {
    const json = await res.json();
    console.log('Response JSON:', JSON.stringify(json, null, 2));
  } catch (e) {
    const text = await res.text();
    console.log('Response Text:', text);
  }
})
.catch(err => {
  console.error('Fetch Error:', err);
});
