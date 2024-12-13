import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { useQueryClient } from "@tanstack/react-query"

export function DeleteWorkspaceCard() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { selectedWorkspace, setSelectedWorkspaceId } = useWorkspace()

  const handleDeleteWorkspace = async () => {
    try {
      if (!selectedWorkspace?.id) {
        throw new Error('No workspace selected')
      }

      const { data, error } = await supabase.functions.invoke('delete-workspace', {
        body: { workspaceId: selectedWorkspace.id }
      })

      if (error) throw error

      setSelectedWorkspaceId(null)
      await queryClient.invalidateQueries()

      if (data.remainingWorkspaces.length === 0) {
        navigate('/onboarding')
      } else {
        navigate('/dashboard')
      }

      toast({
        title: "Workspace deleted",
        description: "The workspace has been successfully deleted.",
      })
    } catch (error: any) {
      console.error('Error deleting workspace:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to delete workspace",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>
          Delete this workspace permanently. This action cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Workspace</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                workspace and remove all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteWorkspace}
                className="bg-destructive hover:bg-destructive/90"
              >
                Delete Workspace
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}