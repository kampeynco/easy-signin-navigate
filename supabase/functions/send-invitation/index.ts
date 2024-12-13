import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  invitationId: string;
  workspaceName: string;
  toEmail: string;
  inviterName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const { invitationId, workspaceName, toEmail, inviterName }: InvitationRequest = await req.json();

    // Create invitation acceptance URL
    const acceptUrl = `${req.headers.get("origin")}/accept-invitation?token=${invitationId}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Workspace Invitations <onboarding@resend.dev>",
        to: [toEmail],
        subject: `You've been invited to join ${workspaceName}`,
        html: `
          <h2>Workspace Invitation</h2>
          <p>Hello,</p>
          <p>${inviterName} has invited you to join the workspace "${workspaceName}".</p>
          <p>Click the link below to accept the invitation:</p>
          <p><a href="${acceptUrl}">Accept Invitation</a></p>
          <p>This invitation will expire in 7 days.</p>
          <p>If you don't want to accept this invitation, you can ignore this email.</p>
        `,
      }),
    });

    const data = await res.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending invitation email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);