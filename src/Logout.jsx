import { useNavigate } from "react-router-dom";


const Logout = () => {

    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('token');

        navigate('/login');
    }
    return (
        <button onClick={handleLogout} className=" px-2 py-2 bg-red-400 mb-2">ログアウト</button>
    )
}


export default Logout;