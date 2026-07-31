import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Video from '@/lib/models/Video';
import cloudinary from '@/lib/cloudinary';

// GET - Récupérer toutes les vidéos
export async function GET() {
  try {
    await dbConnect();
    const videos = await Video.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST - Ajouter une vidéo
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.title || !body.url) {
      return NextResponse.json(
        { success: false, message: 'Le titre et l\'URL sont requis' },
        { status: 400 }
      );
    }

    const video = await Video.create(body);
    return NextResponse.json({ success: true, data: video }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une vidéo
export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;

    const video = await Video.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!video) {
      return NextResponse.json(
        { success: false, message: 'Vidéo non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une vidéo
export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      return NextResponse.json(
        { success: false, message: 'Vidéo non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Vidéo supprimée avec succès',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}