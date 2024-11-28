import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './Profile.module.css';
import { USER_BASE_URL } from "../../endpoints/Appurls";
import { useNavigate } from 'react-router-dom';
import { UPDATE_ACCOUNT } from '../../routes/AppRoutes';

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const user = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, [])

  const getUser = () => {
    axios.get(`${USER_BASE_URL}/${user.userId}`).then((data) => {
      console.log(data);
      setProfileData(data.data);

    }).catch((error) => {
      console.log(error);

    })
  }

  const handleUpdate = () => {
    navigate(`${UPDATE_ACCOUNT}/${user.userId}`)
  };

  return (
    <div className={styles.cardprofile}>
      <fieldset>
        <legend className={styles.profile}>My Profile</legend>
        <ul>
          <li><b>FirstName:</b> <span>{profileData.firstName}</span></li>
          <li><b>LastName:</b> <span>{profileData.lastName}</span></li>
          <li><b>Email:</b> <span>{profileData.email}</span></li>
          <li><b>MobileNumber:</b> <span>{profileData.mobileNumber}</span></li>
          <li><b>Is Active:</b> <span>{profileData.active === false ? 'NO' : 'YES'}</span></li>
          <li>
            <b>Update:</b>
            <span>
              <i className="fa-solid fa-pen-to-square" onClick={() => handleUpdate()}></i>
            </span>
          </li>
        </ul>
      </fieldset>
    </div>
  );
}
