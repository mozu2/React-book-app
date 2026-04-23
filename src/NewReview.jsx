import { useEffect } from "react"
import { useForm } from "react-hook-form";

const NewReview = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const token = localStorage.getItem('token');

    const submit = async (data) => {
        const response = await fetch('https://railway.bookreview.techtrain.dev/books', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    }

    return (
        <div>
            <form action="">
                <label htmlFor="">書籍タイトル</label>
                <input
                    id="title"
                    type="text"
                    className=""
                    {...register("title", {
                        required: "タイトルを入力してください"
                    })}
                />{errors.title && <p>{errors.title.message}</p>}
                <label htmlFor="">書籍URL</label>
                <input type="text"
                    id="book_url"
                    className=""
                    {...register("book_url", {
                        required: "書籍URLを入力してください"
                    })}
                />
                <label htmlFor="">書籍詳細</label>
                <textarea type="text"
                    id="book_ditails"
                    className=""
                    {...register("book_ditails", {
                        required: "書籍詳細を入力してください。"
                    })} />
                <label htmlFor="">読んだ感想</label>
                <input type="text"
                    id="comment"
                    className=""
                    {...register("comment", {
                        required: "感想を書いてください。"
                    })} />
            </form>
        </div>
    )
}