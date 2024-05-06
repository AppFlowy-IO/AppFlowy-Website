'use client';

import { useSearchParams } from 'next/navigation';

function ExpireDescription() {
  const params = useSearchParams();
  const user_name = params.get('user_name') || 'User';
  const first_name = user_name.split(' ')[0];

  return (
    <div className={'w-[400px] max-w-full whitespace-break-spaces break-words text-center text-[20px] font-medium leading-[30px]'}>
      Your invitation link has expired.
      <br />
      Contact {first_name} to request a new link.
    </div>
  );
}

export default ExpireDescription;
