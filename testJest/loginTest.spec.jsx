import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/Login';
import '@testing-library/jest-dom';



const setUp = () => {
    render(<Login />);
    const passwordElement = screen.getByLabelText('パスワード');
    const emailElement = screen.getByLabelText('メールアドレス');
    const submitbtn = screen.getByRole('button', { name: '送信' });
    return { passwordElement, emailElement, submitbtn };
};

test('要素が読み込まれているか。', () => {
    const { passwordElement, emailElement, submitbtn } = setUp();

    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveValue('');
    expect(passwordElement).toBeInTheDocument();
    expect(passwordElement).toHaveValue('');
    expect(submitbtn).toBeInTheDocument();
    expect(submitbtn).not.toBeDisabled();
});


test('空の場合', async () => {
    const { submitbtn } = setUp();
    fireEvent.click(submitbtn);
    await waitFor(() => {

    })
})