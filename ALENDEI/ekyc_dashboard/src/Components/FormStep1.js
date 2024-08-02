import React, { useState, useEffect } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { MdOutlineLock } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import { PiEyeClosedBold } from 'react-icons/pi';
import { RxCrossCircled } from 'react-icons/rx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import AlendeiImage from '../Assets/Alendei1.png';
import { useNavigate } from 'react-router-dom';
import {
  setFullName,
  setNameError,
  setPasswordError,
  setPassword,
  setContinues,
  submitForm,
} from '../features/form/formSlice';
import { useDispatch, useSelector } from 'react-redux';
const FormStep1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fullName, password, nameError, passwordError, continues, Login } =
    useSelector((store) => store.form);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    dispatch(setPassword(newPassword));
    const criteria = {
      length: newPassword.length >= 8,
      lowercase: /[a-z]/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      specialChar: /[@#$%^&*]/.test(newPassword),
    };
    setPasswordCriteria(criteria);

    // Update the continues state
    setContinues(Object.values(criteria).every((c) => c));
  };
  const handleContinue = (e) => {
    e.preventDefault();
    // sendStep1Data();
    dispatch(submitForm());
  };
  useEffect(() => {
    if (Login.isFulfilled) {
      navigate('/dashboard');
    }
  }, [Login.isFulfilled]);

  useEffect(() => {
    const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
    const shouldContinue = fullName.trim() !== '' && isPasswordValid;
    if (shouldContinue) {
      dispatch(setContinues(shouldContinue));
    }
  }, [fullName, passwordCriteria, dispatch]);

  return (
    <div
      className='relative h-screen flex'
      style={{ backgroundColor: '#e7f5ed' }}
    >
      <div className='flex-1 flex items-center justify-center formContainer'>
        <form
          className='bg-white pt-8 pb-8 rounded-lg shadow-md flex flex-col justify-start custom-border-radius overflow-y-auto pr-10 pl-10 relative form'
          onSubmit={handleContinue}
          style={{ width: '32vw', marginRight: '0vw' }}
        >
          <div className='flex justify-end'>
            <img
              src={AlendeiImage}
              alt='Alendei'
              className='h-20 w-30 sm:h-12 sm:w-auto'
            />
          </div>

          {/* WELCOME */}
          <div
            className='flex justify-start headertext'
            style={{ marginTop: '-22px' }}
          >
            <div className='w-full'>
              <h1 className='text-2xl mb-2 pb-0 text-left text-black font-poppins welcometext'>
                Welcome to
              </h1>
              <h1 className='text-3xl font-bold text-left mb-6 text-green-700 font-poppins AlendeiPlatforms'>
                Alendei Platforms
              </h1>
            </div>
          </div>

          {/* FULL NAME */}
          <div
            className={`mb-4 flex justify-start ${
              nameError ? 'input-error' : ''
            }`}
          >
            <div
              className={`w-full relative flex items-center custom-input-container textfield ${
                nameError ? 'focus:border-red-500' : ''
              }`}
            >
              <IoPersonCircleOutline
                className='text-black mr-2 ml-4 mt-1'
                size={24}
              />
              <input
                type='text'
                id='FullName'
                name='FullName'
                placeholder='Enter Your UserId'
                value={fullName}
                onChange={(e) => {
                  dispatch(setFullName(e.target.value));
                  dispatch(setNameError(false));
                }}
                className='block w-full py-2 px-3 custom-bottom-border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base bg-transparent text-black'
                style={{
                  paddingTop: '0.9rem',
                  paddingBottom: '0.9rem',
                  lineHeight: '1.5',
                }}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className='relative mb-4 flex flex-col justify-start'>
            <div
              className={`flex w-full relative items-center custom-input-container textfield ${
                passwordError ? 'input-error' : ''
              }`}
              style={{ minHeight: '3.5rem' }} // Ensure enough space
            >
              <MdOutlineLock className='text-black mr-2 ml-4 mt-1' size={24} />
              <input
                type={passwordVisible ? 'text' : 'password'}
                id='Password'
                name='Password'
                placeholder='Enter Your Password'
                value={password}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onChange={handlePasswordChange}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                className='block w-full py-2 px-3 custom-bottom-border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base bg-transparent text-black'
                style={{
                  paddingTop: '0.9rem',
                  paddingBottom: '0.9rem',
                  lineHeight: '1.5',
                }}
              />
              {passwordVisible ? (
                <FaRegEye
                  className='text-black mt-1 mr-4'
                  size={24}
                  onClick={() => setPasswordVisible(false)}
                />
              ) : (
                <PiEyeClosedBold
                  className='text-black mt-1 mr-4'
                  size={24}
                  onClick={() => setPasswordVisible(true)}
                />
              )}
            </div>
            {isPasswordFocused && (
              <div
                className={`absolute w-half p-2 rounded-md shadow-md z-10 bg-white ${
                  passwordCriteria.length &&
                  passwordCriteria.lowercase &&
                  passwordCriteria.uppercase &&
                  passwordCriteria.number &&
                  passwordCriteria.specialChar
                    ? 'hidden'
                    : ''
                }`}
                style={{ top: '-9.8rem', right: '0%', zIndex: 10 }}
              >
                <div className='flex flex-col' style={{ zIndex: 10 }}>
                  <div
                    className={`flex items-center mb-2 ${
                      passwordCriteria.length ? 'met' : 'unmet'
                    }`}
                  >
                    {!passwordCriteria.length ? (
                      <RxCrossCircled
                        style={{ color: 'red', fontSize: '16px' }}
                      />
                    ) : (
                      <IoMdCheckmarkCircleOutline
                        style={{ color: 'green', fontSize: '16px' }}
                      />
                    )}
                    <span className='text-sm tabbed'>
                      At least 8 characters
                    </span>
                  </div>
                  <div
                    className={`flex items-center mb-2 ${
                      passwordCriteria.lowercase ? 'met' : 'unmet'
                    }`}
                  >
                    {!passwordCriteria.lowercase ? (
                      <RxCrossCircled
                        style={{ color: 'red', fontSize: '18px' }}
                      />
                    ) : (
                      <IoMdCheckmarkCircleOutline
                        style={{ color: 'green', fontSize: '16px' }}
                      />
                    )}
                    <span className='text-sm tabbed'>One lowercase letter</span>
                  </div>
                  <div
                    className={`flex items-center mb-2 ${
                      passwordCriteria.uppercase ? 'met' : 'unmet'
                    }`}
                  >
                    {!passwordCriteria.uppercase ? (
                      <RxCrossCircled
                        style={{ color: 'red', fontSize: '18px' }}
                      />
                    ) : (
                      <IoMdCheckmarkCircleOutline
                        style={{ color: 'green', fontSize: '16px' }}
                      />
                    )}
                    <span className='text-sm tabbed'>One uppercase letter</span>
                  </div>
                  <div
                    className={`flex items-center mb-2 ${
                      passwordCriteria.number ? 'met' : 'unmet'
                    }`}
                  >
                    {!passwordCriteria.number ? (
                      <RxCrossCircled
                        style={{ color: 'red', fontSize: '18px' }}
                      />
                    ) : (
                      <IoMdCheckmarkCircleOutline
                        style={{ color: 'green', fontSize: '16px' }}
                      />
                    )}
                    <span className='text-sm tabbed'>One number</span>
                  </div>
                  <div
                    className={`flex items-center ${
                      passwordCriteria.specialChar ? 'met' : 'unmet'
                    }`}
                  >
                    {!passwordCriteria.specialChar ? (
                      <RxCrossCircled
                        style={{ color: 'red', fontSize: '18px' }}
                      />
                    ) : (
                      <IoMdCheckmarkCircleOutline
                        style={{ color: 'green', fontSize: '16px' }}
                      />
                    )}
                    <span className='text-sm tabbed'>
                      One special character (@, #, $)
                    </span>
                  </div>
                </div>
                <div className='triangle'></div>
              </div>
            )}
          </div>
          <div className='w-full mt-0'>
            <button
              type='submit'
              disabled={!continues}
              className={`mt-1 block w-full px-3 py-2 text-sm font-medium rounded-md ${
                continues ? 'custom-button' : 'custom-button1'
              }`}
            >
              Login
            </button>
          </div>
          {/* ALREADY ACCOUNT */}
          {/* <div className='mt-2 flex justify-start'>
            <div className='w-full'>
              <p
                className='mt-4 text-left text-black cursor-pointer'
                onClick={() =>
                  (window.location.href = 'https://ocpomni.alendei.io/login')
                }
              >
                Already have an account?{' '}
                <span className='text-green-800'>Login</span>
              </p>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default FormStep1;
