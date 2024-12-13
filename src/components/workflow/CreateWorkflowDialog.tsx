import { useState } from "react"
import { useForm } from "react-hook-form"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useQueryClient } from "@tanstack/react-query"

interface CreateWorkflowDialogProps {
  children: React.ReactNode
}

interface FormData {
  name: string
}

export function CreateWorkflowDialog({ children }: CreateWorkflowDialogProps) {
  const [open, setOpen] = useState(false)
  const { selectedWorkspace } = useWorkspace()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    if (!selectedWorkspace) return

    try {
      const { error } = await supabase
        .from('workflows')
        .insert({
          name: data.name,
          workspace_id: selectedWorkspace.id,
        })

      if (error) throw error

      toast({
        title: "Success",
        description: "Workflow created successfully",
      })

      // Reset form and close dialog
      form.reset()
      setOpen(false)
      
      // Invalidate workflows query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['workflows'] })
    } catch (error) {
      console.error('Error creating workflow:', error)
      toast({
        title: "Error",
        description: "Failed to create workflow",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workflow Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workflow name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Create Workflow</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}