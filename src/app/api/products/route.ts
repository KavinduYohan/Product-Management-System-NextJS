import { NextResponse } from 'next/server';
import { connectDB, getDB } from '@/db/db';

const ensureDBConnection = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Database connection failed');
  }
};

export async function GET() {
  await ensureDBConnection();
  const db = getDB();
  const products = await db.all('SELECT * FROM products');
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await ensureDBConnection();
  const newProduct = await req.json();
  const db = getDB();
  
  await db.run('INSERT INTO products (name, description, quantity) VALUES (?, ?, ?)', [
    newProduct.name,
    newProduct.description,
    newProduct.quantity,
  ]);
  return NextResponse.json(newProduct);
}
