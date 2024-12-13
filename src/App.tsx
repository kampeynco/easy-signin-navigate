import { QueryClient } from "@tanstack/react-query"
import { AppProviders } from "@/components/providers/AppProviders"
import { AppRoutes } from "@/routes/AppRoutes"

// Configure QueryClient with optimal settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  console.log('App: Initializing...')
  
  return (
    <AppProviders queryClient={queryClient}>
      <AppRoutes />
    </AppProviders>
  )
}

export default App