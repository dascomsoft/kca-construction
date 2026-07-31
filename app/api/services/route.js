import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/lib/models/Service';

// GET - Récupérer tous les services
export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST - Créer un service
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.title || !body.icon || !body.description) {
      return NextResponse.json(
        { success: false, message: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    const service = await Service.create(body);
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un service
export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;

    const service = await Service.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un service
export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Service supprimé avec succès',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}