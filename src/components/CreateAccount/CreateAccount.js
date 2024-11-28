import React, { useState, useEffect } from 'react';
import styles from './CreateAccount.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { LOGIN, PROFILE } from '../../routes/AppRoutes';
import { USER_BASE_URL, USER_CREATE_URL, USER_UPDATE_URL } from '../../endpoints/Appurls';

export default function CreateAccount() {
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const user = JSON.parse(localStorage.getItem('userData'));  

  useEffect(() => {
    if (params.id) {
      getUser();
    }
  }, [params.id]);

  const validateForm = () => {
    const errors = {};

    // First Name
    if (!formData.firstName) {
      errors.firstName = 'First Name is required';
    }

    // Last Name
    if (!formData.lastName) {
      errors.lastName = 'Last Name is required';
    }

    // Email validation
    if (!params.id && !formData.email) {
      errors.email = 'Email is required';
    } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Mobile Number validation
    if (!formData.mobileNumber) {
      errors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = 'Mobile Number must be 10 digits';
    }

    setFormErrors(errors);

    // Return true if no errors
    return Object.keys(errors).length === 0;
  };

  const getUser = () => {
    axios.get(`${USER_BASE_URL}/${parseInt(params.id)}`)
      .then((res) => {
        const { firstName, lastName, email, password, mobileNumber } = res.data;
        setFormData({
          firstName,
          lastName,
          email,
          password,
          mobileNumber
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const form = formData;
    if (!params.id) {
      handleCreateAccount(form);
    } else {
      handleUpdateAccount(form);
    }
  };

  const handleCreateAccount = (form) => {
    axios.post(`${USER_BASE_URL}/${USER_CREATE_URL}`, form)
      .then((data) => {
        navigate(LOGIN);
      })
      .catch((error) => {
        setErrors(error.response?.data?.description || 'An error occurred');
      });
  };

  const handleUpdateAccount = (form) => {
    axios.put(`${USER_BASE_URL}/${USER_UPDATE_URL}/${parseInt(params.id)}`, form)
      .then((data) => {
        navigate(PROFILE);
      })
      .catch((error) => {
        setErrors(error.response?.data?.description || 'An error occurred');
      });
  };

  return (
    <>
      <form className={styles.createaccount} onSubmit={handleSubmit}>

        <h3>{!params.id ? 'Create Account' : 'Update Account'}</h3>
        {errors && typeof errors === 'string' && <div className="errors">{errors}</div>}

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="form-control"
          />
          {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="form-control"
          />
          {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="form-control"
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
          <label>Mobile Number</label>
          <input
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
            className="form-control"
          />
          {formErrors.mobileNumber && <span className="error">{formErrors.mobileNumber}</span>}
        </div>

        <div>
          <button type="submit">{!params.id ? 'Create Account' : 'Update Account'}</button>
        </div>
      </form>
    </>
  );
}
