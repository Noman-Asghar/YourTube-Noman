import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Compoents/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Videos from './Pages/Videos'
import SearchVideos from './Compoents/SearchVideos'

function App() {
  const [sidebar, setSidebar] = useState(true)

  return (
    <>
     <Navbar setSidebar={setSidebar} />
     <Routes>
    <Route path='/' element={<Home sidebar={sidebar} />} />
    <Route path='/video/:categoryId/:videoId' element={<Videos />} />
    <Route path="/search/:query" element={<SearchVideos sidebar={sidebar} />} />

     </Routes>
    </>
  )
}

export default App
