// A react route that renders a form
// The form should be filled out with the existing data
// When changes are made in the form the state of the component updates
// When the submit button is clicked, it should make a PUT request to the correct resource with the updated data in the body
// After the fetch call is resolved, the page should route to the game/event’s detail page

import { useState, useEffect } from "react"
import { useNavigate,useParams } from 'react-router-dom'
import { getBookById, getBookGenres, updateBook } from '../../managers/BookManager.js'


export const UpdateBook = () => {
    const navigate = useNavigate()
    const [bookGenres, setBookGenres] = useState([])
    const { bookId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentBook, setCurrentBook] = useState({
        author: "",
        title: "",
        released_date: "",
        length: 0,
        description: "",
        book_genre: {},
        reader:{},
        image_url: ""
    })

    useEffect(() => {
        // TODO: Get the book genres, then set the state
        getBookGenres().then(data => setBookGenres(data))
        getBookById(bookId).then((data) => {
            data.bookGenreId = data.book_genre.id
            setCurrentBook(data)
        })
    }, [bookId])

    const changeBookState = (event) => {
        // TODO: Complete the onChange function
        const copy = { ...currentBook }
        copy[event.target.name] = event.target.value
        setCurrentBook(copy)
    }
    

    return (
        <form className="bookForm">
            <h2 className="bookForm__title">Edit Existing Book</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">EDIT TITLE: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        placeholder={currentBook.title}
                        defaultValue={currentBook.title}
                        onChange={changeBookState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="author">EDIT AUTHOR: </label>
                    <input type="text" name="author" required autoFocus className="form-control"
                        placeholder={currentBook.author}
                        defaultValue={currentBook.author}
                        onChange={changeBookState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label className="label">EDIT GENRE: </label>
                <select
                        name="book_genre"
                        className="form-control"
                        placeholder={currentBook.book_genre}
                        defaultValue={currentBook.book_genre}
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
                    <label htmlFor="length">EDIT NUMBER OF PAGES: </label>
                    <input type="text" name="length" required autoFocus className="form-control"
                        placeholder={currentBook.length}
                        defaultValue={currentBook.length}
                        onChange={changeBookState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="released_date">EDIT RELEASE DATE: </label>
                    <input type="date" name="released_date" required autoFocus className="form-control"
                        placeholder={currentBook.released_date}
                        defaultValue={currentBook.released_date}
                        onChange={changeBookState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="image_url">EDIT BOOK IMAGE URL: </label>
                    <input type="text" name="image_url" required autoFocus className="form-control"
                        placeholder={currentBook.image_url}
                        defaultValue={currentBook.image_url}
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
                    updateBook(book)
                        .then(() => navigate("/books"))
                }}
                className="btn btn-primary">SAVE BOOK EDITS</button>
        </form>
    )
}
