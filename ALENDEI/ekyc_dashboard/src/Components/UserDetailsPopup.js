import React, { useState } from 'react';
import './UserDetailsPopup.css';
import { useDispatch, useSelector } from 'react-redux';
import LoadingDefault from './LoadingDefault';
import {
  fetchSingleUserAadhar,
  fetchSingleUserPAN,
  fetchSingleUserSelfie,
  setTabViewed,
} from '../features/Users/usersSlice';

const UserDetailsPopup = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const { PANDetails, selectedUserId, AadharDetails, SelfieDetails } =
    useSelector((store) => store.user);
  const dispatch = useDispatch();
  if (!PANDetails) {
    return null;
  }
  const {
    FirstName,
    MiddleName,
    LastName,
    PANNumber,
    UserPanImage,
    DOB,
    isPanLoading,
  } = PANDetails;
  const {
    isAadharLoading,
    AadharNumber,
    AadharName,
    Street1,
    Street2,
    City,
    Pincode,
    AadharImage,
  } = AadharDetails;
  const { isSelfieLoading, UserOTP, SelfieImage } = SelfieDetails;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'tab1') {
      dispatch(fetchSingleUserPAN({ userId: selectedUserId }));
    }
    if (tab === 'tab2') {
      dispatch(setTabViewed({ userId: selectedUserId, tab: 'tab2' }));
      dispatch(fetchSingleUserAadhar({ userId: selectedUserId }));
    }
    if (tab === 'tab3') {
      dispatch(setTabViewed({ userId: selectedUserId, tab: 'tab3' }));
      dispatch(fetchSingleUserSelfie({ userId: selectedUserId }));
    }
  };

  const getValueAndStyle = (value) => {
    const borderColor = value === null ? 'red' : '';
    return {
      value: value === null ? 'NOT FILLED' : value,
      borderColor,
    };
  };
  const renderImageOrPlaceholder = (imageSrc) => {
    return imageSrc ? (
      <img src={imageSrc} alt='User Aadhar' />
    ) : (
      <div className='placeholder-image'>NOT UPLOADED</div>
    );
  };

  return (
    <div className='popup-overlay'>
      <div className='popup-content'>
        <button className='close-button' onClick={onClose}>
          ×
        </button>
        <div className='tabs'>
          <button
            className={activeTab === 'tab1' ? 'active' : ''}
            onClick={() => handleTabClick('tab1')}
          >
            PAN CARD
          </button>
          <button
            className={activeTab === 'tab2' ? 'active' : ''}
            onClick={() => handleTabClick('tab2')}
          >
            AADHAR CARD
          </button>
          <button
            className={activeTab === 'tab3' ? 'active' : ''}
            onClick={() => handleTabClick('tab3')}
          >
            SELFIE DETAILS
          </button>
        </div>
        <div className='tab-content'>
          {activeTab === 'tab1' && (
            <div className='tab1-content'>
              {isPanLoading ? (
                <div className='loading-overlay' style={{ marginTop: '25%' }}>
                  <LoadingDefault />
                </div>
              ) : (
                <>
                  <div className='text-content'>
                    <div className='form-row'>
                      <label>First Name:</label>
                      <input type='text' value={FirstName} readOnly />
                    </div>
                    <div className='form-row'>
                      <label>Middle Name:</label>
                      <input type='text' value={MiddleName} readOnly />
                    </div>
                    <div className='form-row'>
                      <label>Last Name:</label>
                      <input type='text' value={LastName} readOnly />
                    </div>
                    <div className='form-row'>
                      <label>PAN Number:</label>
                      <input type='text' value={PANNumber} readOnly />
                    </div>
                    <div className='form-row'>
                      <label>Date of Birth:</label>
                      <input
                        type='text'
                        value={new Date(DOB).toLocaleDateString()}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className='image-content'>
                    <img src={UserPanImage} alt='User PAN' />
                  </div>
                </>
              )}
            </div>
          )}
          {activeTab === 'tab2' && (
            <div className='tab2-content'>
              {isAadharLoading ? (
                <div className='loading-overlay' style={{ marginTop: '25%' }}>
                  <LoadingDefault />
                </div>
              ) : (
                <>
                  <div className='text-content'>
                    <div className='form-row'>
                      <label>Aadhar Number:</label>
                      <input
                        type='text'
                        value={getValueAndStyle(AadharNumber).value}
                        readOnly
                        style={{
                          borderColor:
                            getValueAndStyle(AadharNumber).borderColor,
                        }}
                      />
                    </div>
                    <div className='form-row'>
                      <label>Name:</label>
                      <input
                        type='text'
                        value={getValueAndStyle(AadharName).value}
                        readOnly
                        style={{
                          borderColor: getValueAndStyle(AadharName).borderColor,
                        }}
                      />
                    </div>
                    <div className='form-row'>
                      <label>Street 1:</label>
                      <input
                        type='text'
                        value={getValueAndStyle(Street1).value}
                        readOnly
                        style={{
                          borderColor: getValueAndStyle(Street1).borderColor,
                        }}
                      />
                    </div>
                    <div className='form-row'>
                      <label>Street 2:</label>
                      <input
                        type='text'
                        value={getValueAndStyle(Street2).value}
                        readOnly
                        style={{
                          borderColor: getValueAndStyle(Street2).borderColor,
                        }}
                      />
                    </div>
                    <div className='form-row'>
                      <label>City:</label>
                      <input
                        type='text'
                        value={getValueAndStyle(City).value}
                        readOnly
                        style={{
                          borderColor: getValueAndStyle(City).borderColor,
                        }}
                      />
                    </div>
                    <div className='form-row'>
                      <label>Pincode:</label>
                      <input
                        type='text'
                        value={getValueAndStyle(Pincode).value}
                        readOnly
                        style={{
                          borderColor: getValueAndStyle(Pincode).borderColor,
                        }}
                      />
                    </div>
                  </div>
                  <div className='image-content'>
                    {renderImageOrPlaceholder(AadharImage)}
                  </div>
                </>
              )}
            </div>
          )}
          {activeTab === 'tab3' && (
            <div className='tab2-content'>
              {isSelfieLoading ? (
                <div className='loading-overlay' style={{ marginTop: '25%' }}>
                  <LoadingDefault />
                </div>
              ) : (
                <>
                  <div className='text-content'>
                    <div className='form-row'>
                      <label>User OTP:</label>
                      <input
                        type='text'
                        value={getValueAndStyle(UserOTP).value}
                        readOnly
                        style={{
                          borderColor: getValueAndStyle(UserOTP).borderColor,
                        }}
                      />
                    </div>
                  </div>
                  <div className='image-content'>
                    {renderImageOrPlaceholder(SelfieImage)}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPopup;
