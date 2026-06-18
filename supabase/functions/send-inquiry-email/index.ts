import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = Deno.env.get("ADMIN_EMAIL") || "info@androinframind.com"; // Fallback email

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY environment variable.");
    }

    const body = await req.json();
    
    // Support both direct client invocations and Supabase database webhooks
    // Webhooks wrap the data in: { record: { ... }, type: 'INSERT', ... }
    let record = body;
    if (body.record && body.type === "INSERT") {
      record = body.record;
    }

    const {
      full_name,
      work_email,
      phone,
      company,
      service,
      budget,
      project_details,
    } = record;

    if (!full_name || !work_email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: full_name and work_email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Construct structured HTML email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Project Inquiry</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f9fafb; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 32px 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em; }
          .header p { margin: 8px 0 0 0; color: #94a3b8; font-size: 14px; }
          .content { padding: 32px 24px; }
          .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em; margin-bottom: 16px; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
          .field-group { margin-bottom: 16px; }
          .field-label { font-size: 12px; font-weight: 600; color: #4b5563; margin-bottom: 4px; }
          .field-value { font-size: 15px; color: #111827; background-color: #f9fafb; padding: 10px 12px; border-radius: 6px; border: 1px solid #f3f4f6; }
          .details-box { background-color: #f9fafb; border: 1px solid #f3f4f6; border-radius: 8px; padding: 16px; font-size: 15px; color: #1f2937; white-space: pre-wrap; margin-top: 8px; }
          .footer { background: #f9fafb; padding: 16px 24px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Project Inquiry</h1>
            <p>Received from the AndroInfraMind website contact form</p>
          </div>
          <div class="content">
            <div class="section-title">Client Information</div>
            
            <div class="field-group">
              <div class="field-label">Full Name</div>
              <div class="field-value">${full_name}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Work Email</div>
              <div class="field-value"><a href="mailto:${work_email}" style="color: #2563eb; text-decoration: none;">${work_email}</a></div>
            </div>

            <div class="field-group">
              <div class="field-label">Phone Number</div>
              <div class="field-value">${phone || "Not Provided"}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Company</div>
              <div class="field-value">${company || "Not Provided"}</div>
            </div>

            <div class="section-title" style="margin-top: 32px;">Project Scope & Budget</div>

            <div class="field-group">
              <div class="field-label">Selected Service</div>
              <div class="field-value" style="font-weight: 600; color: #0f172a;">${service}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Estimated Budget</div>
              <div class="field-value" style="font-weight: 600; color: #059669; background-color: #ecfdf5; border-color: #a7f3d0;">${budget}</div>
            </div>

            <div class="section-title" style="margin-top: 32px;">Project Details</div>
            <div class="details-box">${project_details}</div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} AndroInfraMind. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Acme <onboarding@resend.dev>", // Or your verified sending domain
        to: TO_EMAIL,
        subject: `New Project Inquiry Received - ${service}`,
        html: htmlContent,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(`Resend API returned error: ${JSON.stringify(resData)}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully", data: resData }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
