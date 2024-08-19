import React from 'react';

function Community() {
  return (
    <div className={'h-fit w-full bg-[#2B1A3F]'}>
      <div className={'community'}>
        <div className={'community-title'}>All Community</div>
        <div className={'community-description'}>
          You can upload your templates, our moderators will check them and they will be available on our platform
        </div>
        <button className={'download-btn'}>Share your template</button>
      </div>
    </div>
  );
}

export default Community;
