import React, { useEffect, useState } from 'react'
import CSRFToken from './CSRFToken'

function HomePage() {
    const [data, setData] = useState([])

    useEffect(() => {
        const RequestData = {
            method:"GET",
            headers: { 'Content-Type': "application/json"},
        }
        fetch('http://127.0.0.1:8000/api/allrooms/', RequestData)
        .then((data) => data.json())
        .then((data) => {
            setData(data)
        })

    }, [])
    return (
        <div>
            <h1>MASHUP</h1>
            <div>
                <h3>Welcome To MashUp HomePage</h3>
                <div>
                    <button>Have A code? Join Room</button>
                    <button>Create New Room?</button>
                </div>
                <div>
                    <h5>Here are some Public Rooms Available. Browse For one to join</h5>
                    <div>
                        {
                            data.map((rooms) =>{
                                return(
                                    <div key={rooms.id}>
                                        <div >
                                            {/* <img src='https://www.istockphoto.com/photo/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-gm1297349747-390509593?utm_source=unsplash&utm_medium=affiliate&utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fview&utm_term=view%3A%3A%3A' alt='Room Cover Image/WallPaper'></img> */}
                                        </div>
                                        <div>
                                            <p>{rooms.code}</p>
                                            <p>{rooms.host}</p>
                                        </div>
                                    </div>
                                        )
                            })
                           }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
