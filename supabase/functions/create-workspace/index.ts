import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

console.log('Loading create-workspace function...')

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

    // Get request body
    const { name, userId } = await req.json()
    
    if (!name || !userId) {
      throw new Error('Name and userId are required')
    }

    // Create workspace using the database function
    const { data, error } = await supabase.rpc('create_workspace_with_owner', {
      _workspace_name: name,
      _user_id: userId
    })

    if (error) throw error

    return new Response(
      JSON.stringify({ workspaceId: data }),
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