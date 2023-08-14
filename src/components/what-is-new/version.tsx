import React from 'react';
import { FileIcon, PlusCircledIcon } from '@radix-ui/react-icons';

export interface VersionProps {
  image: string;
  version: string;
  time: string;
  desc: string;
  update: {
    name: string;
    items: string[];
    icon: string;
  }[];
}

const iconMap: Record<string, React.ReactNode> = {
  add: <PlusCircledIcon width={18} height={18} />,
  fix: <PlusCircledIcon width={18} height={18} className={'rotate-[45deg]'} />,
  update: <PlusCircledIcon width={18} height={18} />,
  data: <FileIcon width={18} height={18} />,
};

function Version({ image, version, time, desc, update }: VersionProps) {
  return (
    <div className={'bg-body my-2 ml-24 flex items-center rounded-3xl border border-[var(--color-purple-border)] p-6'}>
      <div
        className={
          'bg-gray-body flex flex-grow-[1] items-center justify-between self-stretch overflow-hidden rounded-3xl border border-[var(--color-purple-border)]'
        }
      >
        <img src={image} />
      </div>
      <div className={'ml-8 flex w-[60%] flex-col justify-center pl-8'}>
        <div className={'pt-3 text-[24px] font-medium leading-[26px]'}>
          {time} - {version}
        </div>
        <p className={'mt-4'}>
          <span className={'text-primary'}>{version}</span> {desc}
        </p>
        <div className={'mt-4 pt-3'}>
          {update.map((item) => (
            <div key={item.name} className={'py-3'}>
              <div className={'flex items-center font-bold'}>
                <span className={'text-primary mr-2 '}>{iconMap[item.icon]}</span>
                {item.name}
              </div>
              <div className={'mt-3 pl-1'}>
                {item.items.map((item, index) => (
                  <div key={index} className={'flex py-1'}>
                    <li />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Version;
