import React, { useState } from 'react';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setUser }) => {
  const [isRegister, setIsRegister] = useState(false); // toggle login/register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only for registration
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await API.post('/auth/register', { name, email, password });
        alert('Registration successful! Please login.');
        setIsRegister(false);
      } else {
        const res = await API.post('/auth/login', { email, password });
        const userData = res.data;
        localStorage.setItem('token', userData.token);
        userData.isAdmin = isAdminLogin;
        setUser(userData);
        navigate('/dashboard');
      }
    } catch (err) {
      alert((err.response?.data?.message) || err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isRegister && (
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={isAdminLogin}
                onChange={(e) => setIsAdminLogin(e.target.checked)}
              />
              Login as Admin
            </label>
          )}
          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>
        <p className="toggle-link">
          {isRegister ? (
            <>
              Already have an account?{' '}
              <span onClick={() => setIsRegister(false)}>Login</span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span onClick={() => setIsRegister(true)}>Register</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
