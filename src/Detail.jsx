import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Detail = () => {

    const token = localStorage.getItem('token');
    const { id } = useParams();
    const [detail, setDetail] = useState({}); // ここに入るのはオブジェクトなので{} を使うらしい？
    const [load, setLoad] = useState(true);

    useEffect(() => {
        setLoad(true);
        fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

            .then((response) => response.json())
            .then((data) => {
                setDetail(data.detail);
                setLoad(false);
            })

    }, []);


    return (
        <div>
            {load ? (
                <div className="bg-lime-400 h-screen flex flex-col items-center justify-center">
                    <div className="bg-gray-200 w-1/2 h-1/2">
                        <h1 className="bg-blue-300 text-center text-3xl pt-10 pb-10">詳細について</h1>
                        <p className="text-center pt-10 text-xl">現在ロード中です</p>
                    </div>
                </div>
            ) : (
                <div className="bg-lime-400 h-screen flex flex-col items-center justify-center">
                    <div className="bg-gray-200 w-1/2 h-1/2">
                        <h1 className="bg-blue-300 text-center text-3xl pt-10 pb-10">詳細について</h1>
                        <p className="text-center pt-10 text-xl" >{detail}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Detail;