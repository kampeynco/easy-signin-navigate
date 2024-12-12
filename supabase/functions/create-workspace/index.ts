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

    const { name, userId } = await req.json()
    console.log('Creating workspace:', { name, userId })

    if (!name || !userId) {
      throw new Error('Name and userId are required')
    }

    // Create workspace
    const { data: workspace, error: workspaceError } = await supabaseClient
      .from('workspaces')
      .insert([{ name }])
      .select()
      .single()

    if (workspaceError) {
      console.error('Error creating workspace:', workspaceError)
      throw workspaceError
    }

    console.log('Workspace created:', workspace)

    // Add user as admin member
    const { error: memberError } = await supabaseClient
      .from('workspace_members')
      .insert([{
        workspace_id: workspace.id,
        user_id: userId,
        role: 'admin'
      }])

    if (memberError) {
      console.error('Error adding workspace member:', memberError)
      throw memberError
    }

    console.log('Added user as workspace admin')

    return new Response(
      JSON.stringify({ workspace }),
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