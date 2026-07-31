import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/lib/models/Gallery';
import cloudinary from '@/lib/cloudinary';

// GET - Récupérer toutes les images
export async function GET() {
  try {
    await dbConnect();
    const images = await Gallery.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST - Ajouter une image
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.title || !body.category || !body.image) {
      return NextResponse.json(
        { success: false, message: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    const image = await Gallery.create(body);
    return NextResponse.json({ success: true, data: image }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une image
export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const image = await Gallery.findById(id);
    if (!image) {
      return NextResponse.json(
        { success: false, message: 'Image non trouvée' },
        { status: 404 }
      );
    }

    // Supprimer de Cloudinary
    const publicId = image.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`kcaconstruction/gallery/${publicId}`);

    await image.deleteOne();

    return NextResponse.json({
      success: true,
      message: 'Image supprimée avec succès',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}