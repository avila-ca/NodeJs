import io from 'socket.io-client'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Login } from './components/Login'
import { ChatInput } from './components/ChatInput'

const socket = io()//('http://localhost:4000').connect()
socket.on('connect', () => {
  console.log(socket.id)

})
function App() {
  return (
    <>
      <h1>Chat</h1>
      <div>
       <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login socket={socket} />}/>
            <Route path="/chat" element={<ChatInput socket={socket} />}></Route>
          </Routes>  
        </BrowserRouter>
      </div>  
    </>
  )
}

export default App
