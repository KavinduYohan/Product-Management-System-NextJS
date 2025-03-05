import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Extend the NextRequest type to include the `user` property
interface CustomNextRequest extends NextRequest {
  user?: any; 
}

export const middleware = (req: CustomNextRequest) => {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded; 
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
};