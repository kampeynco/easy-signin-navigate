import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const GetStartedCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Let's Get Started!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-base mb-6">
          Easiest way to automate your repeating tasks. We bring together your
          favorite apps and tools into one place, so you can finish more work in
          less time.
        </p>
        <Button asChild className="bg-[#2B4079] hover:bg-[#1e2d54] text-white">
          <Link to="/create-workflow">Create Workflow</Link>
        </Button>
      </CardContent>
    </Card>
  )
}