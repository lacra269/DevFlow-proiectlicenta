import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '/app/api/auth/[...nextauth]/route';
import prisma from '/lib/prisma';

// POST: Creează o nouă postare
export async function POST(request) {
  console.log('API POST /api/posts: Received request');

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    console.warn('API POST /api/posts: Unauthorized access attempt.');
    return NextResponse.json({ error: 'Utilizator neautorizat.' }, { status: 401 });
  }

  const userId = session.user.id;
  console.log(`API POST /api/posts: Authenticated user ID: ${userId}`);

  try {
    const body = await request.json();
    const { description, title, fileUrl, fileType } = body;

    console.log('API POST /api/posts: Data received:', { description, title, fileUrl, fileType });

    if (!description || typeof description !== 'string' || description.trim() === '') {
      console.warn('API POST /api/posts: Validation failed - Description is missing.');
      return NextResponse.json({ error: 'Descrierea postării este obligatorie.' }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        description: description.trim(),
        title: title?.trim() || null,
        fileUrl: fileUrl || null,
        fileType: fileType || null,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    console.log('API POST /api/posts: Post created successfully:', newPost);
    return NextResponse.json(newPost, { status: 201 });

  } catch (error) {
    console.error('API POST /api/posts: Error processing request:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Format JSON invalid în corpul cererii.' }, { status: 400 });
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2003'
    ) {
      return NextResponse.json({ error: 'Eroare la asocierea postării cu utilizatorul (ID invalid).' }, { status: 400 });
    }

    return NextResponse.json({ error: 'A apărut o eroare la procesarea cererii.' }, { status: 500 });
  }
}

// GET: Preia toate postările
export async function GET(request) {
  console.log('API GET /api/posts: Received request');

  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    console.log(`API GET /api/posts: Returning ${posts.length} posts.`);
    return NextResponse.json(posts, { status: 200 });

  } catch (error) {
    console.error('API GET /api/posts: Error fetching posts:', error);
    return NextResponse.json({ error: 'A apărut o eroare la preluarea postărilor.' }, { status: 500 });
  }
}
