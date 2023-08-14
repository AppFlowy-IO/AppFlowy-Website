'use client';

import Trans from 'next-translate/Trans';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import { useTopbar } from '@/lib/hooks/use-topbar';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TopBar() {
  const { show, onClickLearnMore, version } = useTopbar();

  return (
    <motion.div
      className={`bg-primary text-text-on-fill flex h-9 w-screen items-center justify-center overflow-hidden text-sm`}
      initial={false}
      animate={{ height: show ? '36px' : 0 }}
    >
      <Trans
        i18nKey={'new-version-tip'}
        components={[
          <div className={'mr-2 flex items-center justify-center'} key={0} />,
          <Link
            href={'/what-is-new'}
            key={1}
            onClick={onClickLearnMore}
            className={'mx-2 flex cursor-pointer items-center justify-center font-semibold'}
          />,
          <div key={2} className={'mx-1'}>
            <ArrowOutward />
          </div>,
          <div key={3} className={'h-4 w-[1px] bg-gray-300'} />,
          <div key={4} className={'ml-1 mr-1 max-sm:hidden md:block'} />,
        ]}
        values={{
          version,
        }}
      />
    </motion.div>
  );
}
