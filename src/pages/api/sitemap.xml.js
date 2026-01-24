import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: '/professionals', priority: '0.9', changefreq: 'weekly' },
      { url: '/posts', priority: '0.8', changefreq: 'daily' },
      { url: '/donate', priority: '0.7', changefreq: 'monthly' },
    ];

    // Fetch dynamic activities
    const activityIds = [0, 1, 2, 3, 4, 5, 6]; // Based on your activities array

    // Fetch dynamic posts from MongoDB
    const client = await clientPromise;
    const db = client.db('akurana');
    const posts = await db.collection('posts').find({}).sort({ createdAt: -1 }).limit(50).toArray();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
  ${activityIds.map(id => `
  <url>
    <loc>${baseUrl}/activities/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/posts/${post._id}</loc>
    <lastmod>${new Date(post.createdAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}
