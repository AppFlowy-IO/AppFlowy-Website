import { NextResponse } from 'next/server';

const body = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'io.appflowy.appflowy',
      sha256_cert_fingerprints: [
        '19:13:85:33:DB:B3:A2:FD:65:2F:61:D7:F2:35:95:79:FE:6E:CC:B5:AC:94:AA:02:9E:BE:E7:0E:02:6B:45:FF',
      ],
      path_prefix: '/download',
    },
  },
];

export async function GET() {
  return new NextResponse(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}