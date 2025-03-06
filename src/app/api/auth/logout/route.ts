import { NextResponse } from 'next/server';

export const POST = async () => {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.delete('authToken');
  return response;
};