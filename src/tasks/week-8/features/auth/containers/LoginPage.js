import React, { useCallback, useState } from 'react';
import { login } from '../slices/currentUserSlice'
import { useDispatch } from "react-redux";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitForm = useCallback(e => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(login({ email, password }))
  }, [email, password]);

  return (
    <div className='login-page'>
      <form onSubmit={submitForm}>
        <div>Login Form</div>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" value={email} onChange={e => setPassword(e.target.value)}/>
        <input type="submit" />
      </form>
    </div>
  );
}

export default LoginPage;
