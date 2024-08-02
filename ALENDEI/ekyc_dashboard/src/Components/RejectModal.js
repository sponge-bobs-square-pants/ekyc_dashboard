// src/Components/Modal.js
import React, { useState } from 'react';
import './Modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { RejectUser } from '../features/UserThings/approvalSlice';

const Modal = ({ title, onClose, onConfirm, userId }) => {
  const [reason, setReason] = useState('');
  const dispatch = useDispatch();
  const { selectedUserId } = useSelector((store) => store.user);
  const handleConfirm = () => {
    dispatch(RejectUser({ userId, reason }));
    // onConfirm(reason);
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <button className='close-button' onClick={onClose}>
          &times;
        </button>
        <h2 className='capitalize'>
          <b>{title}</b>
        </h2>
        <p>Please select a reason for rejection:</p>
        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          <option value='' disabled>
            Please select a reason
          </option>
          <option value='AddressProof'>AADHAR Verification</option>
          <option value='ImageVerification'>SELFIE Verification</option>
          <option value='PanVerification'>PAN Verification</option>
        </select>
        <button
          onClick={handleConfirm}
          disabled={reason.length === 0 ? true : false}
          className={`${reason.length === 0 ? 'ModalDisable' : ''}`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
