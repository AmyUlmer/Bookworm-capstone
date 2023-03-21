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
            book: {},
            organizing_reader:{},
            image_url: ""
            
    })

    useEffect(() => {
        // TODO: Get the games, then set the state
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
            <h2 className="eventForm__title">Register New Book</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">EVENT NAME: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.event_name}
                        onChange={changeEventState}
                    />
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
                    <label htmlFor="length">DATE: </label>
                    <input type="text" name="length" required autoFocus className="form-control"
                        value={currentBook.length}
                        onChange={changeBookState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="released_date">RELEASE DATE: </label>
                    <input type="date" name="released_date" required autoFocus className="form-control"
                        value={currentBook.released_date}
                        onChange={changeBookState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="image_url"> BOOK IMAGE URL: </label>
                    <input type="text" name="image_url" required autoFocus className="form-control"
                        value={currentBook.image_url}
                        onChange={changeBookState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const book = {
                        title: currentBook.title,
                        author: currentBook.author,
                        released_date: currentBook.released_date,
                        length: currentBook.length,
                        description: currentBook.description,
                        book_genre: currentBook.book_genre,
                        image_url: currentBook.image_url
                    }

                    // Send POST request to your API
                    createBook(book)
                        .then(() => navigate("/books"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}