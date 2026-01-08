import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category } = req.query;

    const client = await clientPromise;
    const db = client.db('akurana');
    const collection = db.collection('images');

    // Build query
    const query = category && category !== 'all' ? { category } : {};

    // Fetch images sorted by upload date (newest first)
    const images = await collection
      .find(query)
      .sort({ uploadedAt: -1 })
      .toArray();

    res.status(200).json({ success: true, images });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch images', details: error.message });
  }
}
