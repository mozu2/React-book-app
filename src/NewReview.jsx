import { useEffect } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const NewReview = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submit = async (data) => {
        const response = await fetch('https://railway.bookreview.techtrain.dev/books', {

            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)


        });

        console.log(response.status);
        const result = await response.json();
        console.log(result);

        if (response.ok) {
            alert("投稿しました。");
            navigate("/books")
        } else {
            alert("投稿に失敗しました。")
        }
    }

    return (

        <div className=" text-xl bg-lime-400 h-screen flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
                <label htmlFor="title">書籍タイトル</label>
                <input
                    id="title"
                    type="text"
                    className="bg-gray-200"
                    {...register("title", {
                        required: "タイトルを入力してください"
                    })}
                />{errors.title && <p className="font-bold text-red-500">{errors.title.message}</p>}
                <label htmlFor="url">書籍URL</label>
                <input type="text"
                    id="url"
                    className="bg-gray-200"
                    {...register("url", {
                        required: "urlを入力してください。"
                    })}
                />{errors.url && <p className="font-bold text-red-500">{errors.url.message}</p>}
                <label htmlFor="detail">書籍詳細</label>
                <textarea type="text"
                    id="detail"
                    className="bg-gray-200"
                    {...register("detail", {
                        required: "書籍詳細を入力してください。"
                    })} />{errors.detail && <p className=" font-bold text-red-500">{errors.detail.message}</p>}
                <label htmlFor="review">読んだ感想</label>
                <input type="text"
                    id="review"
                    className="bg-gray-200"
                    {...register("review", {
                        required: "感想を書いてください。"
                    })} />{errors.review && <p className="font-bold text-red-500">{errors.review.message}</p>}

                <button
                    type="submit"
                    className="px-2 py-2 bg-blue-500 hover:bg-blue-800 rounded-full transition duration-500 "
                >投稿する
                </button>
            </form>
        </div>

    )
}; export default NewReview;