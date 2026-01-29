import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
        // Increment view count for each post
        data.posts.forEach(post => {
          incrementView(post._id);
        });
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementView = async (postId) => {
    try {
      await fetch('/api/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId, action: 'view' }),
      });
    } catch (error) {
      console.error('Error incrementing view:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  };

  return (
    <>
      <Head>
        <title>Community Posts - Latest News & Updates | Akurana UG & YG</title>
        <meta name="description" content="Stay updated with the latest news, events, and announcements from Akurana UG & YG. Community posts, event updates, and youth empowerment initiatives." />
        <meta name="keywords" content="Akurana news, youth events Sri Lanka, community updates, student announcements, educational programs, mentorship events, career workshops" />
        <link rel="canonical" href="https://yourdomain.com/posts" />
        
        <meta property="og:url" content="https://yourdomain.com/posts" />
        <meta property="og:title" content="Community Posts - Akurana UG & YG" />
        <meta property="og:description" content="Latest news, events, and announcements from our community." />
        
        {/* Structured Data - Blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Akurana UG & YG Community Posts",
            "description": "News, events, and updates from Akurana youth community"
          })}
        </script>
      </Head>
      <div className="body-back">
      <Navbar />
      <div className="container py-5" style={{ marginTop: '100px', minHeight: '100vh' }}>
        <div className="text-center mb-5">
          <h1 className="heading display-3 text-white mb-3">Community Posts</h1>
          <p className="text-white" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Stay updated with our latest news, events, and announcements
          </p>
        </div>

        {loading ? (
          <div className="text-center text-white py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-5">
            <div className="glass-card">
              <i className="bi bi-newspaper" style={{ fontSize: '4rem', color: 'rgba(255, 255, 255, 0.5)' }}></i>
              <h3 className="text-white mt-3">No posts yet</h3>
              <p className="text-white" style={{ opacity: 0.7 }}>
                Check back soon for updates!
              </p>
            </div>
          </div>
        ) : (
          <div className="posts-container">
            {posts.map((post, index) => (
              <div key={post._id} className="post-card">
                <div className="post-header">
                  <div className="post-author">
                    <i className="bi bi-person-circle" style={{ fontSize: '2.5rem', color: 'rgba(255, 255, 255, 0.8)' }}></i>
                    <div>
                      <h5 className="mb-0 text-white">{post.author || 'Akurana UG & YG'}</h5>
                      <small className="text-white-50">{formatDate(post.createdAt)}</small>
                    </div>
                  </div>
                </div>

                <div className="post-content">
                  <h4 className="post-title">{post.title}</h4>
                  <p className="post-description">{post.description}</p>
                  
                  {post.images && post.images.length > 0 && (
                    <div className="post-images-container">
                      {post.images.length === 1 ? (
                        <div className="post-image-container">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.images[0]}
                            alt={post.title}
                            className="post-image"
                            loading={index < 2 ? "eager" : "lazy"}
                            decoding="async"
                            onLoad={(e) => e.target.classList.add('loaded')}
                          />
                        </div>
                      ) : (
                        <div className="post-images-grid">
                          {post.images.map((img, imgIndex) => (
                            <div key={imgIndex} className="post-image-container">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={img}
                                alt={`${post.title} - Image ${imgIndex + 1}`}
                                className="post-image"
                                loading={index < 2 && imgIndex < 2 ? "eager" : "lazy"}
                                decoding="async"
                                onLoad={(e) => e.target.classList.add('loaded')}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="post-footer">
                  <div className="views-count">
                    <i className="bi bi-eye-fill me-2"></i>
                    {post.views || 0} {(post.views || 0) === 1 ? 'View' : 'Views'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <Link href="/" className="back-home-btn">
            <i className="bi bi-house-fill me-2"></i>Back to Home
          </Link>
        </div>
      </div>

      <style jsx>{`
        .posts-container {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .post-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 15px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .post-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
        }

        .post-header {
          padding: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .post-author {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .post-content {
          padding: 20px;
        }

        .post-title {
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .post-description {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 15px;
          white-space: pre-wrap;
        }

        .post-image-container {
          margin-top: 15px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          min-height: 200px;
        }

        .post-images-container {
          margin-top: 15px;
        }

        .post-images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
          margin-top: 15px;
        }

        .post-images-grid .post-image-container {
          min-height: 150px;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .post-image {
          width: 100%;
          height: auto;
          max-height: 500px;
          object-fit: cover;
          display: block;
          opacity: 0;
          transition: opacity 0.3s ease-in;
        }

        .post-images-grid .post-image {
          max-height: 300px;
        }

        .post-image.loaded {
          opacity: 1;
        }

        .post-footer {
          padding: 15px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .views-count {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          padding: 8px 20px;
          background: rgba(100, 150, 255, 0.2);
          border-radius: 20px;
          border: 1px solid rgba(100, 150, 255, 0.3);
        }

        .views-count i {
          color: #6496ff;
        }

        @media (max-width: 768px) {
          .post-title {
            font-size: 1.2rem;
          }
          
          .post-description {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
    </>
  );
}
