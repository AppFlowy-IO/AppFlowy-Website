'use client';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

const Accordion = ({
  index,
  expandedIndex,
  header,
  children,
  setExpandedIndex,
  className = '',
}: {
  index: number;
  expandedIndex: number | null;
  children: React.ReactNode;
  header: React.ReactNode;
  setExpandedIndex: (index: number | null) => void;
  className?: string;
}) => {
  const isOpen = index === expandedIndex;

  return (
    <div className={`bg-body border-border-purple my-4 rounded-3xl border pb-8 ${className}`}>
      <motion.header
        className={'flex cursor-pointer justify-between p-8 pb-0'}
        initial={false}
        onClick={() => setExpandedIndex(isOpen ? null : index)}
      >
        {header}
        <motion.button>
          <span>{isOpen ? <MinusIcon width={20} height={20} /> : <PlusIcon width={20} height={20} />}</span>
        </motion.button>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            className={'px-8'}
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.56, 0.03, 0.12, 1.04] }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
