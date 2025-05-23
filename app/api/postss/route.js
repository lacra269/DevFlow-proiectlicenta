// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Asigură-te că importul e corect
import prisma from '@/lib/prisma'; // Importă instanța Prisma partajată

// Handler pentru metoda POST (creare postare)
export async function POST(request: Request) {
  console.log('API POST /api/posts: Received request'); // Log pentru debugging

  // 1. Obține sesiunea utilizatorului de pe server
  const session = await getServerSession(authOptions);

  // 2. Verifică dacă utilizatorul este autentificat
  if (!session?.user?.id) {
    console.warn('API POST /api/posts: Unauthorized access attempt.');
    // Returnează eroare 401 Unauthorized dacă nu există sesiune validă
    return NextResponse.json({ error: 'Utilizator neautorizat.' }, { status: 401 });
  }
  // Preia ID-ul utilizatorului autentificat
  const userId = session.user.id;
  console.log(`API POST /api/posts: Authenticated user ID: ${userId}`);

  // 3. Extrage datele postării din corpul cererii (request body)
  try {
    const body = await request.json();
    // Extrage câmpurile trimise de componenta AddPost
    const { description, title, fileUrl, fileType } = body;
    console.log('API POST /api/posts: Data received:', { description, title, fileUrl, fileType });

    // 4. Validează datele primite (minim, descrierea este necesară)
    if (!description || typeof description !== 'string' || description.trim() === '') {
      console.warn('API POST /api/posts: Validation failed - Description is missing.');
      return NextResponse.json({ error: 'Descrierea postării este obligatorie.' }, { status: 400 }); // Bad Request
    }

    // 5. Creează noua postare în baza de date folosind Prisma
    console.log(`API POST /api/posts: Creating post for user ID: ${userId}`);
    const newPost = await prisma.post.create({
      data: {
        description: description.trim(),
        title: title?.trim() || null, // Salvează title dacă există, altfel null
        fileUrl: fileUrl || null,     // Salvează fileUrl dacă există, altfel null
        fileType: fileType || null,   // Salvează fileType dacă există, altfel null
        // Conectează postarea la utilizatorul autentificat folosind ID-ul din sesiune
        authorId: userId,
        // Alternativ, poți folosi:
        // author: {
        //   connect: { id: userId },
        // },
      },
      // Include datele autorului în răspuns pentru a fi folosite în UI imediat
      include: {
        author: {
          select: { // Selectează doar câmpurile necesare ale autorului
            id: true,
            name: true,
            image: true
          }
        }
      }
    });
    console.log('API POST /api/posts: Post created successfully:', newPost);

    // 6. Returnează postarea nou creată cu status 201 Created
    return NextResponse.json(newPost, { status: 201 });

  } catch (error: any) { // Adăugat ': any' pentru a accesa error.code
    console.error("API POST /api/posts: Error processing request:", error);
    // Verifică dacă eroarea este una de parsare JSON
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: 'Format JSON invalid în corpul cererii.' }, { status: 400 });
    }
    // Verifică erori specifice Prisma (ex: cheie externă invalidă)
    if (error.code === 'P2003' || error.code === 'P2025') { // Foreign key constraint or record not found
       console.error('API POST /api/posts: Prisma constraint error - likely invalid authorId.');
       return NextResponse.json({ error: 'Eroare la asocierea postării cu utilizatorul (ID invalid).' }, { status: 400 });
    }
    // Returnează o eroare generică de server
    return NextResponse.json({ error: 'A apărut o eroare la procesarea cererii.' }, { status: 500 });
  }
}

// Handler pentru metoda GET (preluare postări) - Asigură-te că e corect
export async function GET(request: Request) {
    console.log('API GET /api/posts: Received request');
    try {
        // TODO: Implementează paginare (take, skip) pentru performanță
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc' // Ordonează de la cea mai nouă la cea mai veche
            },
            include: {
                author: { // Include informații despre autor
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        });
        console.log(`API GET /api/posts: Returning ${posts.length} posts.`);
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("API GET /api/posts: Error fetching posts:", error);
        return NextResponse.json({ error: 'A apărut o eroare la preluarea postărilor.' }, { status: 500 });
    }
}
