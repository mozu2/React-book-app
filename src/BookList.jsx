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
        <div className='bg-lime-400' >
            <div className="max-w-4xl mx-auto p-8 " >
                <h1 className='text-5xl font-bold mb-6'>書籍一覧</h1>
                <div className='grid grid-cols-1 gap-4'>
                    {books.map((book) => (
                        <div key={book.id} className='bg-white shadow rounded-lg p-6'>
                            <h2 className='text-xl text-black font-bold'>{book.title}</h2>
                            <a href={book.url} className='text-blue-500 mt-2 hover:text-blue-900 transition duration-200'>{book.url}</a>
                            <p className='text-gray-700 mt-2'>{book.detail}</p>
                            <p className='text-gray-400 mt-2'>{book.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default BookList;