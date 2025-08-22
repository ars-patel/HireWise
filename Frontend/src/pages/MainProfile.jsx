import Profile from "./Profile"
import Navbar from "./subpages/navbar"

const MainProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <Profile storedUser={storedUser} />
    </div>
  )
}

export default MainProfile
