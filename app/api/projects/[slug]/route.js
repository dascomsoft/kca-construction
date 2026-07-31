import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/lib/models/Project';

// GET - Récupérer un projet par son slug
export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { slug } = await params;
    
    console.log('🔍 Recherche du projet avec slug:', slug);
    
    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Slug manquant' },
        { status: 400 }
      );
    }
    
    const project = await Project.findOne({ slug: slug });
    
    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('❌ Erreur API projet:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un projet
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Slug manquant' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    const project = await Project.findOneAndUpdate(
      { slug: slug },
      body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('❌ Erreur mise à jour:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un projet
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Slug manquant' },
        { status: 400 }
      );
    }

    const project = await Project.findOneAndDelete({ slug: slug });
    
    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Projet supprimé avec succès',
    });
  } catch (error) {
    console.error('❌ Erreur suppression:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}