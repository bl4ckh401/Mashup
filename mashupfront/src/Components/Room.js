import React, {useState} from 'react'

function Room(props) {
    const [votestoSkip, setVotes] = useState(0)
    const [isHost, setisHost] = useState(true)
    const [guestCanPause, setGuest] = useState(true)

    const code = props.match.params.roomCode

    function getRoomDetails() {
        fetch(`http://127.0.0.1:8000/api/get-room/?code=`+ code)
        .then((response) => response.json())
        .then((response) =>{
            setVotes(response.votes_to_skip)
            setGuest(response.guest_can_pause)
            setisHost(response.host)
        })
    }
    getRoomDetails(props)

    return (
        <div className="">
            <div className="">
            <h1>{code}</h1>
            <p>votes: {votestoSkip}</p>
            <p>Guest Can Pause: {guestCanPause.toString()}</p>

            <p>is Host: {isHost.toString()}</p>
            </div>
        </div>
    )
}

export default Room
