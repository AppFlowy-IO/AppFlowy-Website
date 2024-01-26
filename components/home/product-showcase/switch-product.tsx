'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Board from '@/components/icons/board';
import Table from '@/components/icons/table';
import Calendar from '@/components/icons/calendar';
import BoardAnimation from '@/assets/lottie/board/data';
import TableAnimation from '@/assets/lottie/table/data';
import CalendarAnimation from '@/assets/lottie/calendar/data';
import darkBoardAnimation from '@/assets/lottie/dark/board/data';
import darkTableAnimation from '@/assets/lottie/dark/table/data';
import darkCalendarAnimation from '@/assets/lottie/dark/calendar/data';
import mobileBoardAnimation from '@/assets/lottie/mobile/board/data';
import mobileTableAnimation from '@/assets/lottie/mobile/table/data';
import mobileCalendarAnimation from '@/assets/lottie/mobile/calendar/data';
import darkMobileBoardAnimation from '@/assets/lottie/mobile/dark/board/data';
import darkMobileTableAnimation from '@/assets/lottie/mobile/dark/table/data';
import darkMobileCalendarAnimation from '@/assets/lottie/mobile/dark/calendar/data';

import Lottie from 'react-lottie';
import { useDarkContext } from '@/lib/hooks/use-dark-context';
import { useClient } from '@/lib/hooks/use-client';

import { motion, useInView } from 'framer-motion';
import Button from '@mui/material/Button';
import { collectEvent, EventName } from '@/lib/collect';

export enum Product {
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
        <span className={'bold'}>Kanban Board</span> — The best way to manage projects and tasks
      </span>
    ),
  },
  {
    key: Product.Table,
    icon: <Table />,
    desc: (
      <span>
        <span className={'bold'}>Grid</span> — You can build detailed lists for projects while tracking the status of
        each one one
      </span>
    ),
  },
  {
    key: Product.Calendar,
    icon: <Calendar />,
    desc: (
      <span>
        <span className={'bold'}>Calendar</span> — You have a bird’s-eye view of important events
      </span>
    ),
  },
];

function SwitchProduct() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const dark = useDarkContext();
  const { isMobile } = useClient();
  const [active, setActive] = useState<Product>(Product.Board);
  const options = useMemo(() => {
    return products.map((item) => {
      return (
        <Button
          key={item.key}
          onClick={() => {
            setActive(item.key);
            collectEvent(EventName.homePageSwitchProductBtn, {
              type: 'click',
              product: item.key,
            });
          }}
          className={`btn select-none ${item.key} ${active === item.key ? 'selected' : ''}`}
        >
          {item.icon}
        </Button>
      );
    });
  }, [active]);

  useEffect(() => {
    products.forEach((item) => {
      collectEvent(EventName.homePageSwitchProductBtn, {
        type: 'view',
        product: item.key,
      });
    });
  }, []);
  const selectedItem = products.find((item) => item.key === active);

  const lottieJsonMap = useMemo(
    () =>
      dark
        ? {
            [Product.Board]: isMobile ? darkMobileBoardAnimation : darkBoardAnimation,
            [Product.Table]: isMobile ? darkMobileTableAnimation : darkTableAnimation,
            [Product.Calendar]: isMobile ? darkMobileCalendarAnimation : darkCalendarAnimation,
          }
        : {
            [Product.Board]: isMobile ? mobileBoardAnimation : BoardAnimation,
            [Product.Table]: isMobile ? mobileTableAnimation : TableAnimation,
            [Product.Calendar]: isMobile ? mobileCalendarAnimation : CalendarAnimation,
          },
    [dark, isMobile]
  );

  const sliderLeft = useMemo(() => {
    switch (active) {
      case Product.Board:
        return 10;
      case Product.Table:
        return 76;
      case Product.Calendar:
        return 138;
      default:
        return 10;
    }
  }, [active]);

  return (
    <div ref={ref} className={'switch-product'}>
      <div className={`${active}-bg`} />
      <div className={'switch-image relative aspect-video w-full'}>
        {products.map((item) => (
          <div
            className={`absolute left-0 top-0 h-full w-full ${item.key !== active ? 'opacity-0' : ''}`}
            key={item.key}
          >
            {inView && (
              <Lottie
                options={{
                  animationData: lottieJsonMap[item.key],
                  loop: true,
                  autoplay: true,
                }}
              />
            )}
          </div>
        ))}
      </div>
      {selectedItem && <div className={'desc'}>{selectedItem.desc}</div>}

      <div className={'btn-group'}>
        {options}
        {active !== undefined && (
          <motion.div
            className={`slider-active ${active}`}
            animate={{
              left: sliderLeft,
              type: 'spring',
            }}
            initial={false}
          />
        )}
      </div>
    </div>
  );
}

export default React.memo(SwitchProduct);
