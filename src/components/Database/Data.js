import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Data.module.css';
import { USER_BASE_URL } from '../../endpoints/Appurls';
export default function Data() {
  const [users, setUsers] = useState([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <>
      <div className={styles.database}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.mobileNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
