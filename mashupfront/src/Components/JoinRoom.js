import React, { useState } from 'react'
import CSRFToken from './CSRFToken'

function JoinRoom(props) {

    const [code, setCode] = useState("")
    const [error, setError] = useState("")

    const handleChange = (e) => {
            setCode(e.target.value)
    }
    console.log(code)
    const handleSubmit = () => {
            const requestOptions = {
                method : 'post',
                headers : {
                    'Content-Type':'application/json',
                },
                body : JSON.stringify({
                    code : code,
                })
            }
            fetch('http://127.0.0.1:8000/api/join/', requestOptions)
            .then((response) => {
                if (response.ok){
                    console.log('Room Joined Successfully')
                    props.history.push(`/room/${code}`)
                }
                else{
                    setError("Room not found")
                }})
            .then((data) => console.log(data))
}

    return (
        <div className="">
            <form method="post">
                <CSRFToken/>
            <div className="">
                <input type="text" className="" placeholder="code" value={code} onChange={handleChange} />
            </div>
            {error}
            </form>
            <div className="">
            <button type="submit" className="" onClick={handleSubmit}>Join Room</button>
            </div>
        </div>
    )
}

export default JoinRoom
