'use client';

import { Avatar } from '@mui/material';
import { useSearchParams } from 'next/navigation';

function InviteOwner() {
  const params = useSearchParams();
  const user_name = params.get('user_name') || 'User';
  const user_icon = params.get('user_icon') || '';

  return (
    <div className={'my-4 flex items-center justify-center gap-4'}>
      <Avatar className={'h-[57px] w-[57px]'} src={user_icon} alt={user_name} variant={'circular'} />
      <div className={'flex flex-col gap-1 text-base'}>
        <div>Invited by</div>
        <div className={'max-w-[200px] overflow-hidden truncate font-semibold max-sm:max-w-full'}>{user_name}</div>
      </div>
    </div>
  );
}

export default InviteOwner;
