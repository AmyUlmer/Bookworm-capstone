import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteBook,getBooks } from "../../managers/BookManager.js"
import "./book.css"

export const BookList = (props) => {
    const [ books, setBooks ] = useState([
            {id:0,
            author: "",
            title: "",
            released_date: "",
            length: 0,
            description: "",
            book_genre: {},
            reader:{},
            image_url: ""
            }
        ])

    const navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false)
    }

    useEffect(() => {
        getBooks().then(data => setBooks(data))
    }, [])

    const handleDelete = (id) => {
        deleteBook(id).then(refreshPage)
    } 


return (
        
    <article className="bookList">
        <button className="btn btn-2 icon-create"
            onClick={() => {
                navigate({ pathname: "new" })
            }}
        >Add New Book</button>
        {
            books.map(book => {
                return <section key={`book--${book.id}`} className="book">
                    <img src={`${book.image_url}`} alt="Book" className="book__imageURL"></img>
                    <div className="book__title">TITLE:{book.title}</div>
                    <div className="book__author">AUTHOR:{book.author}</div>
                    <div className="book__genre">GENRE:{book.book_genre.label}</div>
                    <div className="book__length">LENGTH:{book.length}</div>
                    <div className="edit-delete">
                        <button className="edit-book"
                            onClick={() => {
                                navigate({ pathname: `edit/${book.id}` })
                                }}>Edit</button>
                    </div>
                    <div className="delete-book">
                        <button
                            onClick={() => {
                                handleDelete(book.id)
                            }}>Delete</button>
                    </div>
                </section>
            })
        }
    </article>
)
}
