import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSession } from "@supabase/auth-helpers-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

const formSchema = z.object({
  name: z.string().min(1, "Workspace name is required").max(50),
})

export function CreateWorkspaceDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const session = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!session?.user?.id) {
        throw new Error("No user found")
      }

      // Insert the workspace
      const { data: workspace, error: workspaceError } = await supabase
        .from("workspaces")
        .insert([{ name: values.name }])
        .select()
        .single()

      if (workspaceError) throw workspaceError

      // Add the creator as an admin member
      const { error: memberError } = await supabase
        .from("workspace_members")
        .insert([
          {
            workspace_id: workspace.id,
            user_id: session.user.id,
            role: "admin",
          },
        ])

      if (memberError) throw memberError

      toast({
        title: "Success",
        description: "Workspace created successfully",
      })
      
      setOpen(false)
      form.reset()
    } catch (error) {
      console.error("Error creating workspace:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create workspace. Please try again.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Create New Workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your workflows and team members.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Workspace" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create Workspace
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}