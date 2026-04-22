import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"


const UserEdit = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();


    //下でユーザ登録したときの名前を取得している。下でsetValueで入力フォームに現在の名前を入れる。そうすることで、UXの向上につながる
    useEffect(() => {
        fetch('https://railway.bookreview.techtrain.dev/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => response.json()) //リスポンスからjsonデータを取り出す json() の() があることで、json関数が実行される。　()がないとjsonという文字がdataに入る
            .then((data) => {
                setValue('name', data.name);
            });
    }, []);

    const submit = async (data) => {
        const response = await fetch('https://railway.bookreview.techtrain.dev/users', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('変更が完了しました。');
            navigate('/books');

        } else {
            alert(' 変更できませんでした');
        }
    };



    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-blod mb-6">ユーザ情報</h1>
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label htmlFor="">ユーザ名</label>
                    <input
                        id="name"
                        type="text"
                        className="bg-gray-300"
                        {...register('name', {
                            required: '新しい名前を入力してください。' //同じなまえなら変更しない方がよいと考えたが、仕様には指示がないため、作成しない方向で
                        }
                        )} />{errors.name && <p>{errors.name.message}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-300">
                    更新をする。
                </button>
            </form>
        </div>
    )
};
export default UserEdit;