import { Toaster } from '@/shared/ui/toaster'
import { AppProvider } from './app-provider'
import { AppRouter } from './providers/app-router'

function App() {
  return (
    <AppProvider>
      <AppRouter />
      <Toaster />
    </AppProvider>
  )
}

export default App
