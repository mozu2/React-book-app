import { useEffect, useState } from 'react';
import BookItem from './BookItem';
import Pagenation from './Pagenation';
import { useSelector } from 'react-redux';


const BookList = () => {
    const [books, setBooks] = useState([]);
    const offset = useSelector((state) => state.page.offset);
    useEffect(() => {
        console.log('offset変わった', offset);
        const token = localStorage.getItem('token');


        fetch(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`, {
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
    }, [offset]);

    return (
        <div className='bg-lime-400' >
            <div className="max-w-4xl mx-auto p-8 " >
                <h1 className='text-5xl font-bold mb-6'>書籍一覧</h1>
                <div className='grid grid-cols-1 gap-4'>
                    {books.map((book) => (
                        <BookItem key={book.id} book={book} />
                    ))}
                </div>
                <Pagenation />
            </div>
        </div>
    )
}
export default BookList;