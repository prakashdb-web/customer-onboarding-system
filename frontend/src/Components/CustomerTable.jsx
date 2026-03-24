import { motion } from 'framer-motion'

export default function CustomerTable({ customers, loading }) {
  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent"></div></div>
  if (!customers.length) return <p className="text-center py-12 text-gray-500">No customers found</p>

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-300">
            <th className="px-6 py-4 text-left font-semibold">ID</th>
            <th className="px-6 py-4 text-left font-semibold">Name</th>
            <th className="px-6 py-4 text-left font-semibold">Mobile</th>
            <th className="px-6 py-4 text-left font-semibold">Email</th>
            <th className="px-6 py-4 text-left font-semibold">City</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-b border-gray-200 hover:bg-blue-50">
              <td className="px-6 py-4">{c.id}</td>
              <td className="px-6 py-4">{c.name}</td>
              <td className="px-6 py-4">{c.mobile}</td>
              <td className="px-6 py-4">{c.email || 'N/A'}</td>
              <td className="px-6 py-4">{c.city || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}