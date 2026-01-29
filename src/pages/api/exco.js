import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
    sizeLimit: '50mb',
  },
};

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('akurana');
  const collection = db.collection('exco');

  // GET - Fetch all executive committee members
  if (req.method === 'GET') {
    try {
      const { type, thumbnail } = req.query; // 'exco' or 'sub', thumbnail=true for smaller images
      
      let query;
      if (type === 'sub') {
        query = { type: 'sub' };
      } else if (type === 'exco') {
        query = { type: 'exco' };
      } else {
        // Default: get all exco members (not sub)
        query = { $or: [{ type: 'exco' }, { type: { $exists: false } }] };
      }
      
      const members = await collection
        .find(query)
        .sort({ order: 1 }) // Sort by order field
        .toArray();
      
      // If thumbnail is requested, reduce image quality for faster loading
      if (thumbnail === 'true' && members.length > 0) {
        const optimizedMembers = await Promise.all(members.map(async (member) => {
          if (member.image && member.image.startsWith('data:image')) {
            try {
              const base64Data = member.image.split(',')[1];
              const buffer = Buffer.from(base64Data, 'base64');
              
              // Create smaller thumbnail
              const thumbnail = await sharp(buffer)
                .resize(200, 200, { fit: 'cover' })
                .jpeg({ quality: 70 })
                .toBuffer();
              
              return {
                ...member,
                image: `data:image/jpeg;base64,${thumbnail.toString('base64')}`
              };
            } catch (err) {
              console.error('Error creating thumbnail:', err);
              return member;
            }
          }
          return member;
        }));
        res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
        return res.status(200).json({ success: true, members: optimizedMembers });
      }
      
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      res.status(200).json({ success: true, members });
    } catch (error) {
      console.error('Fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch members', details: error.message });
    }
  }
  
  // POST - Add new member
  else if (req.method === 'POST') {
    try {
      const form = formidable({
        maxFileSize: 50 * 1024 * 1024, // 50MB
        maxFieldsSize: 50 * 1024 * 1024, // 50MB
      });
      const [fields, files] = await form.parse(req);

      const file = files.image ? files.image[0] : null;
      const name = fields.name ? fields.name[0] : '';
      const position = fields.position ? fields.position[0] : '';
      const university = fields.university ? fields.university[0] : '';
      const order = fields.order ? parseInt(fields.order[0]) : 0;
      const type = fields.type ? fields.type[0] : 'exco'; // 'exco' or 'sub'

      let imageData = null;
      if (file) {
        const fileData = fs.readFileSync(file.filepath);
        
        // Compress image for member photos (smaller size needed)
        const compressedImage = await sharp(fileData)
          .resize(400, 400, { // Profile pics don't need to be huge
            fit: 'cover',
            withoutEnlargement: true
          })
          .jpeg({ quality: 85 })
          .toBuffer();
        
        const base64Image = compressedImage.toString('base64');
        imageData = `data:image/jpeg;base64,${base64Image}`;
        fs.unlinkSync(file.filepath);
      }

      const result = await collection.insertOne({
        name,
        position,
        university,
        image: imageData,
        order,
        type,
        createdAt: new Date(),
      });

      res.status(200).json({ 
        success: true, 
        message: 'Member added successfully',
        id: result.insertedId 
      });
    } catch (error) {
      console.error('Add error:', error);
      res.status(500).json({ error: 'Failed to add member', details: error.message });
    }
  }
  
  // PUT - Update member
  else if (req.method === 'PUT') {
    try {
      const form = formidable({
        maxFileSize: 50 * 1024 * 1024, // 50MB
        maxFieldsSize: 50 * 1024 * 1024, // 50MB
      });
      const [fields, files] = await form.parse(req);

      const id = fields.id ? fields.id[0] : null;
      if (!id) {
        return res.status(400).json({ error: 'Member ID is required' });
      }

      const file = files.image ? files.image[0] : null;
      const name = fields.name ? fields.name[0] : '';
      const position = fields.position ? fields.position[0] : '';
      const university = fields.university ? fields.university[0] : '';
      const order = fields.order ? parseInt(fields.order[0]) : 0;
      const type = fields.type ? fields.type[0] : 'exco';

      let updateData = {
        name,
        position,
        university,
        order,
        type,
        updatedAt: new Date(),
      };

      // Only update image if new one is provided
      if (file) {
        const fileData = fs.readFileSync(file.filepath);
        
        // Compress image for member photos
        const compressedImage = await sharp(fileData)
          .resize(400, 400, {
            fit: 'cover',
            withoutEnlargement: true
          })
          .jpeg({ quality: 85 })
          .toBuffer();
        
        const base64Image = compressedImage.toString('base64');
        updateData.image = `data:image/jpeg;base64,${base64Image}`;
        fs.unlinkSync(file.filepath);
      }

      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      res.status(200).json({ 
        success: true, 
        message: 'Member updated successfully'
      });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ error: 'Failed to update member', details: error.message });
    }
  }
  
  // DELETE - Remove member
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Member ID is required' });
      }

      await collection.deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({ 
        success: true, 
        message: 'Member deleted successfully'
      });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Failed to delete member', details: error.message });
    }
  }
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
