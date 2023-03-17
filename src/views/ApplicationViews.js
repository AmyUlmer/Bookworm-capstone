import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Home } from "../components/home/Home"
import { BookList } from '../components/books/BookList';
import { BookForm } from '../components/books/BookForm';



export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                {/* <Route path="/" element={<EventList />} /> */}
                <Route path="books" >
                    <Route index element={<BookList />} />
                    <Route path="new" element={<BookForm />} />
                    {/* <Route path="edit/:bookId" element={<UpdateBook />} /> */}
                </Route>
            </Route>
        </Routes>
    </>
}