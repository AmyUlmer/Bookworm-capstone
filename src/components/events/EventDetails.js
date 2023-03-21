import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, leaveEvent, joinEvent, getSingleEvent } from "../../managers/EventManager.js"
import "./event.css"


export const EventDetails = () => {
    const [ events, setEvents ] = useState([])

    const navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false)
    }

    const { eventId } = useParams()

    const [event, setEvent] = useState({})

    useEffect(() => {
        getSingleEvent(eventId).then((data) => setEvent(data))
    }, [eventId])

    const handleClick = (id) => {
        deleteEvent(id).then(refreshPage)
    }   

    return (
        <article className="events">
            <button className="btn btn-2 icon-create"
                onClick={() => {
                    navigate({ pathname: "new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        
                        <img src={`${event.image_url}`} alt="Event" className="event__imageURL"></img>
                        <div className="event__name">{event.name}</div>
                        <div className="event__book">{event.book.title}</div>
                        <div className="event_location">Location: {event.location}</div>
                        <div className="event_date">Date: {event.date_of_event} from {event.start_time} to {event.end_time} </div>
                        <div className="event__organizer">Event Organizer: {event.organizing_reader.full_name}</div>
                        <div className="event__footer">
                            <button className="btn btn-2 btn-sep icon-create"
                                onClick={() => {
                                    navigate({ pathname: `edit/${event.id}` })
                                    }}>Edit</button>
                        </div>
                        <div className="event__footer">
                            <button
                                onClick={() => {
                                    handleClick(event.id)
                                }}>Delete</button>
                            {
                                event.joined 
                                ?
                                    <button
                                    onClick={() => {
                                        leaveEvent(event.id)
                                        .then(() => {
                                            getEvents().then(data => setEvents(data))
                                        })
                                    }}>Leave</button>
                                :
                                    <button
                                    onClick={() => {
                                        joinEvent(event.id)
                                        .then(() => {
                                            getEvents().then(data => setEvents(data))
                                        })
                                    }}>Join</button>
                            }
                        </div>
                    </section>
                })
            }
        </article>
    )
}