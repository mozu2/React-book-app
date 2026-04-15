import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



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
                        <span className=" text-2xl">{userName}</span>
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