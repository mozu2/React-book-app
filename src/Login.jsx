import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import Signup from './Signup';
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); //こっちは以前に保存したtokenを取り出す
        if (token) {
            navigate('/books');
        }
    }, []);
    const onsubmit = async (data) => {

        const response = await fetch('https://railway.bookreview.techtrain.dev/signin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${data.email}:${data.password}`) //あってもなくても挙動変わらない
            },
            body: JSON.stringify(data)

        });

        const result = await response.json();
        const token = result.token; //こっちは新しくtokenを受け取る



        if (response.ok) {
            alert('ログインが完了しました。');
            localStorage.setItem('token', token);
            navigate('/books');
        } else {
            alert('ログインに失敗しました。');
        }

    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <>
            <div className='text-xl flex flex-col items-center justify-center h-screen '>
                <form onSubmit={handleSubmit(onsubmit)} noValidate>
                    <div className='flex flex-col'>

                        <label htmlFor="password">パスワード</label>
                        <input id='password' className='bg-gray-200 mb-5'
                            type="password"  {...register('password', {
                                required: 'パスワードを入力してください',

                            })} />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className='flex flex-col'>

                        <label htmlFor="email">メールアドレス</label>
                        <input
                            id='email'
                            type='email'
                            className='bg-gray-200 mb-5'
                            {...register('email', {
                                required: 'メールアドレスを入力してください',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: '有効なメールアドレスを設定して。'
                                }
                            })} />
                        {errors.email && <p>{errors.email.message}</p>}

                    </div>
                    <button type="submit" className='px-5 py-3 rounded-md mx-auto block mb-5 bg-green-200 hover:bg-green-400 transition duration-200'>送信</button>
                </form >
                <a href='/signup' className='text-blue-500 hover:text-blue-900 transition duration-200'>登録はこちらから</a>
            </div>
        </>
    );
};

export default Login;