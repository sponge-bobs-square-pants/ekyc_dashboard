// src/Components/User.js
import React, { useState } from 'react';
import { FaExclamationCircle, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { approveUser } from '../features/UserThings/approvalSlice';
import RejectModal from './RejectModal';
import { setSelectedUserId } from '../features/Users/usersSlice';

const formatName = (name) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const Users = ({ user, index, onMoreDetailsClick }) => {
  const { view, tabViews } = useSelector((store) => store.user);
  const tabsViewed = tabViews[user._id] || {};
  const allTabsViewed = Object.values(tabsViewed).every(Boolean);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const handleRejectClick = (userId) => {
    setUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const isButtonDisabled =
    !allTabsViewed || Object.keys(tabsViewed).length === 0;
  return (
    <div className='userbox'>
      <button onClick={() => onMoreDetailsClick(user._id)}>
        <div className='flex items-center'>
          <img
            className='w-12 h-12 rounded-full mr-4'
            src={
              user.ProfilePhoto
                ? user.ProfilePhoto
                : `https://picsum.photos/200/300?random=${index}`
            }
            alt='User Avatar'
          />
          <div>
            <p className={`text-lg font-bold text-black user-name `}>
              {formatName(user.FirstName) +
                ' ' +
                formatName(user.MiddleName) +
                ' ' +
                formatName(user.LastName)}
            </p>
          </div>
        </div>
      </button>
      {view === 'ALL_USERS' ||
      view === 'VERIFIED_USER' ||
      view === 'VERIFICATION_FAILED' ? (
        <>
          <>
            <button
              className='moreDetails_all_users'
              onClick={() => onMoreDetailsClick(user._id)}
            >
              More Details
            </button>
          </>
        </>
      ) : (
        <>
          <div className='button-group'>
            <div className='tooltip-containers'>
              <button
                onClick={() => dispatch(approveUser({ userId: user._id }))}
                disabled={isButtonDisabled}
                className={`moreDetails ${isButtonDisabled ? 'disabled' : ''}`}
              >
                <p>Approve</p>
              </button>
              {isButtonDisabled && (
                <div className='tooltipss' style={{ width: '202px' }}>
                  <FaExclamationCircle className='icon' />
                  View all details to enable this
                </div>
              )}
            </div>

            <div className='tooltip-containers'>
              <button
                onClick={() => handleRejectClick(user._id)}
                // style={{ padding: '0.4rem 1.6rem' }}
                disabled={isButtonDisabled}
                className={`moreDetailsReject ${
                  isButtonDisabled ? 'disabled' : ''
                }`}
              >
                Reject
              </button>
              {isButtonDisabled && (
                <div className='tooltipss' style={{ width: '202px' }}>
                  <FaExclamationCircle className='icon' /> View all details to
                  enable this.
                </div>
              )}
            </div>
            {/* <FaUserTimes /> */}
          </div>
        </>
      )}
      {isModalOpen && (
        <RejectModal title='Reject User' onClose={closeModal} userId={userId}>
          <p>Are you sure you want to reject this user?</p>
          <button onClick={() => console.log('Rejected')}>Confirm</button>
          <button onClick={closeModal}>Cancel</button>
        </RejectModal>
      )}
    </div>
  );
};

export default Users;
