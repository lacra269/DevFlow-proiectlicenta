    import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
    import { Readable } from 'stream';
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true, 
    });
    function bufferToStream(buffer: Buffer): Readable {
        const readable = new Readable({
            read() {
                this.push(buffer);
                this.push(null); 
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
    ): Promise<UploadApiResponse> => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                options || {}, 
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return reject(error);
                    }
                    
                    if (result) {
                         resolve(result);
                    } else {
                         reject(new Error("Cloudinary upload result is undefined."));
                    }
                }
            );
           
            bufferToStream(fileBuffer).pipe(uploadStream);
        });
    };


    /**
 
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

   
    export const extractPublicIdFromUrl = (url: string): string | null => {
        try {
           
            const parts = url.split('/');
            
            const uploadIndex = parts.indexOf('upload');
            if (uploadIndex === -1 || uploadIndex + 2 >= parts.length) {
               
                 return null;
            }
           
            const pathWithVersionAndExtension = parts.slice(uploadIndex + 1).join('/');
          
            const pathWithoutVersion = pathWithVersionAndExtension.replace(/^v\d+\//, '');
            
            const publicId = pathWithoutVersion.substring(0, pathWithoutVersion.lastIndexOf('.'));
            return publicId || null;
        } catch (e) {
            console.error("Error extracting public_id from URL:", url, e);
            return null;
        }
    };

    export default cloudinary;
    