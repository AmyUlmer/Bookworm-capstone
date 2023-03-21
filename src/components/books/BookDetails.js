import { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { getSingleBook } from "../../managers/BookManager"
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import "./book.css"

export const BookDetails = () => {

    const { bookId } = useParams()

    const [book, setBook] = useState({})

    useEffect(() => {
        getSingleBook(bookId).then((data) => setBook(data))
    }, [bookId])

    return (
        <Card className="book" sx={{ maxWidth: 800, padding: 5 }}>
            <CardContent>
                <Stack spacing={2}>
                    <CardMedia
                        component="img"
                        height= "200"
                        image={book?.image_url}
                        title="image"
                    />
                    <Typography className="book__title"> TITLE: {book?.title}</Typography>
                    <Typography className="book__author"> AUTHOR: {book?.author}</Typography>
                    <Typography className="book__genre"> GENRE: {book?.book_genre?.label}</Typography>
                    <Typography className="book__description"> DESCRIPTION: {book?.description}</Typography>
                    <Typography className="book__length">LENGTH: {book.length} pages </Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}
