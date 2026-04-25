import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";



const Header = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');


    useEffect(() => {

        if (!token) return;

        fetch('https://railway.bookreview.techtrain.dev/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

            .then((response) => response.json())
            .then((data) => {
                setUserName(data.name);
            })
    }, []);
    return (
        <>
            <header>
                <div>
                    {token ? (
                        <div className="flex justify-between">
                            <span className=" text-2xl">{userName}</span>
                            <Link to="/profile" className="bg-blue-400 mb-2 px-2 py-2">名前の変更</Link>
                            <Link to="/newreview" className="bg-purple-400 mb-2 py-2 px-2" >新規投稿</Link>
                            <Logout />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <p>現在ログインできていない状態です</p>
                            <button
                                onClick={() => navigate('/login')}
                                className="text-xl text-red-700 bg-blue-400 ">
                                ログインはこちらから
                            </button>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header;