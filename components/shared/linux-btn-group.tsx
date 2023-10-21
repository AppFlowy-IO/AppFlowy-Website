import React, { useMemo } from 'react';
import {
  downloadLinux86,
  downloadLinux86AppImage,
  downloadLinux86Deb,
  downloadLinux86Rpm,
} from '@/lib/hooks/use-download';
import DropdownBtn from '@/components/shared/dropdown-btn';
import { useClient } from '@/lib/hooks/use-client';

function LinuxBtnGroup({ title }: { title: string }) {
  const linuxOptions = useMemo(() => {
    return [
      {
        label: `.AppImage`,
        value: 'AppImage',
      },
      {
        label: `.deb`,
        value: 'deb',
      },
      {
        label: `.rpm`,
        value: 'rpm',
      },
      {
        label: `.tar.gz`,
        value: 'tar.gz',
      },
    ];
  }, []);
  const { isMobile } = useClient();

  return (
    <div className={'linux-btn-group'}>
      <DropdownBtn
        disabled={isMobile}
        title={title}
        extension={'AppImage'}
        extensionOptions={linuxOptions}
        onClick={(extension: string) => {
          if (extension === 'AppImage') downloadLinux86AppImage();
          if (extension === 'deb') downloadLinux86Deb();
          if (extension === 'rpm') downloadLinux86Rpm();
          if (extension === 'tar.gz') downloadLinux86();
        }}
      />
    </div>
  );
}

export default LinuxBtnGroup;
