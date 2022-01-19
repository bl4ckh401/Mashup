import React, {useState} from 'react'
import '../styles/Createpage.css'
import CSRFToken from './CSRFToken'

function CreatePage(props) {

    const [guestCanPause, setguestCanPause ] = useState(false)
    const [votesToSkip, setVotesToSkip ] = useState(false)
    const [code, setCode] = useState("")



    const handleradio = (event) => {
        setguestCanPause(
            event.target.value === "true" ? true : false
        )
    }

    const handleVotes = (event) => {
        setVotesToSkip(
            event.target.value
        )
        console.log(votesToSkip, guestCanPause)
    }

    const handleCreateRoom = () => {
        const requestOptions = {
            method: "post",
            headers: { 'Content-Type': "application/json"},
            body: JSON.stringify({
              votes_to_skip: votesToSkip,
              guest_can_pause: guestCanPause,
            }),
          };
          fetch("http://127.0.0.1:8000/api/create-room/", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                try{
                        props.history.push(`/room/${response.code}`)
                    // }
                    // else{
                    //     console.log('Room not created')
                    // }
                    console.log(response)
                    }

                catch(error){
                    console.log(error)
                }
             });
        }
        return (
        <div className='create_page'>
            <div className='create_card'>
                <div className='heading'>
                    <h1>CREATE A ROOM</h1>
                </div>
                <div className='create_playback'>
                    <h4>Guest control of playback state</h4>
                </div>
                <div className='create_radios'>
                    <form className='create_radios' method="post">
                   <CSRFToken />
                   <div className='radio_button'>
                    <input type="radio" id="play" onClick={handleradio} name="playpause" className='radio_button' value='true'></input><br/>
                    <label for="play">Play/Pause</label>
                    </div>
                    <div className='radio_buttongroup'>
                    <input type="radio" id="nocontrol" onClick={handleradio} name="playpause" className='radio_button' value='false'></input><br/>
                    <label for="nocontrol">No Control</label>
                    </div>                    
                    </form>
                </div>
                <div className='create_votes'>
                    <input type='number' onChange={handleVotes} defaultValue='1'></input>
                    <p>Votes Required to Skip song</p>
                </div>
                <div>
                    <div className=''>
                        <button className='' onClick={() => handleCreateRoom(props)}>Create Room</button>
                    </div>
                    <div className=''>
                        <button className=''>Back</button>
                    </div>
                </div>
          
            </div>
        </div>
    )
}

export default CreatePage
