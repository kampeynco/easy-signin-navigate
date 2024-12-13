import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav"
import { ProfileForm } from "@/components/profile/ProfileForm"
import { DeleteAccountCard } from "@/components/profile/DeleteAccountCard"
import { supabase } from "@/integrations/supabase/client"

const ProfileSettings = () => {
  const [profile, setProfile] = useState<{ 
    firstName: string; 
    lastName: string;
    email: string;
  } | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }

      setProfile({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: user.email || ""
      })
    }

    fetchProfile()
  }, [])

  return (
    <div className="flex-1 relative">
      <DashboardTopNav />
      <div className="p-8 pt-24 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your personal information and account settings.
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile && <ProfileForm initialData={profile} />}
              </CardContent>
            </Card>

            <DeleteAccountCard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfileSettings