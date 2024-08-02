import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  resetState,
  fetchSingleUser,
  changeView,
  VerifiedUsers,
  PendingUsers,
  failedVerification,
  setSelectedUserId,
  fetchSingleUserPAN,
  setTabViewed,
} from '../features/Users/usersSlice';
import Loading from '../Components/Loading';
import ErrorPage from '../Components/ErrorPage';
import './dashboard.css';
import Alendei from '../Assets/Alendei1.png';
import Users from '../Components/Users';
import UserDetailsPopup from '../Components/UserDetailsPopup';
import { MdVerified } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import LoadingDefault from '../Components/LoadingDefault';
import { MdPendingActions } from 'react-icons/md';
import { GrDocumentExcel } from 'react-icons/gr';
import { CheckForm } from '../features/form/formSlice';
import { useNavigate } from 'react-router';
import UserProfile from '../Components/UserProfile';
const Dashboard = () => {
  const dispatch = useDispatch();
  const { isPending, isLoaded, isError, users, view, selectedUserId } =
    useSelector((store) => store.user);
  const { loginStatus } = useSelector((store) => store.form);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const navigate = useNavigate();
  // const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(CheckForm());
  }, []);
  //UPDATE HERE
  useEffect(() => {
    setIsContentLoading(true);
    if (view === 'ALL_USERS') {
      dispatch(fetchUsers()).finally(() => setIsContentLoading(false));
    } else if (view === 'VERIFIED_USER') {
      dispatch(VerifiedUsers()).finally(() => setIsContentLoading(false));
    } else if (view === 'PENDING_VERIFICATION') {
      dispatch(PendingUsers()).finally(() => setIsContentLoading(false));
      // setIsContentLoading(false);
    } else if (view === 'VERIFICATION_FAILED') {
      dispatch(failedVerification()).finally(() => setIsContentLoading(false));
      // setIsContentLoading(false);
    }
  }, [dispatch, view]);

  const handleMoreDetailsClick = (userId) => {
    dispatch(setSelectedUserId(userId));
    if (userId !== null) {
      dispatch(fetchSingleUserPAN({ userId }));
      dispatch(setTabViewed({ userId: userId, tab: 'tab1' }));
    }

    // dispatch(fetchSingleUser(userId));
  };

  const changeViews = (newView) => {
    dispatch(changeView(newView));
  };

  // const handleClosePopup = () => {
  //   setSelectedUserId(null);
  // };

  const viewLabels = {
    ALL_USERS: 'All Users',
    VERIFIED_USER: 'Verified Users',
    PENDING_VERIFICATION: 'Pending Users',
    VERIFICATION_FAILED: 'Verification Failed User',
  };

  if (isPending && !isLoaded) {
    return (
      <div className='dashboard-container'>
        <div className='left-nav'>{/* Left Navbar */}</div>
        <div className='main-content'>
          <div className='top-nav'>
            <img
              src={Alendei}
              alt='Alendei Logo'
              style={{ height: '40px', marginLeft: '-12px' }}
            />
          </div>
          <div className='content'>
            <LoadingDefault />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='dashboard-container'>
        <div className='left-nav'>
          <div className='tooltip-container'>
            <button
              className='sideButton'
              onClick={() => changeViews('ALL_USERS')}
              style={{
                paddingLeft: '0px',
                marginLeft: '-10px',
                paddingRight: '10px',
              }}
            >
              <FaUsers
                className={
                  view === 'ALL_USERS' ? 'icon-active' : 'icon-inactive'
                }
                style={{ marginTop: '80px', marginLeft: '10px' }}
              />
            </button>
            <span className='tooltip' style={{ marginTop: '-13px' }}>
              View Users
            </span>
          </div>
          <div className='tooltip-container'>
            <button
              className='sideButton'
              onClick={() => changeViews('VERIFIED_USER')}
            >
              <MdVerified
                className={
                  view === 'VERIFIED_USER' ? 'icon-active' : 'icon-inactive'
                }
                style={{ marginTop: '20px' }}
              />
            </button>
            <span className='tooltip' style={{ marginTop: '30px' }}>
              Verified Users
            </span>
          </div>
          <div className='tooltip-container'>
            <button
              className='sideButton'
              onClick={() => changeViews('PENDING_VERIFICATION')}
            >
              <MdPendingActions
                className={
                  view === 'PENDING_VERIFICATION'
                    ? 'icon-active'
                    : 'icon-inactive'
                }
                style={{ marginTop: '20px' }}
              />
            </button>
            <span className='tooltip' style={{ marginTop: '30px' }}>
              Pending Users
            </span>
          </div>
          <div className='tooltip-container'>
            <button
              className='sideButton'
              onClick={() => changeViews('VERIFICATION_FAILED')}
            >
              <GrDocumentExcel
                className={
                  view === 'VERIFICATION_FAILED'
                    ? 'icon-active'
                    : 'icon-inactive'
                }
                style={{ marginTop: '20px' }}
              />
            </button>
            <span className='tooltip' style={{ marginTop: '30px' }}>
              Failed
            </span>
          </div>
        </div>
        <div className='main-content'>
          <div className='top-nav'>
            <img
              src={Alendei}
              alt='Alendei Logo'
              style={{ height: '40px', marginLeft: '-12px' }}
            />
          </div>
          <div className='content'>
            <ErrorPage /> {/* Error page for the content area */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='dashboard-container'>
      <div className='left-nav'>
        <div className='tooltip-container'>
          <button
            className='sideButton'
            onClick={() => changeViews('ALL_USERS')}
            style={{
              paddingLeft: '0px',
              marginLeft: '-10px',
              paddingRight: '10px',
            }}
          >
            <FaUsers
              className={view === 'ALL_USERS' ? 'icon-active' : 'icon-inactive'}
              style={{ marginTop: '80px', marginLeft: '10px' }}
            />
          </button>
          <span className='tooltip' style={{ marginTop: '-13px' }}>
            View Users
          </span>
        </div>
        <div className='tooltip-container'>
          <button
            className='sideButton'
            onClick={() => changeViews('VERIFIED_USER')}
          >
            <MdVerified
              className={
                view === 'VERIFIED_USER' ? 'icon-active' : 'icon-inactive'
              }
              style={{ marginTop: '20px' }}
            />
          </button>
          <span className='tooltip' style={{ marginTop: '30px' }}>
            Verified Users
          </span>
        </div>
        <div className='tooltip-container'>
          <button
            className='sideButton'
            onClick={() => changeViews('PENDING_VERIFICATION')}
          >
            <MdPendingActions
              className={
                view === 'PENDING_VERIFICATION'
                  ? 'icon-active'
                  : 'icon-inactive'
              }
              style={{ marginTop: '20px' }}
            />
          </button>
          <span className='tooltip' style={{ marginTop: '30px' }}>
            Pending Users
          </span>
        </div>
        <div className='tooltip-container'>
          <button
            className='sideButton'
            onClick={() => changeViews('VERIFICATION_FAILED')}
          >
            <GrDocumentExcel
              className={
                view === 'VERIFICATION_FAILED' ? 'icon-active' : 'icon-inactive'
              }
              style={{ marginTop: '20px', fontSize: '1.1rem' }}
            />
          </button>
          <span className='tooltip' style={{ marginTop: '30px' }}>
            Failed
          </span>
        </div>
      </div>
      <div className='main-content'>
        <div className='top-nav'>
          <img
            src={Alendei}
            alt='Alendei Logo'
            style={{ height: '40px', marginLeft: '-12px' }}
            onClick={() => navigate('/dashboard')}
          />
          <UserProfile />
        </div>
        <div className='content'>
          {isContentLoading ? (
            <LoadingDefault /> // Show loading indicator for content area
          ) : (
            <>
              <p className='pb-4'>{viewLabels[view]}</p>
              <div className='user-list'>
                {users.map((user, index) => (
                  <Users
                    key={user._id}
                    user={user}
                    index={index}
                    onMoreDetailsClick={handleMoreDetailsClick}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {selectedUserId && (
        <UserDetailsPopup
          userDetails={users}
          onClose={() => handleMoreDetailsClick(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
