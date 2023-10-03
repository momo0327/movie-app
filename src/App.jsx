import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/Navbar/Navbar'
import Navbar from './components/Navbar/Navbar'
import SearchBar from './components/SearchBar/SearchBar'

function App() {
  const [count, setCount] = useState(0)

  return (

       <div>
        <Navbar/>
        <SearchBar/>
      </div>
    
  )
}

export default App
