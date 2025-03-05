import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB, getDB } from '@/db/db';

// Ensure the database is connected before handling requests
const ensureDBConnection = async () => {
  try {
    await connectDB();  // Wait for the DB connection to establish
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Database connection failed');
  }
};

export const POST = async (req: Request) => {
  // Ensure DB connection is established
  await ensureDBConnection();

  const { email, password } = await req.json();
  
  // Now that DB is connected, safely access it
  const db = getDB();

  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
