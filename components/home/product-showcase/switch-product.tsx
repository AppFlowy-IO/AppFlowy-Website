'use client';

import React, { useState } from 'react';
import Board from '@/components/icons/board';
import Table from '@/components/icons/table';
import Calendar from '@/components/icons/calendar';
import BoardAnimation from '@/assets/lottie/board/data';
import TableAnimation from '@/assets/lottie/table/data';
import CalendarAnimation from '@/assets/lottie/calendar/data';
import Lottie from 'lottie-react';

enum Product {
  Board = 'board',
  Table = 'table',
  Calendar = 'calendar',
}

const products = [
  {
    key: Product.Board,
    icon: <Board />,
    desc: (
      <span>
        <span className={'bold'}>Kanban Board</span> are the best way to manage projects and tasks
      </span>
    ),
  },
  {
    key: Product.Table,
    icon: <Table />,
    desc: (
      <span>
        <span className={'bold'}>Table.</span> You can build detailed lists projects while tracking the status of each
        one
      </span>
    ),
  },
  {
    key: Product.Calendar,
    icon: <Calendar />,
    desc: (
      <span>
        <span className={'bold'}>Calendar.</span> You have a bird’s-eye view of important launch dates
      </span>
    ),
  },
];

const lottieJsonMap = {
  [Product.Board]: BoardAnimation,
  [Product.Table]: TableAnimation,
  [Product.Calendar]: CalendarAnimation,
};

function SwitchProduct() {
  const [active, setActive] = useState<Product>(Product.Board);
  const options = products.map((item) => (
    <button
      key={item.key}
      onClick={() => setActive(item.key)}
      className={`btn ${active === item.key ? 'selected' : ''} ${item.key}`}
    >
      {item.icon}
    </button>
  ));
  const selectedItem = products.find((item) => item.key === active);

  return (
    <div className={'switch-product'}>
      <div className={`${active}-bg`} />
      <div className={'switch-image'}>
        {products.map((item) => (
          <div key={item.key}>
            {active === item.key ? <Lottie loop={false} animationData={lottieJsonMap[item.key]} /> : null}
          </div>
        ))}
      </div>
      {selectedItem && <div className={'desc'}>{selectedItem.desc}</div>}

      <div className={'btn-group'}>{options}</div>
    </div>
  );
}

export default SwitchProduct;
