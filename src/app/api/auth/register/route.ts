import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB, getDB } from '@/db/db';


const ensureDBConnection = async () => {
  try {
    await connectDB();  
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Database connection failed');
  }
};

export const POST = async (req: Request) => {
  
  await ensureDBConnection();

  const { username, email, password } = await req.json();
  

  const db = getDB();

  try {
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
