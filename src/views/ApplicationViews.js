import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Home } from "../components/home/Home"
import { BookList } from '../components/books/BookList';



export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<BookList />} />
            </Route>
        </Routes>
    </>
}