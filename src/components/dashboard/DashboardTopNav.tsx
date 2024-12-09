import { UserMenu } from "./sidebar/UserMenu"

export function DashboardTopNav() {
  return (
    <header className="absolute top-0 left-0 right-0 h-16 border-b bg-background flex items-center px-8">
      <div className="ml-auto">
        <UserMenu />
      </div>
    </header>
  )
}