import { useForm } from 'react-hook-form'

const Login = () => {

    const onsubmit = (data) => {
        console.log("送信されたデータ:", data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <form onSubmit={handleSubmit(onsubmit)} noValidate>
            <label htmlFor="password">パスワード</label>
            <input id='password'
                type="password"  {...register('password', {
                    required: 'パスワードを入力してください',

                })} />
            {errors.password && <p>{errors.password.message}</p>}
            <label htmlFor="email">メールアドレス</label>
            <input
                id='email'
                type='email'
                {...register('email', {
                    required: '正しいメールを入力してください',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: '有効なメールアドレスを設定して。'
                    }
                })} />
            {errors.email && <p>{errors.email.message}</p>}

            <button type="submit">送信</button>
        </form >
    );
};

export default Login;