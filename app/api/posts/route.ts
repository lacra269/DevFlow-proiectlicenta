import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "app/api/auth/[...nextauth]/route"; // Sau calea relativă corespunzătoare
// Importă funcțiile Cloudinary din lib
import { uploadToCloudinary } from 'lib/cloudinary'; // Asigură-te că calea este corectă

const prisma = new PrismaClient();

// --- GET /api/posts ---
// Obține toate postările (sau filtrate, paginate etc.)
export async function GET(req: NextRequest) {
    // Pentru GET, s-ar putea să NU ai nevoie de autentificare, depinde dacă vrei
    // ca oricine să vadă postările sau doar utilizatorii logați.
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc', // Afișează cele mai noi primele
            },
            include: {
                author: { // Include datele autorului (nume, imagine/avatar)
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Eroare la preluarea postărilor:", error);
        return NextResponse.json({ message: "Nu s-au putut prelua postările" }, { status: 500 });
    }
}

// --- POST /api/posts ---
// Creează o postare nouă
export async function POST(req: NextRequest) {
    // 1. Verifică Autentificarea Utilizatorului
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Neautorizat" }, { status: 401 });
    }
    const userId = session.user.id;

    try {
        const formData = await req.formData();
        const description = formData.get('description') as string;
        const githubLink = formData.get('githubLink') as string | null;
        const imageFile = formData.get('imageFile') as File | null;

        if (!description || description.trim() === "") {
             return NextResponse.json({ message: "Descrierea este obligatorie" }, { status: 400 });
        }

        let fileUrl: string | null = null;

        // 2. Gestionează Upload-ul de Imagine (dacă există) folosind Cloudinary
        if (imageFile) {
            try {
                // Converteste fișierul în Buffer
                const fileBuffer = Buffer.from(await imageFile.arrayBuffer());

                // Încarcă în Cloudinary (poți adăuga opțiuni, ex: folder)
                const uploadResult = await uploadToCloudinary(fileBuffer, {
                     folder: "devflow_posts" // Exemplu: salvează într-un folder specific
                });

                if (!uploadResult?.secure_url) {
                     throw new Error("Cloudinary upload failed to return a secure URL.");
                }
                fileUrl = uploadResult.secure_url; // Salvează URL-ul securizat returnat

            } catch (uploadError) {
                 console.error("Eroare la upload imagine Cloudinary:", uploadError);
                 return NextResponse.json({ message: "Eroare la încărcarea imaginii" }, { status: 500 });
            }
        }

        // 3. Creează Postarea în Baza de Date
        const newPost = await prisma.post.create({
            data: {
                description: description.trim(),
                githubLink: githubLink?.trim() || null,
                fileUrl: fileUrl, // URL-ul de la Cloudinary
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

        return NextResponse.json(newPost, { status: 201 });

    } catch (error: any) {
        console.error("Eroare la crearea postării:", error);
         if (error.code === 'P2002') {
             return NextResponse.json({ message: "Eroare specifică bazei de date." }, { status: 409 });
         }
        return NextResponse.json({ message: "Nu s-a putut crea postarea" }, { status: 500 });
    }
}
