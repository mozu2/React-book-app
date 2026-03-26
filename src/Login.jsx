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
        <form onSubmit={handleSubmit(onsubmit)}>
            <label >パスワード</label>
            <input {...register('password', { required: '名前を入力してください' })} />
            {errors.password && <p>{errors.password.message}</p>}
            <label >メールアドレス</label>
            <input {...register('email', { required: 'メールを入力してください' })} />
            {errors.email && <p>{errors.email.message}</p>}

            <button type="submit">送信</button>
        </form>
    );
};

export default Login;