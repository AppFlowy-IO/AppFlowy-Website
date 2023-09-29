import React, { useState } from 'react';
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
      <header className={'header'} onClick={() => setCollapsed((prev) => !prev)}>
        <div className={'header-key'}>{item.title.slice(0, 1).toUpperCase()}</div>
        <div className={'header-title'}>{item.title}</div>
        <button className={'expand-icon'}>{!collapsed ? <Minus /> : <Plus />}</button>
      </header>

      <div key='content' className={'overflow-hidden max-lg:mt-4 xl:ml-[200px] xl:pr-8'}>
        {!collapsed
          ? item.list.map((point, index) => (
              <div key={index} className={'value-desc-item'}>
                <div className={'check-icon'}>
                  <Check />
                </div>
                <div className={'item-text'}>{point}</div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default ValueItem;
