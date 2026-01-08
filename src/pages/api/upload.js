import formidable from 'formidable';
import fs from 'fs';
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
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const file = files.image[0];
    const title = fields.title ? fields.title[0] : 'Untitled';
    const description = fields.description ? fields.description[0] : '';
    const category = fields.category ? fields.category[0] : 'general';

    // Read file as base64
    const fileData = fs.readFileSync(file.filepath);
    const base64Image = fileData.toString('base64');
    const mimeType = file.mimetype;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('akurana');
    const collection = db.collection('images');

    // Insert image document
    const result = await collection.insertOne({
      title,
      description,
      category,
      image: `data:${mimeType};base64,${base64Image}`,
      mimeType,
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
