import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a buffer (from multer memoryStorage — required on Vercel's
 * serverless functions, which have no persistent disk) straight to
 * Cloudinary via an upload stream.
 * @param {Buffer} buffer
 * @param {{folder?: string, resourceType?: string}} options
 */
export function uploadBuffer(buffer, { folder = "lttc", resourceType = "auto" } = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (err, result) => (err ? reject(err) : resolve(result)),
    );
    stream.end(buffer);
  });
}

export function deleteAsset(publicId, resourceType = "auto") {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export default cloudinary;
