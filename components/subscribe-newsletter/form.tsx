'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createHubSpotSubscriber } from '@/lib/hubspotAPI';
import Checkbox from '@/components/icons/checkbox';
import { Snackbar } from '@mui/material';

function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<{
    email: string;
  }>({
    mode: 'onChange',
  });
  const [message, setMessage] = useState({
    open: false,
    type: '',
  });

  const closeMessage = () => {
    setMessage({
      open: false,
      type: '',
    });
  };

  return (
    <form
      id={'subscribe-newsletter-form'}
      onSubmit={handleSubmit(async (formData) => {
        setIsLoading(true);
        try {
          await createHubSpotSubscriber(formData.email);
          setMessage({
            open: true,
            type: 'success',
          });
          reset();
        } catch (error) {
          setMessage({
            open: true,
            type: 'error',
          });
        }

        setIsLoading(false);
      })}
    >
      <div className={'flex w-full items-center justify-center gap-[20px] max-sm:flex-col'}>
        <div className={'form-group max-sm:w-full'}>
          <div className={'form-input'}>
            <input
              type={'text'}
              id={'email'}
              placeholder={'Email Address'}
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
          </div>
        </div>
        <button
          onClick={() => {
            trigger('email');
          }}
          className={'download-btn'}
          type={'submit'}
          disabled={isLoading}
        >
          Sign Up
        </button>
      </div>
      {errors['email']?.type === 'required' && <div className={'error'}>email is required</div>}
      {errors['email']?.type === 'pattern' && <div className={'error'}>email is invalid</div>}

      <Snackbar
        className={'contact-message'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={message.open}
        autoHideDuration={3000}
        onClose={closeMessage}
      >
        <div className={'contact-message-content'}>
          {message.type !== '' && (
            <>
              <div className={'contact-message-icon'}>
                {message.type === 'success' ? (
                  <Checkbox />
                ) : (
                  <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 19 19' fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M9.5 1.35714C5.00311 1.35714 1.35714 5.00311 1.35714 9.5C1.35714 13.9989 5.00311 17.6429 9.5 17.6429C13.9969 17.6429 17.6429 13.9989 17.6429 9.5C17.6429 5.00311 13.9969 1.35714 9.5 1.35714ZM0 9.5C0 4.25329 4.25329 0 9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7454 14.7467 19 9.5 19C4.25329 19 0 14.7454 0 9.5ZM5.58533 5.62741C5.84998 5.36209 6.27951 5.36209 6.54483 5.62741L9.5 8.58258L12.4552 5.62741C12.7205 5.36209 13.15 5.36209 13.4147 5.62741C13.68 5.89206 13.68 6.32223 13.4147 6.58687L10.4595 9.54208L13.4147 12.4993C13.68 12.7639 13.68 13.1914 13.4147 13.4561C13.15 13.7207 12.7205 13.7207 12.4552 13.4561L9.5 10.5016L6.54483 13.4561C6.27951 13.7207 5.84998 13.7207 5.58533 13.4561C5.32001 13.1914 5.32001 12.7639 5.58533 12.4993L8.5405 9.54208L5.58533 6.58687C5.32001 6.32223 5.32001 5.89206 5.58533 5.62741Z'
                      fill='red'
                    />
                  </svg>
                )}
              </div>
              <div className={'contact-message-text'}>
                {message.type === 'success' ? (
                  <>
                    <div className={'contact-message-title'}>Thank you</div>
                  </>
                ) : (
                  <>
                    <div className={'contact-message-title'}>Something went wrong</div>
                    <div className={'contact-message-desc'}>Please try again later.</div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Snackbar>
    </form>
  );
}

export default Form;
