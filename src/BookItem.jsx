const BookItem = ({ book }) => {
    return (


        <div key={book.id} className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl text-black font-bold'>{book.title}</h2>
            <a href={book.url} className='text-blue-500 mt-2 hover:text-blue-900 transition duration-200'>{book.url}</a>
            <p className='text-gray-700 mt-2'>{book.detail}</p>
            <p className='text-gray-400 mt-2'>{book.review}</p>
        </div>


    )
};

export default BookItem;