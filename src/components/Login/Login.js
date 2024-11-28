import React, { useState } from 'react';
import styles from "./Login.module.css";
import axios from 'axios';
import { USER_BASE_URL, USER_LOGIN_URL } from '../../endpoints/Appurls';
import { useNavigate } from 'react-router-dom';
import { HOME } from '../../routes/AppRoutes';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  
  const validateForm = () => {
    const errors = {}; // Initialize errors as an empty object

    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';

    setFormErrors(errors); // Update state with any errors

    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    if (!validateForm()) return;

    handleLogin(formData); // Passes formData directly
  };

  const handleLogin = (form) => {
    axios.post(`${USER_BASE_URL}/${USER_LOGIN_URL}`, form)
      .then((data) => {
        console.log(data);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userData', JSON.stringify(data.data));
        navigate(HOME);
      })
      .catch((error) => {
        console.error(error.response?.data || 'Login error');
        setErrors(error.response?.data?.message || 'An error occurred during login');
      });
  };

  return (
    <form className={styles.loginstyles} onSubmit={handleSubmit}>
      <h3>Login Account</h3>
      {errors && <div className="errors">{errors}</div>}
      <div>
        <label>Email Address</label>
        <input 
          type="email" 
          value={formData.email} 
          name="email" 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
        />
        {formErrors.email && <span className="error">{formErrors.email}</span>}
      </div>
      <div>
        <label>Password</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          className="form-control" 
        />
        {formErrors.password && <span className="error">{formErrors.password}</span>}
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
