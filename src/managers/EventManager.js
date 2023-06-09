export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleEvent= (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        }
    })
    .then((res) => res.json())
}

export const getEventById = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        }
    })
        .then(response => response.json())
}


export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bw_token")}`,
            "Accept": "application/json"
        },
        body: JSON.stringify(event)
    })
        .then(response => response.json())
}

export const updateEvent = (event,id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        },
        body: JSON.stringify(event)
    })
}

export const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, 
    {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        }
    })
}

export const leaveEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}/leave`, 
    {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        }
    })  
}

export const joinEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}/signup`, {
        method: "POST",
        headers: {
        "Authorization": `Token ${localStorage.getItem("bw_token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(id)
    })
        .then(res => res.json())
}