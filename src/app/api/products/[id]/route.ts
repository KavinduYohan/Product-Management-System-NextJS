import { NextResponse } from 'next/server';
import { connectDB, getDB } from '@/db/db';

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const db = getDB();
  const product = await db.get('SELECT * FROM products WHERE id = ?', [params.id]);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
 
  const { id } = await params;
  const { name, description, quantity } = await req.json();
  
  await connectDB();
  const db = getDB();
  
  await db.run('UPDATE products SET name = ?, description = ?, quantity = ? WHERE id = ?', [name, description, quantity, id]);
  
  return NextResponse.json({ message: 'Product updated successfully' });
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const db = getDB();
  await db.run('DELETE FROM products WHERE id = ?', [params.id]);
  return NextResponse.json({ message: 'Product deleted successfully' });
}
