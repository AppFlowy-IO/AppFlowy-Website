import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  children?: React.ReactNode;
  content: string;
}

function Caption(props: Props) {
  return <div className={'w-full text-center text-base text-gray-400'}>
    <ReactMarkdown>
      {props.content}
    </ReactMarkdown>
  </div>;
}

export default Caption;
