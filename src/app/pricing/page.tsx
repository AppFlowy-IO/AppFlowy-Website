import React from 'react';
import OneTool from '@/components/pricing/one-tool';
import Compare from '@/components/pricing/compare';
import QuestionAndAnswers from '@/components/pricing/question-and-answers';
import GetStarted from '@/components/shared/get-started';

function Page() {
  return (
    <div className='pricing flex w-full flex-col items-center p-16'>
      <OneTool />
      <Compare />
      <QuestionAndAnswers />
      <GetStarted />
    </div>
  );
}

export default Page;
