import React from 'react';
import Image from 'next/image';
import Marquee from '@/components/shared/marquee';
import ScrollFillText from '@/components/shared/scroll-fill-text';
import SlackLogo from '@/assets/images/integrations/slack.svg';
import TrelloLogo from '@/assets/images/integrations/trello.svg';
import DriveLogo from '@/assets/images/integrations/drive.svg';
import ChatGPTLogo from '@/assets/images/integrations/chatgpt.svg';
import GoogleCalendarLogo from '@/assets/images/integrations/gcal.svg';
import JiraLogo from '@/assets/images/integrations/jira.svg';
import TeamsLogo from '@/assets/images/integrations/teams.svg';
import AirtableLogo from '@/assets/images/integrations/airtable.svg';
import GitHubLogo from '@/assets/images/integrations/github.svg';
import GmailLogo from '@/assets/images/integrations/gmail.svg';
import ClaudeLogo from '@/assets/images/integrations/claude.svg';
import AcrobatLogo from '@/assets/images/integrations/acrobat.svg';
import GitLabLogo from '@/assets/images/integrations/gitlab.svg';
import LoomLogo from '@/assets/images/integrations/loom.svg';
import SalesforceLogo from '@/assets/images/integrations/salesforce.svg';
import ZapierLogo from '@/assets/images/integrations/zapier.svg';

const integrationTiles = [
  { name: 'Trello', logo: TrelloLogo },
  { name: 'Slack', logo: SlackLogo },
  { name: 'Teams', logo: TeamsLogo },
  { name: 'Google Calendar', logo: GoogleCalendarLogo },
  { name: 'ChatGPT', logo: ChatGPTLogo },
  { name: 'Airtable', logo: AirtableLogo },
  { name: 'Gmail', logo: GmailLogo },
  { name: 'GitHub', logo: GitHubLogo },
  { name: 'Google Drive', logo: DriveLogo },
  { name: 'Jira', logo: JiraLogo },
  { name: 'Claude', logo: ClaudeLogo },
  { name: 'Acrobat', logo: AcrobatLogo },
  { name: 'GitLab', logo: GitLabLogo },
  { name: 'Zapier', logo: ZapierLogo },
  { name: 'Loom', logo: LoomLogo },
  { name: 'Salesforce', logo: SalesforceLogo },
  { name: 'Teams', logo: TeamsLogo },
];

/**
 * Outer rows run left to right, the middle one runs back the other way. The
 * speeds are deliberately all different, so the rows never lock in step.
 */
const integrationRows = [
  {
    tiles: integrationTiles.slice(0, 6),
    direction: 1,
    speed: 46, // px per second
    offsetClassName: 'pl-0 max-md:ml-[-28px]',
  },
  {
    tiles: integrationTiles.slice(6, 11),
    direction: -1,
    speed: 34,
    offsetClassName: 'pl-[52px] max-md:pl-[22px]',
  },
  {
    tiles: integrationTiles.slice(11),
    direction: 1,
    speed: 40,
    offsetClassName: 'pl-0 max-md:ml-[-28px]',
  },
] as const;

const integrationRowClassName = 'flex w-max items-center gap-[20px] max-md:gap-[10px]';
const integrationCopyClassName =
  'flex shrink-0 items-center gap-[20px] max-md:gap-[10px]';

export default function IntegrationsSection() {

  return (
    <section className='integrations w-full bg-[#F6F6FF] py-[160px] max-md:py-[10vh]'>
      <div className='mx-auto flex w-full max-w-[1440px] items-center gap-[40px] px-[80px] max-xl:px-[4vw] max-lg:flex-col max-lg:items-start max-lg:gap-[56px]'>
        <div className='flex flex-1 flex-col gap-2 max-lg:w-full sm:gap-10'>
          <h2 className='text-style-h1 font-bold'>
            <ScrollFillText>Works with tools you already use</ScrollFillText>
          </h2>
          <p className='max-w-[520px] text-style-h5 text-text-secondary font-normal '>
            Connect AppFlowy to your existing systems to keep work and data in sync.
          </p>
        </div>

        <div
          className="integrations__apps relative flex w-[700px] shrink-0 flex-col gap-[22px] overflow-hidden py-[24px] before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:block before:w-[110px] before:bg-[linear-gradient(90deg,#F6F6FF_0%,rgba(246,246,255,0.92)_32%,rgba(246,246,255,0)_100%)] before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:block after:w-[110px] after:bg-[linear-gradient(270deg,#F6F6FF_0%,rgba(246,246,255,0.92)_32%,rgba(246,246,255,0)_100%)] after:content-[''] max-lg:mx-auto max-lg:w-full max-lg:max-w-[700px] max-md:mx-[-4vw] max-md:w-[calc(100%+8vw)] max-md:max-w-none max-md:gap-[14px] max-md:py-0 max-md:before:w-[40px] max-md:after:w-[40px]"
          aria-label='Integration app placeholders'
        >
          {integrationRows.map((row, rowIndex) => (
            <Marquee
              key={rowIndex}
              direction={row.direction}
              speed={row.speed}
              className={`w-max ${row.offsetClassName}`}
              trackClassName={integrationRowClassName}
              copyClassName={integrationCopyClassName}
            >
              {row.tiles.map((tile, tileIndex) => (
                <div
                  key={`${tile.name}-${tileIndex}`}
                  className='integrations__app-card relative z-[1] flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-[20px] bg-white max-md:h-[78px] max-md:w-[78px] max-md:rounded-[18px]'
                  aria-label={tile.name}
                >
                  <Image
                    alt={tile.name}
                    className='integrations__app-logo object-contain max-md:h-[46px] max-md:w-[46px]'
                    src={tile.logo}
                  />
                </div>
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  );
}
