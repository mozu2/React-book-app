
import { useForm } from 'react-hook-form'


const Signup = () => {




    const {
        setError,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submit = async (data) => {


        const response = await fetch('https://railway.bookreview.techtrain.dev/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });



        if (!response.ok) {
            const errorInfo = await response.json();

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
                <h1>新規登録作成</h1>
                <label htmlFor="">名前：</label>
                <input type="text" id='name'
                    {...register('name', {
                        required: '名前を入力してください。'
                    })} />{errors.name && <span>{errors.name.message}</span>}
                <label htmlFor="password">パスワード：</label>
                <input id="password" type="password"
                    {
                    ...register('password', {
                        required: 'パスワードを入力してください',
                    })
                    } />{errors.password && <span>{errors.password.message}</span>}
                <label htmlFor="">メールアドレス：</label>
                <input type="email" {...register("email", {
                    required: 'メールアドレスを入力してください。'
                })} />{errors.email && <span>{errors.email.message}</span>}
                <button type='submit'>送信</button>
            </form>
        </>
    );

};

export default Signup;