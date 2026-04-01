import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('nt_user')
    const token = localStorage.getItem('nt_token')
    if (stored && token) setUser(JSON.parse(stored))
  }, [])

  const logout = () => {
    localStorage.removeItem('nt_user')
    localStorage.removeItem('nt_token')
    setUser(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={logout} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup onAuth={setUser} />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onAuth={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user ? <Admin user={user} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
