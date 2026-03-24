import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CustomerTable from '../Components/CustomerTable'
import { apiService } from '../services/api'

export default function Dashboard() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ total:   0, today: 0 })

  useEffect(() => { loadCustomers() }, [])

  const loadCustomers = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await apiService.getAllCustomers()
      if (response.success) {
        setCustomers(response.data || [])
        updateStats(response.data || [])
      } else { setError(response.message || 'Failed to load customers') }
    } catch (err) { setError(err.message || 'An error occurred while loading customers') }
    finally { setLoading(false) }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) { loadCustomers(); return }
    setLoading(true)
    setError('')
    try {
      const response = await apiService.searchCustomers(searchQuery)
      if (response.success) setCustomers(response.data || [])
      else setError(response.message || 'No customers found')
    } catch (err) { setError(err.message || 'Search failed') }
    finally { setLoading(false) }
  }

 const updateStats = (data) => {
  setStats({
    total: data.length,
    today: data.filter(c => {
      const dateField = c.created_at || c.createdAt
      return dateField && new Date(dateField).toDateString() === new Date().toDateString()
    }).length   // ← add .length here
  })
}

const filteredCustomers = searchQuery.trim()
  ? customers.filter(c =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mobile?.includes(searchQuery) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : customers

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Customer Dashboard</h1>
          <p className="text-gray-600">Manage and view all registered customers</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Customers</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">{stats.total}</p>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">👥</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Added Today</p>
                <p className="text-4xl font-bold text-green-600 mt-2">{stats.today}</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl">✨</div>
            </div>
          </motion.div>
        </div>

        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} onSubmit={handleSearch} className="mb-8 flex gap-4">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name, mobile, or email..." className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" />
          <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200">Search</button>
          <button type="button" onClick={() => { setSearchQuery(''); loadCustomers() }} className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200">Reset</button>
        </motion.form>

        {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-100 border-2 border-red-500 rounded-lg text-red-700">{error}</motion.div>}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{searchQuery ? 'Search Results' : 'All Customers'}</h2>
          <CustomerTable customers={filteredCustomers} loading={loading} />
        </motion.div>
      </div>
    </div>
  )
}