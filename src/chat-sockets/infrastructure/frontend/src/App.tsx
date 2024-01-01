import io from 'socket.io-client'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Login } from './components/Login'
import { ChatInput } from './components/ChatInput'
import { SocketProps } from './components/Login'
export const socket = io('http://localhost:4000').connect()

function App() {
  
  
  let data:SocketProps;
  socket.on('connect', () => {
    console.log(socket.id)
   
  })
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
