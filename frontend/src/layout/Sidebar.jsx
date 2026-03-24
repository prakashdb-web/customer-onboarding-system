import { NavLink } from "react-router-dom"
import { LayoutDashboard, UserPlus } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-6">

      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        OnboardX
      </h1>

      <nav className="space-y-2">

        <NavLink to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg ${
              isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/onboarding"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg ${
              isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
            }`
          }
        >
          <UserPlus size={20} />
          Onboarding
        </NavLink>

      </nav>
    </div>
  )
}