import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditReview = () => {



    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { id } = useParams();


    //データ取得用（まだ未実装)

    useEffect(() => {
        fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setValue('title', data.title);
                setValue('url', data.url);
                setValue('detail', data.detail);
                setValue('review', data.review);
            })
    }, [])

    const submit = async (data) => {
        //編集用
        const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("修正いたしました。");
            navigate("/books");
        } else {
            alert("修正に失敗した。");
            navigate("/books");
        };
    }

    const handleDelete = async () => {
        const deleted = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (deleted.ok) {
            alert("削除しました。")
        } else {
            alert("削除できませんでした。")
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
                >更新する
                </button>
            </form>
            <button onClick={handleDelete}>削除する</button>
        </div>
    )
}; export default EditReview;