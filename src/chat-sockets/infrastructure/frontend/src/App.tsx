import io from 'socket.io-client'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/home'

const socket = io('http://localhost:4000').connect

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home socket={socket} />}/>
             
        </Routes>  
      </div>  
    </>
  )
}

export default App
