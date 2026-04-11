const Home = () => {

    return (
        <>
            <div className="text-blue-500  text-xl flex flex-col items-center justify-center h-screen">
                <a href="/login" className="mb-8 hover:text-blue-900 transition duration-200">ログイン</a>
                <a href="/signup" className="hover:text-blue-900 transition duration-200">初めての方は</a>
            </div>
        </>
    );

};

export default Home;