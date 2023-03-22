import * as React from 'react'
import { useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react"
import { deleteBook, getBooks } from "../../managers/BookManager.js"
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import styled from '@emotion/styled';
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
    
        const handleDelete = (id) => {
            deleteBook(id).then(refreshPage)
        } 

    useEffect(() => {
        getBooks().then(data => setBooks(data))
    }, [])

    return (

        <article className="bookList">
        <button className="btn btn-2 icon-create"
            onClick={() => {
                navigate({ pathname: "new" })
            }}
        >Add New Book</button>
        {

        books.map(book => {
            return <Card key={`book-${book.id}`} className="book" sx={{ maxWidth: 300 }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <Stack spacing={1}>
                    <CardMedia
                        component="img"
                        height= "200"
                        image={book?.image_url}
                        title="image"
                    />
                    <Link className="card-link" href={`/books/details/${book.id}`} >{book.title}</Link>
                    <Typography> Author: {book?.author} </Typography>
                    <Typography> Genre: {book?.book_genre?.label}</Typography>
                    <Stack direction="row" justifyContent="center">
                        <Button className="button" variant="contained" onClick={() => {
                            navigate(`edit/${book.id}`)
                        }}>Edit</Button>
                        <Button className="button" variant="contained" onClick={() => {handleDelete(book.id)
                        }}>Delete</Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    })
        }
    </article>
)
}
