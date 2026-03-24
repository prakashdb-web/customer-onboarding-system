import { useLocation } from "react-router-dom"

export default function Topbar() {
  const location = useLocation()

  const title =
    location.pathname === "/dashboard"
      ? "Dashboard"
      : "Onboarding"

  return (
    <div className="bg-white border-b px-6 py-4">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  )
}