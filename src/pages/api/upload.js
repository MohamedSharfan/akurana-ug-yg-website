import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';
import clientPromise from '../../../lib/mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 50 * 1024 * 1024, // 50MB
      maxFieldsSize: 50 * 1024 * 1024, // 50MB
    });
    const [fields, files] = await form.parse(req);

    const file = files.image[0];
    const title = fields.title ? fields.title[0] : 'Untitled';
    const description = fields.description ? fields.description[0] : '';
    const category = fields.category ? fields.category[0] : 'general';

    // Read and compress image using Sharp
    const fileData = fs.readFileSync(file.filepath);
    const mimeType = file.mimetype;
    
    let processedImage;
    
    // Compress image based on type
    if (mimeType.startsWith('image/')) {
      processedImage = await sharp(fileData)
        .resize(1200, 1200, { // Max dimensions
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
        .toBuffer();
    } else {
      processedImage = fileData;
    }

    const base64Image = processedImage.toString('base64');
    const finalMimeType = mimeType.startsWith('image/') ? 'image/jpeg' : mimeType;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('akurana');
    const collection = db.collection('images');

    // Insert image document
    const result = await collection.insertOne({
      title,
      description,
      category,
      image: `data:${finalMimeType};base64,${base64Image}`,
      mimeType: finalMimeType,
      uploadedAt: new Date(),
    });

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    res.status(200).json({ 
      success: true, 
      message: 'Image uploaded successfully',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image', details: error.message });
  }
}
