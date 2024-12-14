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
    // Validate environment variables
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return new Response(
        JSON.stringify({ error: 'Missing RESEND_API_KEY configuration' }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase configuration')
      return new Response(
        JSON.stringify({ error: 'Missing Supabase configuration' }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parse and validate request body
    let requestBody: InvitationEmailRequest
    try {
      requestBody = await req.json()
      console.log('Received request body:', requestBody)

      if (!requestBody.invitationId || !requestBody.workspaceName || !requestBody.invitedByEmail) {
        const missingFields = []
        if (!requestBody.invitationId) missingFields.push('invitationId')
        if (!requestBody.workspaceName) missingFields.push('workspaceName')
        if (!requestBody.invitedByEmail) missingFields.push('invitedByEmail')
        
        console.error('Missing required fields:', missingFields)
        return new Response(
          JSON.stringify({ 
            error: 'Missing required fields', 
            details: `Missing fields: ${missingFields.join(', ')}` 
          }), 
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
    } catch (error) {
      console.error('Error parsing request body:', error)
      return new Response(
        JSON.stringify({ error: 'Invalid request body', details: error.message }), 
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Creating Supabase client...')
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    
    console.log('Fetching invitation details...')
    // Get invitation details
    const { data: invitation, error: invitationError } = await supabase
      .from('workspace_invitations')
      .select('email, token')
      .eq('id', requestBody.invitationId)
      .single()

    if (invitationError) {
      console.error('Error fetching invitation:', invitationError)
      return new Response(
        JSON.stringify({ error: 'Invitation not found', details: invitationError }), 
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!invitation) {
      console.error('No invitation found')
      return new Response(
        JSON.stringify({ error: 'Invitation not found' }), 
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Found invitation:', invitation)

    // Use the custom domain for the accept invitation URL
    const acceptUrl = `https://dev.kampeyn.com/accept-invitation?token=${invitation.token}`
    console.log('Accept URL:', acceptUrl)

    // Using the verified domain kampeyn.com
    const fromEmail = 'workspace@kampeyn.com'
    
    console.log('Sending email via Resend...')
    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `${requestBody.workspaceName} <${fromEmail}>`,
        to: [invitation.email],
        subject: `You've been invited to join ${requestBody.workspaceName}`,
        html: `
          <h2>Workspace Invitation</h2>
          <p>You've been invited by ${requestBody.invitedByEmail} to join ${requestBody.workspaceName}.</p>
          <p>Click the link below to accept the invitation:</p>
          <a href="${acceptUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Accept Invitation</a>
          <p>Or copy and paste this URL into your browser:</p>
          <p>${acceptUrl}</p>
          <p>This invitation link will expire in 7 days.</p>
          <p>If you didn't expect this invitation, you can safely ignore this email.</p>
        `,
      }),
    })

    const responseData = await emailResponse.json()
    console.log('Resend API response:', responseData)

    if (!emailResponse.ok) {
      console.error('Error sending email:', responseData)
      return new Response(
        JSON.stringify({ error: 'Failed to send invitation email', details: responseData }), 
        { 
          status: emailResponse.status,
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