import { useEffect, useState } from 'react';
import './App.css'
import io from "socket.io-client";
import { baseUrl, postRequest } from './utils/services';
import { log } from 'console';


const socket = io(baseUrl);

interface Message {
  username: string;
  msg: string;
}
interface User {
  user:string
}
function App() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [message,setMessage] = useState('')
  const [loginFlag, setLoginFlag] =  useState(false)
  const [registerFlag, setRegisterFlag] =  useState(false)

  const [arrMsg, setArrMsg] = useState<Message[]>([])
  const [sessionUsers, setSessionUsers] = useState<User[]>([])

  useEffect(() => {
    socket.on("chat message", (msg, username) => {
      setArrMsg([...arrMsg, {username, msg}])
    })

    socket.on('newUser', (newUser) => {
      setSessionUsers(newUser)
      console.info('en neww user on:  ', sessionUsers, newUser)
    })

    socket.on('currentUsers', (users) => {
      setSessionUsers(users)
      console.info('en currentUsers on: ',sessionUsers, users);

    })
    return () => {
      socket.off("chat message");
      socket.off('newUser');
      socket.off('currentUsers')
    }
  }, [arrMsg, sessionUsers])
  const handleLoginUser = async(e:React.FormEvent) => {
    e.preventDefault()
    const userName = user
    const userPassword = password
    const response = await postRequest(
      `${baseUrl}/login`,
      JSON.stringify({userName,userPassword})
  )      
    if(user) setLoginFlag(true)
    socket.emit('addUser', user)
    localStorage.setItem("User", user)
  }

  const handleSubmitMessage = (e:React.FormEvent) => {
    e.preventDefault()
    console.info(sessionUsers);
    socket.emit('chat message', message, user)
    setMessage('')
  }

  const handleRegisterUser = async (e:React.FormEvent) => {
    e.preventDefault()
    const userName = user
    const userPassword = password
    const response = await postRequest(
      `${baseUrl}/register`,
      JSON.stringify({userName,userPassword})
    )
    socket.emit('addUser', user)

  }
  const handleLogout = () => {
    localStorage.removeItem("User")
    
    socket.emit('deletedUser', user)
    setLoginFlag(false)
    setUser('')
  }
  return (
    <>
      {(!loginFlag && !registerFlag) &&
      <>
        <form onSubmit={handleLoginUser}>
          <h2>Login</h2>
          <input type="text" placeholder='user name' autoFocus onChange={e => setUser(e.target.value)} />
          <input type="password" placeholder='user password' autoFocus onChange={e => setPassword(e.target.value)} />
          <button type="submit">login</button>        
        </form>
        <p>if you don't have account <a onClick={
          () => {
             setRegisterFlag(true)
             }}>register</a> please</p>
      </> 
      }
      {registerFlag &&
        <form onSubmit={handleRegisterUser}>
          <h2>Register</h2>
          <input type="text" placeholder='user name' autoFocus onChange={e => setUser(e.target.value)} />
          <input type="password" placeholder='user password' autoFocus onChange={e => setPassword(e.target.value)} />
          <button type="submit">Register</button>        
        </form>
        }
      {(loginFlag && registerFlag) && <>
      <div>
        <ul>
          {sessionUsers.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
        {arrMsg.map((value, index) => (
          <li key={index}>{value.username} : { value.msg}</li>
        ))}
        </ul>
      </div>
      <form onSubmit={handleSubmitMessage}>
        <input type="text" placeholder='write message' value={message} autoFocus onChange={e => setMessage(e.target.value)}/>
        
      </form>
      <button onClick={handleLogout}>LogOut</button>
       </>}
    </>
  )
}

export default App
