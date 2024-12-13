import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface InvitationEmailRequest {
  invitationId: string
  workspaceName: string
  invitedByEmail: string
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Processing invitation email request')

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      throw new Error('Missing RESEND_API_KEY configuration')
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)
    const { invitationId, workspaceName, invitedByEmail }: InvitationEmailRequest = await req.json()

    console.log('Fetching invitation details:', { invitationId, workspaceName, invitedByEmail })

    // Get invitation details
    const { data: invitation, error: invitationError } = await supabase
      .from('workspace_invitations')
      .select('email, token')
      .eq('id', invitationId)
      .single()

    if (invitationError || !invitation) {
      console.error('Error fetching invitation:', invitationError)
      return new Response(
        JSON.stringify({ error: 'Invitation not found' }), 
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Found invitation:', invitation)

    // Construct the accept invitation URL
    const acceptUrl = `${req.headers.get('origin')}/accept-invitation?token=${invitation.token}`

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Workspace <onboarding@resend.dev>',
        to: [invitation.email],
        subject: `You've been invited to join ${workspaceName}`,
        html: `
          <h2>Workspace Invitation</h2>
          <p>You've been invited by ${invitedByEmail} to join ${workspaceName}.</p>
          <p>Click the link below to accept the invitation:</p>
          <a href="${acceptUrl}">Accept Invitation</a>
          <p>This invitation link will expire in 7 days.</p>
        `,
      }),
    })

    const responseData = await res.json()
    console.log('Resend API response:', responseData)

    if (!res.ok) {
      console.error('Error sending email:', responseData)
      return new Response(
        JSON.stringify({ error: 'Failed to send invitation email', details: responseData }), 
        { 
          status: res.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({ success: true, data: responseData }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error: any) {
    console.error('Error in send-invitation-email function:', error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
}

serve(handler)