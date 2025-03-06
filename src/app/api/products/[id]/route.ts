import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { connectDB, getDB } from '@/db/db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to handle multipart/form-data
  },
};

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
  await connectDB();
  const db = getDB();

  // Parse the form data
  const formData = await req.formData();
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const quantity = formData.get('quantity') as string;
  const image = formData.get('image') as File | null;

  let imageUrl = '';
  if (image) {
    
    const filePath = path.join(process.cwd(), 'uploads', image.name);
    const buffer = await image.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    imageUrl = `/uploads/${image.name}`;
  }

  await db.run('UPDATE products SET name = ?, description = ?, quantity = ?, image_url = ? WHERE id = ?', [
    name,
    description,
    quantity,
    imageUrl,
    params.id,
  ]);

  return NextResponse.json({ message: 'Product updated successfully' });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const db = getDB();
  await db.run('DELETE FROM products WHERE id = ?', [params.id]);
  return NextResponse.json({ message: 'Product deleted successfully' });
}