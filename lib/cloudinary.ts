    import { v2 as cloudinary } from 'cloudinary';
    import { Readable } from 'stream';

    // Configurează Cloudinary folosind variabilele de mediu
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true, // Folosește HTTPS
    });

    /**
     * Funcție helper pentru a converti un Buffer într-un Stream Readable.
     * Necesită pentru metoda `uploader.upload_stream` de la Cloudinary.
     */
    function bufferToStream(buffer: Buffer): Readable {
        const readable = new Readable({
            read() {
                this.push(buffer);
                this.push(null); // Semnalează sfârșitul stream-ului
            }
        });
        return readable;
    }

    /**
     * Încarcă un fișier (ca Buffer) în Cloudinary.
     * @param fileBuffer Buffer-ul fișierului de încărcat.
     * @param options Opțiuni suplimentare pentru Cloudinary (ex: folder, public_id).
     * @returns Promise care rezolvă cu rezultatul upload-ului Cloudinary.
     */
    export const uploadToCloudinary = (
        fileBuffer: Buffer,
        options?: object
    ): Promise<cloudinary.UploadApiResponse> => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                options || {}, // Poți pasa opțiuni aici (ex: folder)
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return reject(error);
                    }
                    // Asigură-te că result nu este undefined înainte de a rezolva
                    if (result) {
                         resolve(result);
                    } else {
                         reject(new Error("Cloudinary upload result is undefined."));
                    }
                }
            );
            // Converteste buffer-ul în stream și trimite-l către Cloudinary
            bufferToStream(fileBuffer).pipe(uploadStream);
        });
    };


    /**
     * Șterge o resursă din Cloudinary folosind public_id.
     * @param publicId ID-ul public al resursei de șters.
     * @returns Promise care rezolvă cu rezultatul ștergerii.
     */
    export const deleteFromCloudinary = (publicId: string): Promise<any> => {
         return new Promise((resolve, reject) => {
             cloudinary.uploader.destroy(publicId, (error, result) => {
                 if (error) {
                     console.error("Cloudinary delete error:", error);
                     return reject(error);
                 }
                 resolve(result);
             });
         });
    };

    /**
     * Extrage public_id dintr-un URL Cloudinary.
     * Aceasta este o implementare SIMPLĂ și poate necesita ajustări
     * în funcție de structura URL-urilor tale (ex: dacă folosești foldere).
     * @param url URL-ul Cloudinary.
     * @returns Public ID-ul extras sau null dacă nu poate fi extras.
     */
    export const extractPublicIdFromUrl = (url: string): string | null => {
        try {
            // Exemplu: https://res.cloudinary.com/demo/image/upload/v1624300000/folder/public_id.jpg
            const parts = url.split('/');
            // Găsește indexul lui 'upload'
            const uploadIndex = parts.indexOf('upload');
            if (uploadIndex === -1 || uploadIndex + 2 >= parts.length) {
                 // Dacă 'upload' nu e găsit sau nu există suficiente părți după el
                 return null;
            }
            // Extrage partea care conține versiunea și public_id (ex: v1624300000/folder/public_id.jpg)
            const pathWithVersionAndExtension = parts.slice(uploadIndex + 1).join('/');
            // Elimină versiunea (ex: v1234567890/) dacă există
            const pathWithoutVersion = pathWithVersionAndExtension.replace(/^v\d+\//, '');
            // Elimină extensia fișierului
            const publicId = pathWithoutVersion.substring(0, pathWithoutVersion.lastIndexOf('.'));
            return publicId || null; // Returnează null dacă publicId e gol
        } catch (e) {
            console.error("Error extracting public_id from URL:", url, e);
            return null;
        }
    };

    export default cloudinary; // Exportă instanța configurată dacă e nevoie în altă parte

    