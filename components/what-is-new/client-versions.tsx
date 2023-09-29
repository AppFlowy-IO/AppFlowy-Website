import React from 'react';
import { Version } from '@/lib/db';
import { useLoadVersions, useVersions } from '@/lib/hooks/use-versions';
import Versions from '@/components/what-is-new/versions';

function ClientVersions({ versions }: { versions: Version[] }) {
  useLoadVersions({
    serverVersions: versions,
  });
  const { versions: localVersions } = useVersions();

  return <Versions versions={localVersions} />;
}

export default ClientVersions;
