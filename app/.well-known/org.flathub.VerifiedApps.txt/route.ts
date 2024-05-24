import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('b109d347-9716-41f3-b244-e4313c555ce7', {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
