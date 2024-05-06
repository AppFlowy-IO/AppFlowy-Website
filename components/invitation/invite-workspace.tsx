'use client';

import { Avatar } from '@mui/material';
import { useSearchParams } from 'next/navigation';

function InviteWorkspace() {
  const params = useSearchParams();

  const workspace_name = params.get('workspace_name') || '';
  const workspace_icon = params.get('workspace_icon') || '';
  const workspace_member_count = params.get('workspace_member_count') || 0;

  return (
    <div className={'my-7 flex items-center justify-center gap-4'}>
      <Avatar
        className={'h-[57px] w-[57px] rounded-2xl border-2 border-black dark:border-white'}
        src={workspace_icon}
        alt={workspace_name}
        variant={'rounded'}
      />
      <div className={'flex flex-col gap-1 text-base'}>
        <div className={'max-w-[200px] overflow-hidden truncate font-semibold max-sm:max-w-full'}>
          {workspace_name || 'Workspace'}
        </div>
        <div className={'text-slate-500'}>{workspace_member_count || 0} members</div>
      </div>
    </div>
  );
}

export default InviteWorkspace;
