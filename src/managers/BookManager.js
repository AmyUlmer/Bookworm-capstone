export const getBooks = () => {
    return fetch("http://localhost:8000/books", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleBook= (id) => {
    return fetch(`http://localhost:8000/books/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        }
    })
    .then((res) => res.json())
}


export const createBook = (book) => {
    return fetch("http://localhost:8000/books", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bw_token")}`,
            "Accept": "application/json"
        },
        body: JSON.stringify(book)
    })
        .then(response => response.json())
}

// can get all book genres to display in a dropdown form 
export const getBookGenres = () => {
    return fetch("http://localhost:8000/bookgenres", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        }
    })
        .then(response => response.json())
}

export const getBookById = (id) => {
    return fetch(`http://localhost:8000/books/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        }
    })
        .then(response => response.json())
}

export const updateBook = (book, id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        },
        body: JSON.stringify(book)
    })
}

export const deleteBook = (id) => {
    return fetch(`http://localhost:8000/books/${id}`, 
    {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("bw_token")}`
        }
    })
}