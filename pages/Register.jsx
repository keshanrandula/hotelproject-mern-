import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-container">
        <h2 className="auth-title">Create Account</h2>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            className="auth-input"
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <input
            className="auth-input"
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button className="auth-button" type="submit">Register</button>
        </form>
        <div className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;