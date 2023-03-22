import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent} from '../../managers/EventManager.js'
import { getBooks } from "../../managers/BookManager"


export const EventForm = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])

    const [currentEvent, setCurrentEvent] = useState({
            id:0,
            event_name: "",
            location: "",
            date_of_event: "",
            start_time: 0,
            end_time: "",
            max_capacity: 0,
            book: 0,
            organizing_reader:"",
            image_url: ""
            
    })

    useEffect(() => {
        // TODO: Get the books, then set the state
        getBooks().then(res => setBooks(res))
    }, [])

    const changeEventState = (event) => {
        // TODO: Complete the onChange function
        const copy = { ...currentEvent }
        copy[event.target.name] = event.target.value
        setCurrentEvent(copy)
    }
    

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event_name">EVENT: </label>
                    <input type="text" name="event_name" required autoFocus className="form-control"
                        value={currentEvent.event_name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label className="label">Book: </label>
                        <select
                                name="book"
                                className="form-control"
                                defaultValue={currentEvent.book}
                                onChange={(event) => {
                                    const copy = { ...currentEvent }
                                    copy.book = parseInt(event.target.value)
                                    setCurrentEvent(copy)
                                }}>
                                <option value="0">Please Choose Book</option>
                                {books.map(book => ( 
                                            <option key={`book--${book.id}`} value={book.id} name={book.title}>{book.title}</option>                         
                                    ))}
                        </select>
                        Not what you're looking for? <a href="/books/new" className="add-book-link">Add a book</a>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">LOCATION: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">DATE: </label>
                    <input type="date" name="date_of_event" required autoFocus className="form-control"
                        value={currentEvent.date_of_event}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="start_time">START TIME: </label>
                    <input type="time" name="start_time" required autoFocus className="form-control"
                        value={currentEvent.start_time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="end_time">END TIME: </label>
                    <input type="time" name="end_time" required autoFocus className="form-control"
                        value={currentEvent.end_time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            

            <fieldset>
                <div className="form-group">
                    <label htmlFor="max_capacity">Maximum Capacity: </label>
                    <input type="text" name="max_capacity" required autoFocus className="form-control"
                        value={currentEvent.max_capacity}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="image_url"> EVENT IMAGE URL: </label>
                    <input type="text" name="image_url" autoFocus className="form-control"
                        value={currentEvent.image_url}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        event_name: currentEvent.event_name,
                        location: currentEvent.location,
                        date_of_event: currentEvent.date_of_event,
                        start_time: currentEvent.start_time,
                        end_time: currentEvent.end_time,
                        max_capacity: currentEvent.max_capacity,
                        book: currentEvent.book,
                        organizing_reader:"",
                        image_url: currentEvent.image_url
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}