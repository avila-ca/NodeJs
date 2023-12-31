import React, { useState } from "react";
import { SocketProps } from "./Login";

export const ChatInput:React.FC<SocketProps>  = ({socket}) => {
    const [message, setMessage] = useState('')
    const handleSendMessage = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (localStorage.getItem('userName')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id} ${Math.random()}`,
                socketID: socket.id
            })
        }
        setMessage('')
    }
    return(
        <>
            <form onSubmit={handleSendMessage}>
                <input type="text" placeholder="write a message" value={message} onChange={(e) => setMessage(e.target.value)}/>
            </form>
        </>
    )
}