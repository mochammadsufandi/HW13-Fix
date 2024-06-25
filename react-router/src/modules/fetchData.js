import instance from "./axios.js";

// user login endpoint (hit API login)
async function loginUser (email,password) {
    try {
        const response = await instance.post('/login',{email,password});
         return response.data;
    } catch(err) {
        throw new Error(err.response.data.message || 'Something Went Wrong');
    }
    
}

async function registerUser (name,email,password) {
    try {
        const response = await instance.post('/register', {name,email,password});
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message || 'Something Went Wrong');
    }
}

async function getAllBooks () {
    try {
        const response = await instance.get('/books');
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message || 'Something Went Wrong');
    }
}

async function getBookById (id) {
    try {
        const response = await instance.get(`/books/${id}`);
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message || 'Something Went Wrong');
    }
}

async function addBook (formData) {
    try {
        const response = await instance.post('/books', formData, {
            headers : {'Content-Type' : 'multipart/form-data'}});
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message || 'Something Went Wrong');
    }
}

async function deleteBook (id) {
    try {
        const response = await instance.delete(`/books/${id}`);
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message || 'Something Went Wrong');
    }
}

async function editBook (id,title,author,publisher,year,pages) {
    try {
        const response = await instance.put(`/books/${id}`, {title,author,publisher,year,pages});
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message || 'Something Went Wrong');
    }
}

export {loginUser,registerUser,getAllBooks,getBookById,addBook,deleteBook,editBook};
