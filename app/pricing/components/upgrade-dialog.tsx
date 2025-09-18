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
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[calc(100%-2rem)] max-w-[560px] sm:w-[560px] mx-4 z-50">
          {/* Header */}
          <div className="flex items-center gap-1.5 flex-1 mb-4">
            <Dialog.Title className="text-[#21232A] font-medium text-lg flex-1" style={{ fontFamily: '"SF Pro Text"' }}>
              Upgrade to unlock more features
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-md transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-[#21232A] font-normal text-sm leading-5" style={{ fontFamily: '"SF Pro Text"' }}>
              Please visit your self-hosted admin panel to purchase a commercial license.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Dialog.Close asChild>
              <button className="flex min-w-[76px] justify-center items-center border border-[#DDE2F1] rounded-[8px] text-[#21232A] hover:bg-gray-50 transition-colors" 
                      style={{ padding: '6px 12px', fontFamily: '"SF Pro Text"' }}>
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="flex min-w-[76px] justify-center items-center bg-[#9327FF] text-white rounded-[8px] hover:bg-[#7A1FD9] transition-colors"
                      style={{ padding: '6px 12px', fontFamily: '"SF Pro Text"' }}>
                OK
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}