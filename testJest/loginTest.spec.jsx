import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/Login';
import '@testing-library/jest-dom';



const setUp = () => {
    render(<Login />);                                              //ここでまず必要な要素をまとめて作成している。
    const passwordElement = screen.getByLabelText('パスワード');
    const emailElement = screen.getByLabelText('メールアドレス');
    const submitbtn = screen.getByRole('button', { name: '送信' });
    return { passwordElement, emailElement, submitbtn };
};

test('要素が読み込まれているか。', () => {
    const { passwordElement, emailElement, submitbtn } = setUp();       //ここでsetUPで作成した、要素を取得さしている。

    expect(emailElement).toBeInTheDocument();               //これらは要素が存在するのかを確認している。
    expect(emailElement).toHaveValue('');
    expect(passwordElement).toBeInTheDocument();
    expect(passwordElement).toHaveValue('');
    expect(submitbtn).toBeInTheDocument();
    expect(submitbtn).not.toBeDisabled();
});


test('空の場合', async () => {
    const { submitbtn } = setUp();
    fireEvent.click(submitbtn);
    await waitFor(() => { // waitForをする理由はDOM表示されるのを待ってから、getByTextをする必要があるからである。
        expect(screen.getByText('メールアドレスを入力してください')).toBeInTheDocument();
        expect(screen.getByText('パスワードを入力してください')).toBeInTheDocument();
    })
});

test('有効なメールアドレスでない場合', async () => {
    const { emailElement, passwordElement, submitbtn } = setUp();

    fireEvent.change(passwordElement, { target: { value: '123' } });
    fireEvent.change(emailElement, { target: { value: 'aaa' } });

    fireEvent.click(submitbtn);
    await waitFor(() => {
        expect(screen.getByText('有効なメールアドレスを設定して。')).toBeInTheDocument();
    })
});

test('正しく動作する場合', async () => {
    const { emailElement, passwordElement, submitbtn } = setUp();

    fireEvent.change(passwordElement, { target: { value: '123' } });
    fireEvent.change(emailElement, { target: { value: 'test@gmail.com' } });
    fireEvent.click(submitbtn);

    await waitFor(() => {
        expect(screen.getByText('ログインに成功しました。')).toBeInTheDocument();
    })

});