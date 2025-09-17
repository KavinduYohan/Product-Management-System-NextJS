import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { connectDB, getDB } from '@/db/db';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const db = getDB();
  const resolvedParams = await params;
  const product = await db.get('SELECT * FROM products WHERE id = ?', [resolvedParams.id]);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const db = getDB();

  const resolvedParams = await params;

 
  const formData = await req.formData();
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const quantity = formData.get('quantity') as string;
  const image = formData.get('image') as File | null;

  let imageUrl = '';
  if (image) {
    
    const filePath = path.join(process.cwd(), 'public', 'uploads', image.name);
    const buffer = await image.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    imageUrl = `/uploads/${image.name}`;
  }

  await db.run('UPDATE products SET name = ?, description = ?, quantity = ?, image_url = ? WHERE id = ?', [
    name,
    description,
    quantity,
    imageUrl,
    resolvedParams.id,
  ]);

  return NextResponse.json({ message: 'Product updated successfully' });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const db = getDB();
  const resolvedParams = await params;
  await db.run('DELETE FROM products WHERE id = ?', [resolvedParams.id]);
  return NextResponse.json({ message: 'Product deleted successfully' });
}