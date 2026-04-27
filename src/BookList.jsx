import { useEffect, useState } from 'react';
import BookItem from './BookItem';
import Pagenation from './Pagenation';
import { useSelector } from 'react-redux';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


const BookList = () => {
    const [books, setBooks] = useState([]);
    const offset = useSelector((state) => state.page.offset);
    const navigate = useNavigate();
    const [userName, setUserName] = useState();
    const token = localStorage.getItem('token');
    useEffect(() => {

        const token = localStorage.getItem('token');


        fetch(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            //ここでtokenの期限が切れたときにtokenを捨てて、/loginに移動させる。
            .then((response) => {

                if (response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;                     //このreturnで処理を終わらせている。
                }
                return response.json();
            })
            .then((data) => {
                if (!data) return;              //データがないなら処理終わる
                console.log('書籍データ', data);
                setBooks(data);
            });
    }, [offset]);

    fetch('https://railway.bookreview.techtrain.dev/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .then((data) => setUserName(data.name));

    return (
        <div className='bg-lime-400' >
            <div className="max-w-4xl mx-auto p-8 " >
                <Header />
                <div className='grid grid-cols-1 gap-4'>
                    {books.map((book) => (
                        <BookItem key={book.id} book={book} userName={userName} />
                    ))}
                </div>
                <Pagenation />
            </div>
        </div>
    )
}
export default BookList;