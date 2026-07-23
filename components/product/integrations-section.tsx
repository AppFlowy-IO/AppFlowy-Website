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
    <section className="integrations-section">
      <div className="integrations-section__inner">
        <div className="integrations-section__copy">
          <h2 className="integrations-section__title">
            Customize with
            <br />
            dozens of
            <br />
            integrations
          </h2>
          <p className="integrations-section__subtitle">
            AppFlowy connects to the tools your team already runs on your teams.
          </p>
        </div>

        <div className="integrations-section__apps" aria-label="Integration app placeholders">
          <div className="integrations-section__apps-row integrations-section__apps-row--top">
            {topRowTiles.map((tile) => (
              <div
                key={tile.name}
                className="integrations-section__app-card"
                aria-label={tile.name}
              >
                <Image
                  alt={tile.name}
                  className="integrations-section__app-logo"
                  src={tile.logo}
                />
              </div>
            ))}
          </div>

          <div className="integrations-section__apps-row integrations-section__apps-row--bottom">
            {bottomRowTiles.map((tile) => (
              <div
                key={tile.name}
                className="integrations-section__app-card"
                aria-label={tile.name}
              >
                <Image
                  alt={tile.name}
                  className="integrations-section__app-logo"
                  src={tile.logo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
