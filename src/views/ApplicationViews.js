import React from 'react';
import { Route, Routes, Navigate, Outlet } from "react-router-dom"
import { BookList } from '../components/books/BookList';
import { BookForm } from '../components/books/BookForm';
import { UpdateBook } from '../components/books/UpdateBook';
import { BookDetails } from '../components/books/BookDetails';
import { EventForm } from '../components/events/EventForm';
import { EventList } from '../components/events/EventList';
import { UpdateEvent } from '../components/events/UpdateEvent';


export const ApplicationViews = () => {
    return <>
        <Routes>
            {/* <Route path="*" element={
                <>
                <Outlet/>
                </>
            }>  */}
            <Route path="/" />
                <Route path="/events" >
                    <Route index element={<EventList />} />
                    <Route path="new" element={<EventForm />} />
                    <Route path="edit/:eventId" element={<UpdateEvent />} />
                </Route>
                <Route path="/books" >
                    <Route index element={<BookList />} />
                    <Route path="new" element={<BookForm />} />
                    <Route path="edit/:bookId" element={<UpdateBook />} />
                    <Route path="details/:bookId" element={<BookDetails />} />
                </Route>
                {/* </Route> */}
        </Routes>
    </>
}