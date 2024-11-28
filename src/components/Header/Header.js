import React from 'react'
import styles from "./Header.module.css"
import { CREATE_ACCOUNT, DATA, LOGIN, PROFILE } from '../../routes/AppRoutes'
import { Link, useNavigate } from 'react-router-dom';


export default function Header() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('isLoggedIn');
    navigate(LOGIN)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div>
            <h3>User Management</h3>
          </div>
          <div>
            <ul>
              {!isLoggedIn && <>
              <li><Link to={LOGIN}>Login</Link></li>
              <li><Link to={CREATE_ACCOUNT}>CreateAccount</Link></li>
              </>}
              {isLoggedIn && <>
                <li><Link to={DATA} >Database</Link></li>
                <li><Link to={PROFILE}>Profile</Link></li>
              </>}

              {isLoggedIn && <>
                <li><Link onClick={() => handleLogOut()}> Logout</Link></li>
              </>}

            </ul>
          </div>
        </div>
      </header>
    </>
  )
}
