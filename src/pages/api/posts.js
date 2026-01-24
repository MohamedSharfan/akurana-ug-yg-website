import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';
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
  const collection = db.collection('posts');

  // GET - Fetch all posts
  if (req.method === 'GET') {
    try {
      const posts = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      res.status(200).json({ success: true, posts });
    } catch (error) {
      console.error('Fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
    }
  }
  
  // POST - Add new post
  else if (req.method === 'POST') {
    try {
      const form = formidable({
        maxFileSize: 50 * 1024 * 1024, // 50MB
        maxFieldsSize: 50 * 1024 * 1024, // 50MB
      });
      const [fields, files] = await form.parse(req);

      const file = files.image ? files.image[0] : null;
      const title = fields.title ? fields.title[0] : '';
      const description = fields.description ? fields.description[0] : '';
      const author = fields.author ? fields.author[0] : 'Akurana UG & YG';

      let imageData = null;
      if (file) {
        const fileData = fs.readFileSync(file.filepath);
        
        // Compress image for posts
        const compressedImage = await sharp(fileData)
          .resize(1200, 1200, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ quality: 80 })
          .toBuffer();
        
        const base64Image = compressedImage.toString('base64');
        imageData = `data:image/jpeg;base64,${base64Image}`;
        fs.unlinkSync(file.filepath);
      }

      const result = await collection.insertOne({
        title,
        description,
        author,
        image: imageData,
        likes: 0,
        createdAt: new Date(),
      });

      res.status(200).json({ 
        success: true, 
        message: 'Post added successfully',
        id: result.insertedId 
      });
    } catch (error) {
      console.error('Add error:', error);
      res.status(500).json({ error: 'Failed to add post', details: error.message });
    }
  }
  
  // PUT - Update post (like or edit)
  else if (req.method === 'PUT') {
    try {
      // Check if it's a form data update or JSON update
      const contentType = req.headers['content-type'];
      
      if (contentType && contentType.includes('application/json')) {
        // Handle like action
        let body = '';
        for await (const chunk of req) {
          body += chunk.toString();
        }
        const { id, action } = JSON.parse(body);

        if (action === 'like') {
          const post = await collection.findOne({ _id: new ObjectId(id) });
          const newLikes = (post.likes || 0) + 1;
          
          await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { likes: newLikes } }
          );

          res.status(200).json({ 
            success: true, 
            message: 'Post liked successfully',
            likes: newLikes
          });
        }
      } else {
        // Handle post edit
        const form = formidable({
          maxFileSize: 50 * 1024 * 1024,
          maxFieldsSize: 50 * 1024 * 1024,
        });
        const [fields, files] = await form.parse(req);

        const id = fields.id ? fields.id[0] : null;
        if (!id) {
          return res.status(400).json({ error: 'Post ID is required' });
        }

        const file = files.image ? files.image[0] : null;
        const title = fields.title ? fields.title[0] : '';
        const description = fields.description ? fields.description[0] : '';
        const author = fields.author ? fields.author[0] : 'Akurana UG & YG';

        let updateData = {
          title,
          description,
          author,
          updatedAt: new Date(),
        };

        if (file) {
          const fileData = fs.readFileSync(file.filepath);
          
          // Compress image for posts
          const compressedImage = await sharp(fileData)
            .resize(1200, 1200, {
              fit: 'inside',
              withoutEnlargement: true
            })
            .jpeg({ quality: 80 })
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
          message: 'Post updated successfully' 
        });
      }
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ error: 'Failed to update post', details: error.message });
    }
  }
  
  // DELETE - Delete post
  else if (req.method === 'DELETE') {
    try {
      let body = '';
      for await (const chunk of req) {
        body += chunk.toString();
      }
      const { id } = JSON.parse(body);

      await collection.deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({ 
        success: true, 
        message: 'Post deleted successfully' 
      });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Failed to delete post', details: error.message });
    }
  }
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
