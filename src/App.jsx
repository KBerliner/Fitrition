import './App.css'
import { Routes, Route, Navigate } from 'react-router'
import Home from './components/Home/Home.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/fitness" element={<Home type="fitness" />} />
        <Route path="/nutrition" element={<Home type="nutrition" />} />
        <Route path="/" element={<Navigate to="/fitness" />} />
      </Routes>
    </>
  )
}

export default App
