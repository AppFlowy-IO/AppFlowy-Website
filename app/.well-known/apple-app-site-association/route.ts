import { NextResponse } from 'next/server';

const body = {
  applinks: {
    apps: [],
    details: [
      {
        appIDs: ['VHB67HRSZG.com.appflowy.appflowy.flutter'],
        paths: ['/download', '/download/*'],
        components: [
          {
            '/': '/*',
          },
        ],
      },
    ],
  },
  webcredentials: {
    apps: ['VHB67HRSZG.com.appflowy.appflowy.flutter'],
  },
};

export async function GET() {
  return new NextResponse(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
