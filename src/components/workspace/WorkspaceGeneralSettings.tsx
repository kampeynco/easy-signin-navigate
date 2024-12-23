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
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

interface WorkspaceFormData {
  name: string
  description: string
}

export function WorkspaceGeneralSettings() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { selectedWorkspace, setSelectedWorkspaceId } = useWorkspace()
  
  const form = useForm<WorkspaceFormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  })

  useEffect(() => {
    if (selectedWorkspace) {
      form.reset({
        name: selectedWorkspace.name,
        description: selectedWorkspace.description || "",
      })
    }
  }, [selectedWorkspace, form])

  const onSubmit = async (data: WorkspaceFormData) => {
    if (!selectedWorkspace?.id) return

    try {
      const { error } = await supabase
        .from('workspaces')
        .update({
          name: data.name,
          description: data.description,
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedWorkspace.id)

      if (error) throw error

      await queryClient.invalidateQueries()

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
    if (!selectedWorkspace?.id) return

    try {
      const { error } = await supabase
        .from('workspaces')
        .delete()
        .eq('id', selectedWorkspace.id)

      if (error) throw error

      setSelectedWorkspaceId(null)
      await queryClient.invalidateQueries()
      navigate('/dashboard')

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

  if (!selectedWorkspace) {
    return null
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