import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './UserProfile.css';

const UserProfile = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='user-profile' onClick={toggleDropdown}>
      <img
        src='https://via.placeholder.com/40' // Replace with user's profile picture if available
        alt='Profile'
        className='profile-picture'
      />
      <span className='username'>{username}</span>
      {isDropdownOpen && (
        <div className='dropdown-menu'>
          <button onClick={() => console.log('Profile')}>Profile</button>
          <button onClick={() => console.log('Settings')}>Settings</button>
          <button onClick={() => console.log('Logout')}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
