import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

console.log('Loading delete-workspace function...')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Get the workspace ID from the request
    const { workspaceId } = await req.json()
    if (!workspaceId) {
      throw new Error('No workspace ID provided')
    }

    // Verify the user's session
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )
    if (authError || !user) {
      throw new Error('Invalid session')
    }

    // Check if user is admin of the workspace
    const { data: memberData, error: memberError } = await supabase
      .from('workspace_members')
      .select('role')
      .eq('workspace_id', workspaceId)
      .eq('user_id', user.id)
      .single()

    if (memberError || !memberData || memberData.role !== 'admin') {
      throw new Error('User is not admin of this workspace')
    }

    // Delete workspace and related data
    const { error: deleteError } = await supabase
      .from('workspaces')
      .delete()
      .eq('id', workspaceId)

    if (deleteError) {
      throw deleteError
    }

    // Get remaining workspaces where user is admin
    const { data: remainingWorkspaces, error: workspacesError } = await supabase
      .from('workspaces')
      .select(`
        id,
        name,
        workspace_members!inner (
          role
        )
      `)
      .eq('workspace_members.user_id', user.id)
      .eq('workspace_members.role', 'admin')
      .order('created_at', { ascending: false })

    if (workspacesError) {
      throw workspacesError
    }

    return new Response(
      JSON.stringify({
        success: true,
        remainingWorkspaces: remainingWorkspaces || []
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})