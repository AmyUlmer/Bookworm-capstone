import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getEventById, updateEvent } from "../../managers/EventManager"
import { getBooks } from "../../managers/BookManager"

export const UpdateEvent = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([
       {
        id: 0
       } 
    ])
    const { eventId } = useParams()

    const [currentEvent, setCurrentEvent] = useState({
            event_name: "",
            location: "",
            date_of_event: "",
            start_time: "",
            end_time: "",
            max_capacity: "",
            book: {id:0},
            organizing_reader:"",
            image_url: ""
    })

    const [selectedBook_id, setBook] =useState()

    useEffect(() => {
        // TODO: Get the eventById then set the state
        getEventById(eventId).then((data) => {
            setCurrentEvent(data)
            setBook(data.book.id)
        })
        getBooks().then(res => setBooks(res))
    }, [eventId])

    const changeEventState = (event) => {
        // TODO: Complete the onChange function
        const copy = { ...currentEvent }
        copy[event.target.name] = event.target.value
        setCurrentEvent(copy)
    }
    

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Edit Existing Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event_name">EDIT EVENT NAME: </label>
                    <input type="text" name="event_name" required autoFocus className="form-control"
                        placeholder={currentEvent.event_name}
                        defaultValue={currentEvent.event_name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label className="label">EDIT BOOK: </label>
                        <select
                                name="title"
                                className="form-control"
                                value={currentEvent.book.id}
                                onChange={(event) => {
                                    setBook(event.target.value)
                                }}>
                                {/* <option value="0">Please Choose Book</option> */}
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
                        placeholder={currentEvent.location}
                        defaultValue={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">DATE: </label>
                    <input type="date" name="date_of_event" required autoFocus className="form-control"
                        placeholder={currentEvent.date_of_event}
                        defaultValue={currentEvent.date_of_event}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="start_time">START TIME: </label>
                    <input type="time" name="start_time" required autoFocus className="form-control"
                        placeholder={currentEvent.start_time}
                        defaultValue={currentEvent.start_time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="end_time">END TIME: </label>
                    <input type="time" name="end_time" required autoFocus className="form-control"
                        placeholder={currentEvent.end_time}
                        defaultValue={currentEvent.end_time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            

            <fieldset>
                <div className="form-group">
                    <label htmlFor="max_capacity">Maximum Capacity: </label>
                    <input type="text" name="max_capacity" required autoFocus className="form-control"
                        placeholder={currentEvent.max_capacity}
                        defaultValue={currentEvent.max_capacity}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="image_url"> EVENT IMAGE URL: </label>
                    <input type="text" name="image_url" autoFocus className="form-control"
                        placeholder={currentEvent.image_url}
                        defaultValue={currentEvent.image_url}
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
                        book: selectedBook_id,
                        organizing_reader:"",
                        image_url: currentEvent.image_url
                    }

                    // Send POST request to your API
                    updateEvent(event,eventId)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">SAVE EVENT EDITS</button>
        </form>
    )
}