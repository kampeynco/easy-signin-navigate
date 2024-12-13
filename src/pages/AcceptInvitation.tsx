import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useSession } from "@supabase/auth-helpers-react"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const navigate = useNavigate()
  const session = useSession()
  const { toast } = useToast()
  const [invitation, setInvitation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState(false)

  useEffect(() => {
    const fetchInvitation = async () => {
      if (!token) {
        toast({
          title: "Invalid invitation",
          description: "No invitation token provided.",
          variant: "destructive",
        })
        navigate("/")
        return
      }

      const { data, error } = await supabase
        .from("workspace_invitations")
        .select(`
          *,
          workspace:workspaces(name),
          inviter:profiles!invited_by(first_name, last_name)
        `)
        .eq("id", token)
        .single()

      if (error || !data) {
        toast({
          title: "Invalid invitation",
          description: "This invitation doesn't exist or has expired.",
          variant: "destructive",
        })
        navigate("/")
        return
      }

      if (data.status !== "pending") {
        toast({
          title: "Invalid invitation",
          description: "This invitation has already been used or has expired.",
          variant: "destructive",
        })
        navigate("/")
        return
      }

      setInvitation(data)
      setLoading(false)
    }

    fetchInvitation()
  }, [token, navigate, toast])

  const handleAcceptInvitation = async () => {
    if (!session || !invitation) return

    setAccepting(true)
    try {
      // Add user to workspace members
      const { error: memberError } = await supabase
        .from("workspace_members")
        .insert({
          workspace_id: invitation.workspace_id,
          user_id: session.user.id,
          role: invitation.role,
        })

      if (memberError) throw memberError

      // Update invitation status
      const { error: invitationError } = await supabase
        .from("workspace_invitations")
        .update({ status: "accepted" })
        .eq("id", invitation.id)

      if (invitationError) throw invitationError

      toast({
        title: "Success",
        description: "You have successfully joined the workspace.",
      })

      navigate("/workspace-settings")
    } catch (error: any) {
      console.error("Error accepting invitation:", error)
      toast({
        title: "Error",
        description: "Failed to accept invitation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAccepting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading invitation...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md space-y-6 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Workspace Invitation</h1>
          <p className="mt-2 text-muted-foreground">
            You've been invited to join{" "}
            <span className="font-medium">{invitation.workspace.name}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Invited by{" "}
            <span className="font-medium">
              {invitation.inviter.first_name} {invitation.inviter.last_name}
            </span>
          </p>
        </div>

        <div className="space-y-4">
          {!session ? (
            <div className="text-center">
              <p className="mb-4">Please sign in to accept this invitation</p>
              <Button onClick={() => navigate("/signin")}>Sign In</Button>
            </div>
          ) : (
            <Button
              className="w-full"
              onClick={handleAcceptInvitation}
              disabled={accepting}
            >
              {accepting ? "Accepting..." : "Accept Invitation"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AcceptInvitation