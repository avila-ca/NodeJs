import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

export const Home = ({socket}) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userData = {name: userName, id: socket.id}
        localStorage.setItem('userName', JSON.stringify(userData))
        navigate('/chat')
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <h2>Sign In to open the chat</h2>
                <input type="text" name="username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <button>Sign In</button>
            </form>
        </>
    )
}
