export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">CO</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Customer Onboarding</h1>
        </div>

        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentPage('onboarding')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === 'onboarding' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === 'dashboard' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  )
}