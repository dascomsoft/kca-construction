import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/lib/models/Project';

// GET - Récupérer tous les projets
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('❌ Erreur API projets:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST - Créer un projet
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.title || !body.category || !body.location) {
      return NextResponse.json(
        { success: false, message: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // 🔧 Générer le slug automatiquement si absent
    if (!body.slug && body.title) {
      let baseSlug = body.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Vérifier l'unicité
      let slug = baseSlug;
      let counter = 1;
      while (await Project.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      body.slug = slug;
    }

    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error('❌ Erreur POST projet:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}