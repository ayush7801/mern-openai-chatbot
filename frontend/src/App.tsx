import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Chats from './pages/Chats'
import Fallback from './pages/Fallback'
import { useAuth } from './context/AuthContext'

function App() {
  const auth = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        { auth?.isLoggedIn && auth?.user && (<Route path="/chat" element={<Chats />} />) }
        <Route path="*" element={<Fallback />} />
      </Routes>
    </>
  )
}

export default App
