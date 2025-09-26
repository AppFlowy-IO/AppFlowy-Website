'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface UpgradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeDialog({ isOpen, onClose }: UpgradeDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-black bg-opacity-50' />
        <Dialog.Content className='fixed left-1/2 top-1/2 z-50 mx-4 w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 sm:w-[560px]'>
          {/* Header */}
          <div className='mb-4 flex flex-1 items-center gap-1.5'>
            <Dialog.Title className='flex-1 text-lg font-medium text-[#21232A]' style={{ fontFamily: '"SF Pro Text"' }}>
              Upgrade to unlock more features
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className='flex-shrink-0 rounded-md p-1 transition-colors hover:bg-gray-100'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M12 4L4 12M4 4L12 12'
                    stroke='#6B7280'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className='mb-6'>
            <p className='text-sm font-normal leading-5 text-[#21232A]' style={{ fontFamily: '"SF Pro Text"' }}>
              Please visit your self-hosted admin panel to purchase a commercial license.
            </p>
          </div>

          {/* Buttons */}
          <div className='flex justify-end gap-3'>
            <Dialog.Close asChild>
              <button
                className='flex min-w-[76px] items-center justify-center rounded-[8px] bg-[#9327FF] text-white transition-colors hover:bg-[#7A1FD9]'
                style={{ padding: '6px 12px', fontFamily: '"SF Pro Text"' }}
              >
                OK
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}