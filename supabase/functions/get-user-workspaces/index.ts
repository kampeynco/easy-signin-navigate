import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

console.log('Loading get-user-workspaces function...')

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Get the user's session
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )
    
    if (authError || !user) {
      throw new Error('Invalid session')
    }

    // Get user's workspaces with their roles
    const { data: workspaces, error: workspacesError } = await supabase
      .from('workspaces')
      .select(`
        id,
        name,
        description,
        created_at,
        workspace_members!inner (
          role
        )
      `)
      .eq('workspace_members.user_id', user.id)
      .order('created_at', { ascending: false })

    if (workspacesError) {
      throw workspacesError
    }

    // Transform the data to include the role directly in the workspace object
    const transformedWorkspaces = workspaces.map(workspace => ({
      id: workspace.id,
      name: workspace.name,
      description: workspace.description,
      created_at: workspace.created_at,
      role: workspace.workspace_members[0].role
    }))

    return new Response(
      JSON.stringify({ workspaces: transformedWorkspaces }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})