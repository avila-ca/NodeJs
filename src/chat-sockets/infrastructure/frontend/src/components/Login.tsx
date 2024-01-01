import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";


export interface SocketProps {
    socket: Socket;
  }
  
export const Login: React.FC<SocketProps> = ({ socket }) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit('addUser', userName)
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userData = {name: userName, id: socket.id}
        storedUsers.push(userData)
        localStorage.setItem('userName', JSON.stringify(storedUsers))
        console.log(  JSON.parse(localStorage.getItem('users') || '[]'), storedUsers[0].name)
        navigate('/chat')
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <h2>Sign In to open the chat</h2>
                <h3>your id: {socket.id}</h3>
                <input type="text" name="username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <button>Sign In</button>
            </form>
        </>
    )
}
