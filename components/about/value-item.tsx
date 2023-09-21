import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Minus from '@/components/icons/minus';
import Plus from '@/components/icons/plus';
import Check from '@/components/icons/check';

function ValueItem({
  item,
}: {
  item: {
    title: string;
    list: string[];
  };
}) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div key={item.title} className={'value-item'}>
      <div className='ellipse' />
      <motion.header className={'header'} initial={false} onClick={() => setCollapsed((prev) => !prev)}>
        <div className={'header-key'}>{item.title.slice(0, 1).toUpperCase()}</div>
        <div className={'header-title'}>{item.title}</div>
        <motion.button className={'expand-icon'}>{!collapsed ? <Minus /> : <Plus />}</motion.button>
      </motion.header>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            className={'overflow-hidden max-sm:mt-4 md:ml-[200px] md:pr-8'}
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.2 }}
          >
            {item.list.map((point, index) => (
              <div key={index} className={'value-desc-item'}>
                <div className={'check-icon'}>
                  <Check />
                </div>
                <div className={'item-text'}>{point}</div>
              </div>
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ValueItem;
