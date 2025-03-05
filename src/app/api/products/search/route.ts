import { NextResponse } from 'next/server';
import { connectDB, getDB } from '@/db/db';

export async function GET(req: Request) {
  await connectDB();
  const db = getDB();
  const { searchParams } = new URL(req.url);
  const term = searchParams.get('q');
  const products = await db.all('SELECT * FROM products WHERE name LIKE ?', [`%${term}%`]);
  return NextResponse.json(products);
}
