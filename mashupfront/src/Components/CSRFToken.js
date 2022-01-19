import React, {useState, useEffect} from 'react'

function CSRFToken() {

    const [csrf, setcsrf] = useState('')

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(() => {
        const fetchData = async () => {
            fetch("http://127.0.0.1:8000/api/getcsrf/")
        }
        fetchData()
        setcsrf(getCookie('csrftoken'))
    }, [])
    return (
        <div>
            <input type='hidden' name='csrfmiddlewaretoken' value={csrf}></input>
        </div>
    )
}

export default CSRFToken
