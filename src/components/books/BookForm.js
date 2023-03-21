import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createBook, getBookGenres } from '../../managers/BookManager'
import "./book.css"

export const BookForm = () => {
    const navigate = useNavigate()
    const [bookGenres, setBookGenres] = useState([])

    const [currentBook, setCurrentBook] = useState({
            id:0,
            author: "",
            title: "",
            released_date: "",
            length: 0,
            description: "",
            book_genre: 0,
            image_url: ""
            
    })

    useEffect(() => {
        // TODO: Get the book genres, then set the state
        getBookGenres().then(res => setBookGenres(res))
    }, [])

    const changeBookState = (event) => {
        // TODO: Complete the onChange function
        const copy = { ...currentBook }
        copy[event.target.name] = event.target.value
        setCurrentBook(copy)
    }

    return (
        <form className="bookForm">
            <h2 className="bookForm__title">Register New Book</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">TITLE: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentBook.title}
                        onChange={changeBookState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="author">AUTHOR: </label>
                    <input type="text" name="author" required autoFocus className="form-control"
                        value={currentBook.author}
                        onChange={changeBookState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label className="label">GENRE: </label>
                <select
                        name="book_genre"
                        className="form-control"
                        value={currentBook.book_genre}
                        onChange={(event) => {
                            const copy = { ...currentBook }
                            copy.book_genre = parseInt(event.target.value)
                            setCurrentBook(copy)
                        }}>
                        <option value="0">Choose:</option>
                        {bookGenres.map(genre => ( 
                                    <option key={`book_genre--${genre.id}`} value={genre.id} name={genre.label}>{genre.label}</option>                         
                            ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="length">NUMBER OF PAGES: </label>
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





