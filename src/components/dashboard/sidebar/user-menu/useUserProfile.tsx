import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
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

      setUserProfile({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: user.email || ""
      })
    }

    fetchUserProfile()
  }, [])

  return userProfile
}