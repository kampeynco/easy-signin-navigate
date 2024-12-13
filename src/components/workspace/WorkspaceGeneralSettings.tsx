import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspaces } from "@/hooks/useWorkspaces"
import { useSession } from "@supabase/auth-helpers-react"
import { useEffect } from "react"

interface WorkspaceFormData {
  name: string
  description: string
}

export function WorkspaceGeneralSettings() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const session = useSession()
  const { data: workspaces, refetch } = useWorkspaces(session?.user?.id)
  const currentWorkspace = workspaces?.[0]
  
  const form = useForm<WorkspaceFormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  })

  // Update form values when currentWorkspace changes
  useEffect(() => {
    if (currentWorkspace) {
      form.reset({
        name: currentWorkspace.name,
        description: currentWorkspace.description || "",
      })
    }
  }, [currentWorkspace, form])

  const onSubmit = async (data: WorkspaceFormData) => {
    if (!currentWorkspace?.id) return

    try {
      const { error } = await supabase
        .from('workspaces')
        .update({
          name: data.name,
          description: data.description,
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentWorkspace.id)

      if (error) throw error

      await refetch()

      toast({
        title: "Settings updated",
        description: "Your workspace settings have been updated successfully.",
      })
    } catch (error) {
      console.error('Error updating workspace:', error)
      toast({
        title: "Error",
        description: "Failed to update workspace settings",
        variant: "destructive",
      })
    }
  }

  const handleDeleteWorkspace = async () => {
    try {
      if (!currentWorkspace?.id) {
        throw new Error('No workspace selected')
      }

      const { data, error } = await supabase.functions.invoke('delete-workspace', {
        body: { workspaceId: currentWorkspace.id }
      })

      if (error) throw error

      if (data.remainingWorkspaces.length === 0) {
        // If no workspaces left, redirect to onboarding
        navigate('/onboarding')
      } else {
        // If workspaces remain, refresh the workspace list and navigate to dashboard
        await refetch()
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>
            Update your workspace name and description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your workspace's visible name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Brief description of your workspace
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

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
    </div>
  )
}