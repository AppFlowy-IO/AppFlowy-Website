'use client';

import Box from '@mui/material/Box';
import data from '@/data/footer.json';
import { DiscountRounded, GitHub, Reddit, Twitter } from '@mui/icons-material';
import { ReactNode } from 'react';
import Link from 'next/link';

const links = data['external-links'];

const iconMap: Record<string, ReactNode> = {
  twitter: (
    <Twitter
      sx={{
        width: 30,
        height: 30,
      }}
    />
  ),
  reddit: (
    <Reddit
      sx={{
        width: 30,
        height: 30,
      }}
    />
  ),
  github: (
    <GitHub
      sx={{
        width: 30,
        height: 30,
      }}
    />
  ),
  discord: (
    <DiscountRounded
      sx={{
        width: 30,
        height: 30,
      }}
    />
  ),
};

export default function FooterLinks() {
  return (
    <Box
      sx={{
        mt: {
          md: '-60px',
          xs: 5,
        },
        mb: {
          xs: 3,
        },
      }}
      className={'w-full'}
    >
      <Box
        className={'flex'}
        sx={{
          width: {
            md: '25%',
            xs: '100%',
          },
        }}
      >
        {links.map((item) => (
          <Link href={item.link} className={'mx-3 mb-4 text-white'} key={item.key}>
            {iconMap[item.key]}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
