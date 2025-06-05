import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "app/api/auth/[...nextauth]/route"; // Sau cale
// Importă funcțiile Cloudinary din lib
import {
    uploadToCloudinary,
    deleteFromCloudinary,
    extractPublicIdFromUrl
} from 'lib/cloudinary'; // Asigură-te că calea este corectă

const prisma = new PrismaClient();

// --- GET /api/posts/[id] ---
// Obține o postare specifică după ID
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const postId = params.id;
    // Opțional: Verifică autentificarea dacă vrei ca doar userii logați să vadă postări individuale
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: {
                    select: { id: true, name: true, image: true },
                },
            },
        });

        if (!post) {
            return NextResponse.json({ message: "Postarea nu a fost găsită" }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        console.error(`Eroare la preluarea postării ${postId}:`, error);
        return NextResponse.json({ message: "Nu s-a putut prelua postarea" }, { status: 500 });
    }
}

// --- PUT /api/posts/[id] ---
// Actualizează o postare existentă
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const postId = params.id;

    // 1. Verifică Autentificarea și obține ID-ul utilizatorului
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as { id?: string }).id) {
        return NextResponse.json({ message: "Neautorizat" }, { status: 401 });
    }
    const userId = (session.user as { id: string }).id;

    try {
        // Verifică dacă postarea există
        const existingPost = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!existingPost) {
            return NextResponse.json({ message: "Postarea nu a fost găsită" }, { status: 404 });
        }

        // Verifică Autorizarea: doar autorul poate modifica
        if (existingPost.authorId !== userId) {
            return NextResponse.json({ message: "Interzis - Nu ești autorul postării" }, { status: 403 });
        }

        const formData = await req.formData();
        const description = formData.get('description') as string;
        const githubLink = formData.get('githubLink') as string | null;
        const imageFile = formData.get('imageFile') as File | null;
        const removeCurrentImage = formData.get('removeCurrentImage') === 'true';

        if (!description || description.trim() === "") {
             return NextResponse.json({ message: "Descrierea nu poate fi goală" }, { status: 400 });
        }

        const updateData: { description: string; githubLink?: string | null; fileUrl?: string | null } = {
             description: description.trim(),
        };
        if (githubLink !== undefined) {
             updateData.githubLink = githubLink === null ? null : githubLink.trim();
        }

        let oldFileUrl: string | null = existingPost.fileUrl;
        let fileUrlToDelete: string | null = null; // Track URL to delete later

        // 2. Gestionează Actualizarea/Ștergerea Imaginii folosind Cloudinary
        if (removeCurrentImage && oldFileUrl) {
             updateData.fileUrl = null; // Setează null în DB
             fileUrlToDelete = oldFileUrl; // Marchează URL-ul vechi pentru ștergere
             oldFileUrl = null; // Resetează oldFileUrl pentru a nu fi șters din nou mai jos
        } else if (imageFile) {
            try {
                // Converteste fișierul în Buffer
                const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
                // Încarcă noua imagine
                const uploadResult = await uploadToCloudinary(fileBuffer, {
                     folder: "devflow_posts" // Exemplu: salvează în același folder
                });
                if (!uploadResult?.secure_url) {
                     throw new Error("Cloudinary upload failed to return a secure URL.");
                }
                updateData.fileUrl = uploadResult.secure_url; // Setează noul URL în datele de update
                // Dacă exista o imagine veche, marcheaz-o pentru ștergere
                if (oldFileUrl && oldFileUrl !== uploadResult.secure_url) {
                    fileUrlToDelete = oldFileUrl;
                }
            } catch (uploadError) {
                 console.error("Eroare la upload imagine Cloudinary (PUT):", uploadError);
                 return NextResponse.json({ message: "Eroare la încărcarea noii imagini" }, { status: 500 });
            }
        }
        // Dacă nu s-a încărcat fișier nou și nu s-a cerut ștergerea, updateData.fileUrl rămâne undefined, deci nu se modifică în DB

        // 3. Actualizează Postarea în Baza de Date
        const updatedPost = await prisma.post.update({
            where: { id: postId, authorId: userId },
            data: updateData,
             include: {
                 author: { select: { id: true, name: true, image: true } },
             },
        });

        // 4. Șterge Imaginea Veche din Cloudinary (dacă este marcată) DUPĂ ce update-ul în DB a reușit
        if (fileUrlToDelete) {
            try {
                const publicId = extractPublicIdFromUrl(fileUrlToDelete);
                if (publicId) {
                    await deleteFromCloudinary(publicId);
                    console.log(`Imaginea veche (${publicId}) ștearsă din Cloudinary.`);
                } else {
                    console.warn(`Nu s-a putut extrage public_id pentru ștergere din URL: ${fileUrlToDelete}`);
                }
            } catch (deleteError) {
                console.error(`Eroare la ștergerea imaginii vechi (${fileUrlToDelete}) din Cloudinary:`, deleteError);
                // Loghează eroarea, dar probabil nu vrei să oprești răspunsul către user aici
            }
        }

        return NextResponse.json(updatedPost);

    } catch (error: any) {
        console.error(`Eroare la actualizarea postării ${postId}:`, error);
        if (error.code === 'P2025') {
             return NextResponse.json({ message: "Postarea nu a fost găsită sau nu ai permisiunea să o modifici" }, { status: 404 });
         }
        return NextResponse.json({ message: "Nu s-a putut actualiza postarea" }, { status: 500 });
    }
}


// --- DELETE /api/posts/[id] ---
// Șterge o postare
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const postId = params.id;

    // 1. Verifică Autentificarea și obține ID-ul utilizatorului
    const session = await getServerSession(authOptions);
    if (!(session?.user && (session.user as { id?: string }).id)) {
        return NextResponse.json({ message: "Neautorizat" }, { status: 401 });
    }
    const userId = (session.user as { id: string }).id;

    try {
        // Verifică dacă postarea există și aparține utilizatorului
        const postToDelete = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!postToDelete) {
            return NextResponse.json({ message: "Postarea nu a fost găsită" }, { status: 404 });
        }
        if (postToDelete.authorId !== userId) {
             return NextResponse.json({ message: "Interzis - Nu ești autorul postării" }, { status: 403 });
        }

        const fileUrlToDelete = postToDelete.fileUrl; // Păstrează URL-ul pentru ștergere

        // 2. Șterge Postarea din Baza de Date ÎNAINTE de a șterge din storage
        //    (Dacă ștergerea din DB eșuează, nu vrem să ștergem imaginea)
        await prisma.post.delete({
            where: { id: postId, authorId: userId },
        });

        // 3. Șterge Imaginea Asociată din Cloudinary (dacă există și ștergerea din DB a reușit)
        if (fileUrlToDelete) {
            try {
                 const publicId = extractPublicIdFromUrl(fileUrlToDelete);
                 if (publicId) {
                     await deleteFromCloudinary(publicId);
                     console.log(`Imaginea (${publicId}) asociată postării șterse ${postId} a fost ștearsă din Cloudinary.`);
                 } else {
                     console.warn(`Nu s-a putut extrage public_id pentru ștergere din URL: ${fileUrlToDelete} pentru postarea ${postId}`);
                 }
            } catch (deleteError) {
                 console.error(`Eroare la ștergerea imaginii (${fileUrlToDelete}) din Cloudinary pentru postarea ${postId}:`, deleteError);
                 // Loghează eroarea, dar ștergerea postării din DB a avut deja loc
            }
        }

        return NextResponse.json({ message: "Postare ștearsă cu succes" }, { status: 200 });

    } catch (error: any) {
        console.error(`Eroare la ștergerea postării ${postId}:`, error);
         if (error.code === 'P2025') {
             return NextResponse.json({ message: "Postarea nu a fost găsită sau nu ai permisiunea să o ștergi" }, { status: 404 });
         }
        return NextResponse.json({ message: "Nu s-a putut șterge postarea" }, { status: 500 });
    }
}
