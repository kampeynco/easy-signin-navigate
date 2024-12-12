import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the user ID from the authorization header
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1]
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Verify the user's session
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader)
    if (authError || !user) {
      throw new Error('Invalid session')
    }

    console.log('Fetching workspaces for user:', user.id)

    // Get user's workspaces through workspace_members table
    const { data: workspaces, error: queryError } = await supabaseClient
      .from('workspace_members')
      .select(`
        workspace_id,
        role,
        workspaces (
          id,
          name,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { foreignTable: 'workspaces', ascending: false })

    if (queryError) {
      console.error('Error fetching workspaces:', queryError)
      throw queryError
    }

    // Transform the data to match our Workspace type
    const transformedWorkspaces = workspaces.map(wm => ({
      id: wm.workspaces.id,
      name: wm.workspaces.name,
      created_at: wm.workspaces.created_at,
      updated_at: wm.workspaces.updated_at,
      role: wm.role
    }))

    console.log('Successfully fetched workspaces:', transformedWorkspaces)

    return new Response(
      JSON.stringify({ workspaces: transformedWorkspaces }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})