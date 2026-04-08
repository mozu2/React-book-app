import { useEffect, useState } from 'react';


const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem('token');
        console.log('トークン', token);

        fetch('https://railway.bookreview.techtrain.dev/books?offset=0', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('書籍データ', data);
                setBooks(data);
            });
    }, []);

    return (
        <>
            <h1>書籍一覧</h1>
        </>
    )
}
export default BookList;