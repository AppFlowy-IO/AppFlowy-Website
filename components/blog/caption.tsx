import React from 'react';

interface Props {
  children?: React.ReactNode;
  content: string;
}

function Caption(props: Props) {
  return <div className={'w-full text-center text-base text-gray-400'}>{props.content}</div>;
}

export default Caption;
