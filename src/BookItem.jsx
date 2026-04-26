import { Link, useNavigate } from "react-router-dom";

const BookItem = ({ book }) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleClick = () => {
        fetch(`https://railway.bookreview.techtrain.dev/logs`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ selectBookId: book.id })

        })
        navigate(`/detail/${book.id}`);
    }

    return (
        <div key={book.id} className='relative bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl text-black font-bold'>{book.title}</h2>
            <a href={book.url} className='text-blue-500 mt-2 hover:text-blue-900 transition duration-200'>{book.url}</a>
            <p className='text-gray-700 mt-2'>{book.detail}</p>
            <p className='text-gray-400 mt-2'>{book.review}</p>
            <p onClick={handleClick} className=" absolute bottom-2 right-2 text-blue-500 hover:text-blue-900">詳細はこちらから</p>
        </div>
    )
};

export default BookItem;
