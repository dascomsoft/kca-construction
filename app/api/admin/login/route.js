import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Admin par défaut (à sécuriser avec une base de données)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@kcaconstruction.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: 'admin' },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '7d' }
      );

      return NextResponse.json({
        success: true,
        data: {
          token,
          admin: {
            email,
            name: 'Administrateur',
            role: 'admin',
          },
        },
      });
    }

    return NextResponse.json(
      { success: false, message: 'Email ou mot de passe incorrect' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}