import React, { useState } from "react";
import { SocketProps } from "./Login";

export const ChatInput:React.FC<SocketProps>  = ({socket}) => {
    
    const [message, setMessage] = useState('')
    const [arrMessages, setArrMessages] = useState<{user:string, msg:string}>([{}])

    const handleSendMessage = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const storedUserData = JSON.parse(localStorage.getItem('userName') || '[]')
        const currentUserName = storedUserData[0]?.name || ''

        if (currentUserName) {
            socket.emit('message', {
                text: message,
                name: currentUserName,
                id: `${socket.id} ${Math.random()}`,
                socketID: socket.id
            })

        }
          socket.on('messageToAll', (msg) => {
            console.log('en message' + msg.name + '  ' + msg.text)
          })
         
        setMessage('')
    } 
    socket.on('newUser', user => {
            console.log(user.username)
    })
    socket.on('messageToAll', (msg) => {
        return setArrMessages([...arrMessages, {user: msg.username, msg: msg.message]);
    })
        
    return(
        <>
            <div>

            </div>
            
            {socket.id + '  mensaje : '+ message}
            <form onSubmit={handleSendMessage}>
                <input type="text" placeholder="write a message" value={message} onChange={(e) => setMessage(e.target.value)}/>
            </form>
        </>
    )
}