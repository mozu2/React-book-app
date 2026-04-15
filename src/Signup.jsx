
import { useForm } from 'react-hook-form';
import Compressor from 'compressorjs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const navigate = useNavigate();

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.8,
                success(result) {
                    resolve(result);
                },
                error(err) {
                    reject(err);
                },
            });
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/books');
        }
    })

    const {
        setError,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();




    const submit = async (data) => {

        const file = data.icon[0];
        console.log('圧縮前', file.size);


        const compressedFile = await compressImage(file);
        console.log('圧縮後', compressedFile.size);
        //メールアドレスとパスワードを送る
        const response = await fetch('https://railway.bookreview.techtrain.dev/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        const token = result.token;
        localStorage.setItem('token', token);

        const formData = new FormData();
        formData.append('icon', compressedFile)

        const iconResponse = await fetch('https://railway.bookreview.techtrain.dev/uploads', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });


        //APIが２００を返さないときに発動する
        if (!response.ok) {
            const errorInfo = await response.json();

            //APIのresponse: の部分に書かれているエラーから決める。
            if (response.status === 409) {
                setError('email',
                    {
                        type: 'manual',
                        message: errorInfo.ErrorMessageJP
                    });
            }
            return;
        }
        alert('登録が完了しました。');
    };

    return (
        <>

            <form onSubmit={handleSubmit(submit)}>
                <h1 className='text-2xl text-center mt-6 '>新規登録作成</h1>
                <div className='text-xl flex flex-col items-center justify-center h-screen '>
                    <label htmlFor="">名前</label>
                    <input type="text" id='name' className='bg-gray-200 mb-5'
                        {...register('name', {
                            required: '名前を入力してください。',
                            string: 'str型にしてください'
                        })} />{errors.name && <span>{errors.name.message}</span>}
                    <label htmlFor="password">パスワード</label>
                    <input id="password" type="password" className='bg-gray-200 mb-5'
                        {
                        ...register('password', {
                            required: 'パスワードを入力してください',
                            string: 'str型にしてください'
                        })
                        } />{errors.password && <span>{errors.password.message}</span>}
                    <label htmlFor="">メールアドレス</label>
                    <input type="email" className='bg-gray-200 mb-5' {...register("email", {
                        required: 'メールアドレスを入力してください。',
                        string: 'str型にしてください'
                    })} />{errors.email && <span>{errors.email.message}</span>}
                    <button type='submit' className='px-5 py-3 rounded-md mx-auto block mb-5 bg-green-200 hover:bg-green-400 transition duration-200'>送信</button>

                    <label >アイコン</label>
                    <input className='text-blue-500 hover:text-blue-900 transition duration-200' type="file"{...register('icon', {
                        validate: {
                            isPngOrJpeg: (files) => ["image/png", "image/jpeg"].includes(files[0]?.type) || "jpegかpngにしてください。",
                            maxSize: (files) => files[0].size <= 1024 * 1024 || "1MB以下のファイルを選択してください。"

                        }
                    })} /> {errors.icon?.message && (<small>{errors.icon.message}</small>)}

                </div >
            </form>

        </>
    );

};

export default Signup;

