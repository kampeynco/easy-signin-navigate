import { QueryClient } from "@tanstack/react-query"
import { AppProviders } from "@/components/providers/AppProviders"
import { AppRoutes } from "@/routes/AppRoutes"

const queryClient = new QueryClient()

const App = () => {
  console.log('App: Initializing...')
  
  return (
    <AppProviders queryClient={queryClient}>
      <AppRoutes />
    </AppProviders>
  )
}

export default App