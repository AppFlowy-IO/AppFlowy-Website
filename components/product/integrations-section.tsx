import React from 'react';
import Image from 'next/image';
import SlackLogo from '@/assets/images/integrations/slack.svg';
import TrelloLogo from '@/assets/images/integrations/trello.svg';
import DriveLogo from '@/assets/images/integrations/drive.svg';
import ChatGPTLogo from '@/assets/images/integrations/chatgpt.svg';
import GoogleCalendarLogo from '@/assets/images/integrations/gcal.svg';
import NotionLogo from '@/assets/images/integrations/notion.svg';
import ObsidianLogo from '@/assets/images/integrations/obsidian.svg';
import AirtableLogo from '@/assets/images/integrations/airtable.svg';
import GitHubLogo from '@/assets/images/integrations/github.svg';
import GmailLogo from '@/assets/images/integrations/gmail.svg';
import ClaudeLogo from '@/assets/images/integrations/claude.svg';

const integrationTiles = [
  { name: 'Notion', logo: NotionLogo },
  { name: 'Slack', logo: SlackLogo },
  { name: 'Trello', logo: TrelloLogo },
  { name: 'Google Drive', logo: DriveLogo },
  { name: 'ChatGPT', logo: ChatGPTLogo },
  { name: 'Google Calendar', logo: GoogleCalendarLogo },
  { name: 'Airtable', logo: AirtableLogo },
  { name: 'GitHub', logo: GitHubLogo },
  { name: 'Gmail', logo: GmailLogo },
  { name: 'Claude', logo: ClaudeLogo },
  { name: 'Obsidian', logo: ObsidianLogo },
];

export default function IntegrationsSection() {
  const topRowTiles = integrationTiles.slice(0, 5);
  const bottomRowTiles = integrationTiles.slice(5);

  return (
    <section className='integrations w-full bg-[#F6F6FF] py-[120px] max-md:py-[10vh]'>
      <div className='mx-auto flex w-full max-w-[1440px] items-center gap-[40px] px-[80px] max-xl:px-[4vw] max-lg:flex-col max-lg:items-start max-lg:gap-[56px]'>
        <div className='flex flex-1 flex-col gap-[40px] max-lg:w-full max-lg:gap-6'>
          <h2 className='text-style-h1 font-bold leading-[68px] max-md:text-[clamp(40px,8vw,56px)] max-md:leading-[1.08]'>
            Customize with
            <br />
            dozens of
            <br />
            integrations
          </h2>
          <p className='max-w-[520px] text-style-h5 font-medium leading-[28px] max-md:leading-[1.5]'>
            AppFlowy connects to the tools your team already runs on your teams.
          </p>
        </div>

        <div
          className="integrations__apps relative flex w-[700px] shrink-0 flex-col gap-[22px] overflow-hidden py-[24px] before:pointer-events-none before:absolute before:inset-y-0 before:z-10 before:block before:w-[110px] before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:z-10 after:block after:w-[110px] after:content-[''] max-lg:mx-auto max-lg:w-fit max-lg:max-w-none max-sm:before:w-[72px] max-sm:after:w-[72px]"
          aria-label='Integration app placeholders'
        >
          <div className='flex items-center gap-[20px] pl-0 max-md:gap-[16px]'>
            {topRowTiles.map((tile) => (
              <div
                key={tile.name}
                className='integrations__app-card relative z-[1] flex h-[100px] w-[100px] items-center justify-center rounded-[20px] bg-white'
                aria-label={tile.name}
              >
                <Image alt={tile.name} className='integrations__app-logo' src={tile.logo} />
              </div>
            ))}
          </div>

          <div className='integrations__apps-row--bottom flex items-center gap-[20px] pl-[52px] max-md:gap-[16px] max-md:pl-0'>
            {bottomRowTiles.map((tile) => (
              <div
                key={tile.name}
                className='integrations__app-card relative z-[1] flex h-[100px] w-[100px] items-center justify-center rounded-[20px] bg-white'
                aria-label={tile.name}
              >
                <Image alt={tile.name} className='integrations__app-logo' src={tile.logo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
