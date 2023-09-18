'use client';

import React from 'react';

function ContactEmail() {
  return (
    <span
      onClick={() => {
        window.location.href = 'mailto:support@appflowy.io';
      }}
      className={'hover:underline'}
    >
      support@appflowy.io
    </span>
  );
}

export default ContactEmail;
