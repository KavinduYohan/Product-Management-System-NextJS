import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface CustomNextRequest extends NextRequest {
  user?: any; 
}

export const middleware = (req: CustomNextRequest) => {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, '1234');
    req.user = decoded; 
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
};