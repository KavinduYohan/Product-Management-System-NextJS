import { NextResponse } from 'next/server';
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
  const db = getDB();

  // Parse the form data
  const formData = await req.formData();
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const quantity = formData.get('quantity') as string;
  const image = formData.get('image') as File | null;

  let imageUrl = '';
  if (image) {
    // Save the uploaded file to the 'uploads' directory
    const filePath = path.join(process.cwd(), 'uploads', image.name);
    const buffer = await image.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    imageUrl = `/uploads/${image.name}`;
  }

  // Insert the new product into the database
  await db.run('INSERT INTO products (name, description, quantity, image_url) VALUES (?, ?, ?, ?)', [
    name,
    description,
    quantity,
    imageUrl,
  ]);

  return NextResponse.json({ message: 'Product added successfully' });
}