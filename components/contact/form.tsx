'use client';

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createHubSpotTicket } from '@/lib/hubspotAPI';
import { CircularProgress, Snackbar } from '@mui/material';
import Checkbox from '@/components/icons/checkbox';

function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<{
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    message: string;
  }>({
    mode: 'onChange',
  });

  const [message, setMessage] = useState({
    open: false,
    type: '',
  });
  const fields: {
    name: 'firstName' | 'lastName' | 'email' | 'company' | 'message';
    label: string;
    type: 'text' | 'email' | 'textarea';
    required?: boolean;
  }[] = useMemo(() => {
    return [
      {
        name: 'firstName',
        label: 'First name',
        type: 'text',
        required: true,
      },
      {
        name: 'lastName',
        label: 'Last name',
        type: 'text',
        required: true,
      },
      {
        name: 'email',
        label: 'Business email',
        type: 'email',
        required: true,
      },
      {
        name: 'company',
        label: 'Company name',
        type: 'text',
      },
      {
        name: 'message',
        label: 'Message or question',
        type: 'textarea',
        required: true,
      },
    ];
  }, []);

  const closeMessage = () => {
    setMessage({
      open: false,
      type: '',
    });
  };

  return (
    <form
      id={'contact-form'}
      onSubmit={handleSubmit(async (formData) => {
        setIsLoading(true);
        try {
          await createHubSpotTicket(formData);
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
      {fields.map((field) => {
        return (
          <div key={field.name} className={'form-group'}>
            <div className={'form-input'}>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  rows={5}
                  placeholder={field.label}
                  {...register(field.name, { required: field.required })}
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  placeholder={field.label}
                  {...register(field.name, {
                    required: field.required,
                    pattern: field.type === 'email' ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ : undefined,
                  })}
                />
              )}

              {field.required && (
                <div className={'required'}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='15' viewBox='0 0 14 15' fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M7.875 0.5H6.125V5.38786L2.66914 1.932L1.4317 3.16943L4.88727 6.625H0V8.375H4.88871L1.43157 11.8321L2.66901 13.0696L6.125 9.61359V14.5H7.875V9.61273L11.3312 13.0689L12.5686 11.8315L9.11214 8.375H14V6.625H9.11359L12.5685 3.17009L11.3311 1.93265L7.875 5.38871V0.5Z'
                      fill='#9327FF'
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* errors will return when field validation fails  */}
            {errors[field.name]?.type === 'required' && <div className={'error'}>{field.label} is required</div>}
            {errors[field.name]?.type === 'pattern' && <div className={'error'}>{field.label} is invalid</div>}
          </div>
        );
      })}

      <button
        onClick={() => {
          trigger('firstName');
        }}
        className={'download-btn'}
        type={'submit'}
        disabled={isLoading}
      >
        {isLoading && <CircularProgress size={24} color='secondary' />}
        <span className={'mr-1'}>Send</span>
        <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'>
          <path d='M1.5 1.5H10.5M10.5 1.5V10.5M10.5 1.5L1.5 10.5' stroke='white' strokeWidth='1.8' />
        </svg>
      </button>
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
                    <div className={'contact-message-desc'}>
                      Your message has been sent and we will review it as soon as possible.
                    </div>
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
