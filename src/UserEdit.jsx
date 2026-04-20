import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"


const UserEdit = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const {
        reginster,
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
            .then((response) => response.data)
            .then((data) => {
                setValue('name', data.name);
            });
    }, []);


    return (
        <div>
            <h1>ユーザ情報</h1>
            <form action="">
                <label htmlFor="">ユーザ名</label>
                <input
                    id="name"
                    type="text"
                    className=""
                    {...register('name', {
                        required: '新しい名前を入力してください。' //同じなまえなら変更しない方がよいと考えたが、仕様には指示がないため、作成しない方向で
                    }

                    )} />{errors.name && <p>{errors.name.message}</p>}
                <button
                    type="submit"
                    className="">
                    更新をする。
                </button>
            </form>
        </div>
    )
};
export default UserEdit;