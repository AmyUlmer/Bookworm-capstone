import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Home } from "../components/home/Home"
import { BookList } from '../components/books/BookList';
import { BookForm } from '../components/books/BookForm';
import { UpdateBook } from '../components/books/UpdateBook';
import { BookDetails } from '../components/books/BookDetails';
import { EventForm } from '../components/events/EventForm';
import { EventList } from '../components/events/EventList';


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/events" >
                    <Route index element={<EventList />} />
                    <Route path="new" element={<EventForm />} />
                </Route>
                <Route path="/books" >
                    <Route index element={<BookList />} />
                    <Route path="new" element={<BookForm />} />
                    <Route path="edit/:bookId" element={<UpdateBook />} />
                    <Route path="details/:bookId" element={<BookDetails />} />
                </Route>
            </Route>
        </Routes>
    </>
}