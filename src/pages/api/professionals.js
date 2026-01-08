import formidable from 'formidable';
import fs from 'fs';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('akurana');
  const collection = db.collection('professionals');

  // GET - Fetch all professionals
  if (req.method === 'GET') {
    try {
      const { expertise, search } = req.query;
      
      let query = {};
      
      // Filter by expertise if provided
      if (expertise && expertise !== 'all') {
        query.expertise = expertise;
      }
      
      // Search by name, title, or company
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } }
        ];
      }
      
      const professionals = await collection
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();
      
      res.status(200).json({ success: true, professionals });
    } catch (error) {
      console.error('Fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch professionals', details: error.message });
    }
  }
  
  // POST - Add new professional
  else if (req.method === 'POST') {
    try {
      const form = formidable({});
      const [fields, files] = await form.parse(req);

      const file = files.image ? files.image[0] : null;
      const name = fields.name ? fields.name[0] : '';
      const title = fields.title ? fields.title[0] : '';
      const company = fields.company ? fields.company[0] : '';
      const expertise = fields.expertise ? fields.expertise[0] : '';
      const bio = fields.bio ? fields.bio[0] : '';
      const whatsapp = fields.whatsapp ? fields.whatsapp[0] : '';
      const linkedin = fields.linkedin ? fields.linkedin[0] : '';
      const email = fields.email ? fields.email[0] : '';

      let imageData = null;
      if (file) {
        const fileData = fs.readFileSync(file.filepath);
        const base64Image = fileData.toString('base64');
        const mimeType = file.mimetype;
        imageData = `data:${mimeType};base64,${base64Image}`;
        fs.unlinkSync(file.filepath);
      }

      const result = await collection.insertOne({
        name,
        title,
        company,
        expertise,
        bio,
        whatsapp,
        linkedin,
        email,
        image: imageData,
        createdAt: new Date(),
      });

      res.status(200).json({ 
        success: true, 
        message: 'Professional added successfully',
        id: result.insertedId 
      });
    } catch (error) {
      console.error('Add error:', error);
      res.status(500).json({ error: 'Failed to add professional', details: error.message });
    }
  }
  
  // PUT - Update professional
  else if (req.method === 'PUT') {
    try {
      const form = formidable({});
      const [fields, files] = await form.parse(req);

      const id = fields.id ? fields.id[0] : null;
      if (!id) {
        return res.status(400).json({ error: 'Professional ID is required' });
      }

      const file = files.image ? files.image[0] : null;
      const name = fields.name ? fields.name[0] : '';
      const title = fields.title ? fields.title[0] : '';
      const company = fields.company ? fields.company[0] : '';
      const expertise = fields.expertise ? fields.expertise[0] : '';
      const bio = fields.bio ? fields.bio[0] : '';
      const whatsapp = fields.whatsapp ? fields.whatsapp[0] : '';
      const linkedin = fields.linkedin ? fields.linkedin[0] : '';
      const email = fields.email ? fields.email[0] : '';

      let updateData = {
        name,
        title,
        company,
        expertise,
        bio,
        whatsapp,
        linkedin,
        email,
        updatedAt: new Date(),
      };

      // Only update image if new one is provided
      if (file) {
        const fileData = fs.readFileSync(file.filepath);
        const base64Image = fileData.toString('base64');
        const mimeType = file.mimetype;
        updateData.image = `data:${mimeType};base64,${base64Image}`;
        fs.unlinkSync(file.filepath);
      }

      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      res.status(200).json({ 
        success: true, 
        message: 'Professional updated successfully'
      });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ error: 'Failed to update professional', details: error.message });
    }
  }
  
  // DELETE - Remove professional
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Professional ID is required' });
      }

      await collection.deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({ 
        success: true, 
        message: 'Professional deleted successfully'
      });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Failed to delete professional', details: error.message });
    }
  }
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
