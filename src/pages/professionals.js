import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Professionals() {
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');

  const expertiseAreas = [
    'All',
    'Software Engineering',
    'Data Science',
    'Business',
    'Medicine',
    'Engineering',
    'Education',
    'Finance',
    'Marketing',
    'Law',
    'Other'
  ];

  useEffect(() => {
    fetchProfessionals();
  }, []);

  useEffect(() => {
    filterProfessionals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedExpertise, professionals]);

  const fetchProfessionals = async () => {
    // Check cache first
    const cacheKey = 'professionals_v1';
    const cacheTimeKey = 'professionals_time_v1';
    const cacheExpiry = 30 * 60 * 1000; // 30 minutes
    
    try {
      const cachedData = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(cacheTimeKey);
      
      if (cachedData && cachedTime) {
        const age = Date.now() - parseInt(cachedTime);
        if (age < cacheExpiry) {
          // Use cached data
          const data = JSON.parse(cachedData);
          setProfessionals(data);
          setFilteredProfessionals(data);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.log('Cache read error:', err);
    }
    
    try {
      const response = await fetch('/api/professionals?thumbnail=true');
      const data = await response.json();
      if (data.success) {
        setProfessionals(data.professionals);
        setFilteredProfessionals(data.professionals);
        
        // Cache the data
        try {
          localStorage.setItem(cacheKey, JSON.stringify(data.professionals));
          localStorage.setItem(cacheTimeKey, Date.now().toString());
        } catch (err) {
          console.log('Cache write error:', err);
        }
      }
    } catch (error) {
      console.error('Error fetching professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProfessionals = useCallback(() => {
    let filtered = [...professionals];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(prof =>
        prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by expertise
    if (selectedExpertise !== 'all') {
      filtered = filtered.filter(prof => prof.expertise === selectedExpertise);
    }

    setFilteredProfessionals(filtered);
  }, [professionals, searchTerm, selectedExpertise]);

  useEffect(() => {
    filterProfessionals();
  }, [filterProfessionals]);

  return (
    <>
      <Head>
        <title>Professional Network - Connect with Experts | Akurana UG & YG</title>
        <meta name="description" content="Connect with experienced professionals across various fields including Software Engineering, Medicine, Engineering, Law, Business, and more. Network and grow your career in Sri Lanka." />
        <meta name="keywords" content="professional network Sri Lanka, career mentors, software engineers Sri Lanka, doctors Sri Lanka, lawyers Sri Lanka, business professionals, engineering professionals, networking opportunities" />
        <link rel="canonical" href="https://yourdomain.com/professionals" />
        
        <meta property="og:url" content="https://yourdomain.com/professionals" />
        <meta property="og:title" content="Professional Network - Akurana UG & YG" />
        <meta property="og:description" content="Connect with experienced professionals and grow your career." />
        
        {/* Structured Data - Professionals */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Professional Network",
            "description": "Directory of professionals available for mentorship and networking",
            "numberOfItems": filteredProfessionals.length
          })}
        </script>
      </Head>
      <div className="body-back">
      <Navbar />
      <div className="container py-5" style={{ marginTop: '100px', minHeight: '100vh' }}>
        <div className="text-center mb-5">
          <h1 className="heading display-3 text-white mb-3">Professional Network</h1>
          <p className="text-white" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Connect with experienced professionals in various fields. 
            Network, learn, and grow your career!
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="row mb-4">
          <div className="col-md-8 mb-3">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, title, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
            >
              {expertiseAreas.map((area) => (
                <option key={area} value={area === 'All' ? 'all' : area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="professionals-grid">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="professional-card skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-text skeleton-name"></div>
                <div className="skeleton-text skeleton-title"></div>
                <div className="skeleton-text skeleton-company"></div>
                <div className="skeleton-badge"></div>
              </div>
            ))}
          </div>
        ) : filteredProfessionals.length === 0 ? (
          <div className="text-center py-5">
            <div className="glass-card">
              <i className="bi bi-person-x" style={{ fontSize: '4rem', color: 'rgba(255, 255, 255, 0.5)' }}></i>
              <h3 className="text-white mt-3">No professionals found</h3>
              <p className="text-white" style={{ opacity: 0.7 }}>
                {searchTerm || selectedExpertise !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Be the first to join our professional network!'}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-white mb-3" style={{ opacity: 0.8 }}>
              Showing {filteredProfessionals.length} professional{filteredProfessionals.length !== 1 ? 's' : ''}
            </div>
            <div className="professionals-grid">
              {filteredProfessionals.map((prof, index) => (
                <div key={prof._id} className="professional-card">
                  <div className="prof-image-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prof.image || '/placeholder.jpg'}
                      alt={prof.name}
                      className="prof-image"
                      loading={index < 4 ? "eager" : "lazy"}
                      decoding="async"
                      fetchpriority={index < 4 ? "high" : "auto"}
                      onLoad={(e) => e.target.classList.add('loaded')}
                    />
                  </div>
                  <div className="prof-content">
                    <h3 className="prof-name">{prof.name}</h3>
                    <p className="prof-title">{prof.title}</p>
                    <p className="prof-company">
                      <i className="bi bi-building me-2"></i>
                      {prof.company}
                    </p>
                    <div className="prof-expertise">
                      <span className="expertise-badge">{prof.expertise}</span>
                    </div>
                    {prof.bio && (
                      <p className="prof-bio">{prof.bio}</p>
                    )}
                    <div className="prof-actions">
                      {prof.linkedin && (
                        <a
                          href={prof.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="connect-btn linkedin-btn"
                        >
                          <i className="bi bi-linkedin me-2"></i>
                          Connect on LinkedIn
                        </a>
                      )}
                      <div className="social-links">
                        {prof.whatsapp && (
                          <a
                            href={`https://wa.me/${prof.whatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            title="WhatsApp"
                          >
                            <i className="bi bi-whatsapp"></i>
                          </a>
                        )}
                        {prof.email && (
                          <a
                            href={`mailto:${prof.email}`}
                            className="social-link"
                            title="Email"
                          >
                            <i className="bi bi-envelope"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-center mt-5">
          <Link href="/" className="back-home-btn">
            <i className="bi bi-house-fill me-2"></i>Back to Home
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
