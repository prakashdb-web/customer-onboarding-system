import { useState } from 'react'
import Navbar from './components/Navbar'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('onboarding')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="pt-20">
        {currentPage === 'onboarding' && <Onboarding setCurrentPage={setCurrentPage} />}
        {currentPage === 'dashboard' && <Dashboard />}
      </main>
    </div>
  )
}

export default App