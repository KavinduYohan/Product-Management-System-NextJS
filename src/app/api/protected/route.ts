import { NextResponse } from 'next/server';

export const GET = (req: Request) => {
  return NextResponse.json({ message: 'This is a protected route' });
};
