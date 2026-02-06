import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('images'); // 'images', 'exco', 'sub', 'professionals', or 'posts'
  
  // Image upload state
  const [imageFormData, setImageFormData] = useState({
    title: '',
    description: '',
    category: 'activities',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Exco member state
  const [excoFormData, setExcoFormData] = useState({
    name: '',
    position: '',
    university: '',
    order: 0,
  });
  const [excoFile, setExcoFile] = useState(null);
  const [excoPreview, setExcoPreview] = useState(null);
  const [excoUploading, setExcoUploading] = useState(false);
  const [excoMessage, setExcoMessage] = useState('');
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [migratingMembers, setMigratingMembers] = useState(false);
  
  // Sub committee state
  const [subMembers, setSubMembers] = useState([]);

  // Professionals state
  const [profFormData, setProfFormData] = useState({
    name: '',
    title: '',
    company: '',
    expertise: '',
    bio: '',
    whatsapp: '',
    linkedin: '',
    email: '',
  });
  const [profFile, setProfFile] = useState(null);
  const [profPreview, setProfPreview] = useState(null);
  const [profUploading, setProfUploading] = useState(false);
  const [profMessage, setProfMessage] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const [editingProfessional, setEditingProfessional] = useState(null);

  // Posts state
  const [postFormData, setPostFormData] = useState({
    title: '',
    description: '',
    author: 'Akurana UG & YG',
  });
  const [postFiles, setPostFiles] = useState([]);
  const [postPreviews, setPostPreviews] = useState([]);
  const [postUploading, setPostUploading] = useState(false);
  const [postMessage, setPostMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    if (activeTab === 'exco') {
      fetchMembers('exco');
    } else if (activeTab === 'sub') {
      fetchMembers('sub');
    } else if (activeTab === 'professionals') {
      fetchProfessionals();
    } else if (activeTab === 'posts') {
      fetchPosts();
    }
  }, [activeTab]);

  const fetchMembers = async (type = 'exco') => {
    try {
      const response = await fetch(`/api/exco?type=${type}`);
      const data = await response.json();
      console.log(`Admin fetching ${type} members:`, data);
      if (data.success) {
        if (type === 'sub') {
          setSubMembers(data.members);
        } else {
          setMembers(data.members);
        }
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  // Migrate static members to database
  const migrateStaticMembers = async (type = 'exco') => {
    if (!confirm(`This will add all current static ${type === 'sub' ? 'sub committee' : 'executive committee'} members to the database. Continue?`)) return;
    
    setMigratingMembers(true);
    setExcoMessage('');

    const staticExcoMembers = [
      { name: "M.S.M Sharfan", position: "President", university: "University of Ruhuna", img: "/Sharfan.jpg", order: 0 },
      { name: "M.S.F Afra", position: "Vice President", university: "University of Peradeniya", img: "/Afra.jpg", order: 1 },
      { name: "M.R.A Sadique", position: "Secretary", university: "University of Colombo", img: "/Sadique.png", order: 2 },
      { name: "M.F Saara", position: "Assistant Secretary", university: "University of Peradeniya", img: "/Saara.jpg", order: 3 },
      { name: "E.J.M Muaaz", position: "Treasurer", university: "University of Moratuwa", img: "/Muzny.jpg", order: 4 },
      { name: "K.R.F Hafsa", position: "Assistant Treasurer", university: "University of Uvawellassa", img: "/Hafsa.jpg", order: 5 },
      { name: "M.A Ouff Mohamed", position: "Editor", university: "University of Sri Jayawardenapura", img: "/Ouff.jpg", order: 6 },
      { name: "M.F Zainab", position: "Junior Editor", university: "University of Peradeniya", img: "/Zainab.jpg", order: 7 },
      { name: "M.S.M Shadhir", position: "Event Coordinator", university: "University of Ruhuna", img: "/Shadhir.jpg", order: 8 },
      { name: "M.S Kadheeja", position: "Assistant Event Coordinator", university: "University of Rajarata", img: "/Kadeeja.jpg", order: 9 },
      { name: "R.M.F Rukaiya", position: "Members' Welfare Coordinator", university: "University of Kelaniya", img: "/Rukaiya.jpg", order: 10 },
      { name: "A.R Ifa", position: "Assistant Members' Welfare Coordinator", university: "University of Peradeniya", img: "/Ifa.jpg", order: 11 },
    ];

    const staticSubMembers = [
      { name: "N.H.F Hansa", university: "University of Peradeniya", img: "/Hansa.jpg", order: 0 },
      { name: "M.A.F Azka", university: "South Eastern", img: "/Azka.jpg", order: 1 },
      { name: "M.N Shafa Maryam", university: "University of Rajarata", img: "/Shafa.jpg", order: 2 },
      { name: "M.S Shamha", university: "University of Colombo", img: "/pp.jpg", order: 3 },
      { name: "K.M Shimla", university: "University of Jaffna", img: "/Shimla.jpg", order: 4 },
      { name: "M.F.F Shuha", university: "University of Jaffna", img: "/Shuha.jpg", order: 5 },
      { name: "F Maryam", university: "University of Uvawellessa", img: "/pp.jpg", order: 6 },
      { name: "M.M.F Shamla", university: "South Eastern", img: "/Shamla.jpg", order: 7 },
      { name: "M.F.M Akmal", university: "University of Wayamba", img: "/Akmal.jpg", order: 8 },
      { name: "M.S.F Nadhiya", university: "University of Kelaniya", img: "/Nadhiya.jpg", order: 9 },
      { name: "R.M Leena Maryam", university: "University of Kelaniya", img: "/Leena.jpg", order: 10 },
      { name: "N.M Razim", university: "University of Ruhuna", img: "/Razim.jpg", order: 11 },
      { name: "H.M.S.M Aamir", university: "University of Wayamba", img: "/Aamir.jpg", order: 12 },
      { name: "M.M.F Mahisha", university: "South Eastern", img: "/Mahisha.jpg", order: 13 },
      { name: "M.R.F Shamla", university: "University of Wayamba", img: "/pp.jpg", order: 14 },
    ];

    const staticMembers = type === 'sub' ? staticSubMembers : staticExcoMembers;

    try {
      let successCount = 0;
      let failedMembers = [];
      
      for (const member of staticMembers) {
        try {
          // Convert static image path to base64
          const response = await fetch(member.img);
          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${member.img}`);
          }
          
          const blob = await response.blob();
          const reader = new FileReader();
          
          await new Promise((resolve, reject) => {
            reader.onloadend = async () => {
              try {
                const formData = new FormData();
                const file = new File([blob], 'image.jpg', { type: blob.type });
                formData.append('image', file);
                formData.append('name', member.name);
                formData.append('position', member.position || '');
                formData.append('university', member.university);
                formData.append('order', member.order);
                formData.append('type', type);

                const apiResponse = await fetch('/api/exco', {
                  method: 'POST',
                  body: formData,
                });
                
                const result = await apiResponse.json();
                if (!result.success) {
                  throw new Error(result.error || 'Unknown error');
                }
                
                successCount++;
                console.log(`✅ Migrated: ${member.name}`);
                resolve();
              } catch (error) {
                reject(error);
              }
            };
            reader.onerror = () => reject(new Error('Failed to read image'));
            reader.readAsDataURL(blob);
          });
          
          // Add small delay between uploads to prevent overwhelming server
          await new Promise(resolve => setTimeout(resolve, 300));
          
        } catch (error) {
          console.error(`Failed to migrate ${member.name}:`, error);
          failedMembers.push(`${member.name} (${error.message})`);
        }
      }

      if (failedMembers.length > 0) {
        setExcoMessage(`✅ Migrated ${successCount} members. ❌ Failed: ${failedMembers.join(', ')}`);
      } else {
        setExcoMessage(`✅ All ${successCount} members migrated successfully!`);
      }
      fetchMembers(type);
    } catch (error) {
      setExcoMessage('❌ Migration failed: ' + error.message);
    } finally {
      setMigratingMembers(false);
    }
  };

  // Image handlers
  const handleImageInputChange = (e) => {
    setImageFormData({ ...imageFormData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select an image');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', selectedFile);
      formDataToSend.append('title', imageFormData.title);
      formDataToSend.append('description', imageFormData.description);
      formDataToSend.append('category', imageFormData.category);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Image uploaded successfully!');
        setImageFormData({ title: '', description: '', category: 'activities' });
        setSelectedFile(null);
        setPreview(null);
      } else {
        setMessage('Upload failed: ' + data.error);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Exco handlers
  const handleExcoInputChange = (e) => {
    setExcoFormData({ ...excoFormData, [e.target.name]: e.target.value });
  };

  const handleExcoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExcoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setExcoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExcoSubmit = async (e) => {
    e.preventDefault();
    
    if (!editingMember && !excoFile) {
      setExcoMessage('Please select an image');
      return;
    }

    setExcoUploading(true);
    setExcoMessage('');

    try {
      const formDataToSend = new FormData();
      if (excoFile) formDataToSend.append('image', excoFile);
      formDataToSend.append('name', excoFormData.name);
      formDataToSend.append('position', excoFormData.position);
      formDataToSend.append('university', excoFormData.university);
      formDataToSend.append('order', excoFormData.order);
      formDataToSend.append('type', activeTab === 'sub' ? 'sub' : 'exco');

      const url = editingMember ? '/api/exco' : '/api/exco';
      const method = editingMember ? 'PUT' : 'POST';
      
      if (editingMember) {
        formDataToSend.append('id', editingMember._id);
      }

      const response = await fetch(url, {
        method: method,
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setExcoMessage(`Member ${editingMember ? 'updated' : 'added'} successfully!`);
        setExcoFormData({ name: '', position: '', university: '', order: 0 });
        setExcoFile(null);
        setExcoPreview(null);
        setEditingMember(null);
        fetchMembers(activeTab === 'sub' ? 'sub' : 'exco');
      } else {
        setExcoMessage('Operation failed: ' + data.error);
      }
    } catch (error) {
      setExcoMessage('Error: ' + error.message);
    } finally {
      setExcoUploading(false);
    }
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setExcoFormData({
      name: member.name,
      position: member.position,
      university: member.university,
      order: member.order || 0,
    });
    setExcoPreview(member.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteMember = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return;

    try {
      const response = await fetch(`/api/exco?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setExcoMessage('Member deleted successfully!');
        fetchMembers(activeTab === 'sub' ? 'sub' : 'exco');
      } else {
        setExcoMessage('Delete failed: ' + data.error);
      }
    } catch (error) {
      setExcoMessage('Error: ' + error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
    setExcoFormData({ name: '', position: '', university: '', order: 0 });
    setExcoFile(null);
    setExcoPreview(null);
  };

  // Professional handlers
  const fetchProfessionals = async () => {
    try {
      // Add cache busting timestamp to force fresh data
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/professionals?_t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const data = await response.json();
      console.log('Fetched professionals:', data);
      if (data.success) {
        setProfessionals(data.professionals);
      }
    } catch (error) {
      console.error('Error fetching professionals:', error);
    }
  };

  const handleProfInputChange = (e) => {
    setProfFormData({ ...profFormData, [e.target.name]: e.target.value });
  };

  const handleProfFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfSubmit = async (e) => {
    e.preventDefault();
    
    if (!editingProfessional && !profFile) {
      setProfMessage('Please select an image');
      return;
    }

    setProfUploading(true);
    setProfMessage('');

    try {
      const formDataToSend = new FormData();
      if (profFile) formDataToSend.append('image', profFile);
      formDataToSend.append('name', profFormData.name);
      formDataToSend.append('title', profFormData.title);
      formDataToSend.append('company', profFormData.company);
      formDataToSend.append('expertise', profFormData.expertise);
      formDataToSend.append('bio', profFormData.bio);
      formDataToSend.append('whatsapp', profFormData.whatsapp);
      formDataToSend.append('linkedin', profFormData.linkedin);
      formDataToSend.append('email', profFormData.email);

      let response;
      if (editingProfessional) {
        formDataToSend.append('id', editingProfessional._id);
        response = await fetch('/api/professionals', {
          method: 'PUT',
          body: formDataToSend,
        });
      } else {
        response = await fetch('/api/professionals', {
          method: 'POST',
          body: formDataToSend,
        });
      }

      const data = await response.json();
      if (data.success) {
        setProfMessage(editingProfessional ? 'Professional updated successfully!' : 'Professional added successfully!');
        setProfFormData({ name: '', title: '', company: '', expertise: '', bio: '', whatsapp: '', linkedin: '', email: '' });
        setProfFile(null);
        setProfPreview(null);
        setEditingProfessional(null);
        // Clear all cache versions so the network page updates
        localStorage.removeItem('professionals_v1');
        localStorage.removeItem('professionals_time_v1');
        localStorage.removeItem('professionals_data_v2');
        localStorage.removeItem('professionals_time_v2');
        fetchProfessionals();
      } else {
        setProfMessage('Error: ' + data.error);
      }
    } catch (error) {
      setProfMessage('Error: ' + error.message);
    } finally {
      setProfUploading(false);
    }
  };

  const handleEditProfessional = (professional) => {
    setEditingProfessional(professional);
    setProfFormData({
      name: professional.name,
      title: professional.title,
      company: professional.company,
      expertise: professional.expertise,
      bio: professional.bio,
      whatsapp: professional.whatsapp || '',
      linkedin: professional.linkedin || '',
      email: professional.email || '',
    });
    setProfPreview(professional.image);
  };

  const handleDeleteProfessional = async (id) => {
    if (!confirm('Are you sure you want to delete this professional?')) return;

    console.log('Deleting professional with ID:', id);
    
    try {
      const response = await fetch(`/api/professionals?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      console.log('Delete response:', data);
      
      if (data.success) {
        setProfMessage('✅ Professional deleted successfully!');
        // Clear all cache versions so the network page updates
        localStorage.removeItem('professionals_v1');
        localStorage.removeItem('professionals_time_v1');
        localStorage.removeItem('professionals_data_v2');
        localStorage.removeItem('professionals_time_v2');
        // Refresh the list immediately
        await fetchProfessionals();
        // Force re-render by clearing message after a delay
        setTimeout(() => setProfMessage(''), 3000);
      } else {
        setProfMessage('❌ Error: ' + (data.error || 'Failed to delete'));
      }
    } catch (error) {
      console.error('Delete error:', error);
      setProfMessage('❌ Error: ' + error.message);
    }
  };

  const handleCancelProfEdit = () => {
    setEditingProfessional(null);
    setProfFormData({ name: '', title: '', company: '', expertise: '', bio: '', whatsapp: '', linkedin: '', email: '' });
    setProfFile(null);
    setProfPreview(null);
  };

  // Posts management functions
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostInputChange = (e) => {
    setPostFormData({ ...postFormData, [e.target.name]: e.target.value });
  };

  const handlePostFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setPostFiles(files);
      const previews = [];
      let loadedCount = 0;
      
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          loadedCount++;
          if (loadedCount === files.length) {
            setPostPreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setPostUploading(true);
    setPostMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', postFormData.title);
      formDataToSend.append('description', postFormData.description);
      formDataToSend.append('author', postFormData.author);
      
      if (postFiles.length > 0) {
        postFiles.forEach((file) => {
          formDataToSend.append('images', file);
        });
      }

      let url = '/api/posts';
      let method = 'POST';

      if (editingPost) {
        formDataToSend.append('id', editingPost._id);
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setPostMessage(editingPost ? 'Post updated successfully!' : 'Post added successfully!');
        setPostFormData({ title: '', description: '', author: 'Akurana UG & YG' });
        setPostFiles([]);
        setPostPreviews([]);
        setEditingPost(null);
        fetchPosts();
      } else {
        setPostMessage('Error: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      setPostMessage('Error: ' + error.message);
    } finally {
      setPostUploading(false);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostFormData({
      title: post.title,
      description: post.description,
      author: post.author || 'Akurana UG & YG',
    });
    setPostPreviews(post.images || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch('/api/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        setPostMessage('Post deleted successfully!');
        fetchPosts();
      }
    } catch (error) {
      setPostMessage('Error: ' + error.message);
    }
  };

  const handleCancelPostEdit = () => {
    setEditingPost(null);
    setPostFormData({ title: '', description: '', author: 'Akurana UG & YG' });
    setPostFiles([]);
    setPostPreviews([]);
  };

  return (
    <div className="body-back">
      <Navbar />
      <div className="container-fluid px-3 px-md-4 py-5" style={{ marginTop: '100px', minHeight: '100vh' }}>
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="glass-card">
              <h1 className="text-center mb-3 mb-md-4 heading display-5 display-md-4">Admin Panel</h1>
              
              {/* Tab Navigation */}
              <div className="admin-tabs mb-4">
                <button
                  className={`admin-tab ${activeTab === 'images' ? 'active' : ''}`}
                  onClick={() => setActiveTab('images')}
                >
                  <i className="bi bi-image me-2"></i><span className="d-none d-sm-inline">Manage </span>Images
                </button>
                <button
                  className={`admin-tab ${activeTab === 'exco' ? 'active' : ''}`}
                  onClick={() => setActiveTab('exco')}
                >
                  <i className="bi bi-people me-2"></i><span className="d-none d-sm-inline">Executive </span>Committee
                </button>
                <button
                  className={`admin-tab ${activeTab === 'sub' ? 'active' : ''}`}
                  onClick={() => setActiveTab('sub')}
                >
                  <i className="bi bi-people-fill me-2"></i>Sub Committee
                </button>
                <button
                  className={`admin-tab ${activeTab === 'professionals' ? 'active' : ''}`}
                  onClick={() => setActiveTab('professionals')}
                >
                  <i className="bi bi-briefcase me-2"></i>Professionals
                </button>
                <button
                  className={`admin-tab ${activeTab === 'posts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('posts')}
                >
                  <i className="bi bi-newspaper me-2"></i>Posts
                </button>
              </div>

              {/* Image Upload Section */}
              {activeTab === 'images' && (
                <div>
                  <h3 className="text-white mb-4">Upload Activity Images</h3>
                  <form onSubmit={handleImageSubmit}>
                    <div className="mb-4">
                      <label className="form-label text-white">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={imageFormData.title}
                        onChange={handleImageInputChange}
                        className="glass-input form-control"
                        placeholder="Enter image title"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white">Description</label>
                      <textarea
                        name="description"
                        value={imageFormData.description}
                        onChange={handleImageInputChange}
                        className="glass-input form-control"
                        rows="3"
                        placeholder="Enter image description"
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white">Category</label>
                      <select
                        name="category"
                        value={imageFormData.category}
                        onChange={handleImageInputChange}
                        className="glass-input form-control"
                        required
                      >
                        <option value="activities">Activities</option>
                        <option value="events">Events</option>
                        <option value="gallery">Gallery</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white">Select Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="glass-input form-control"
                        required
                      />
                    </div>

                    {preview && (
                      <div className="mb-4 text-center">
                        <label className="form-label text-white d-block">Preview</label>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preview}
                          alt="Preview"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '300px',
                            borderRadius: '10px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                          }}
                        />
                      </div>
                    )}

                    {message && (
                      <div
                        className={`alert ${
                          message.includes('✅') ? 'alert-success' : 'alert-danger'
                        } mb-4`}
                        style={{
                          background: message.includes('✅')
                            ? 'rgba(0, 255, 0, 0.2)'
                            : 'rgba(255, 0, 0, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: 'white',
                        }}
                      >
                        {message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={uploading}
                      className="btn btn-primary w-100"
                      style={{
                        background: 'linear-gradient(135deg, rgba(45, 88, 255, 0.8), rgba(30, 60, 180, 0.8))',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '12px',
                        fontSize: '1.1rem',
                      }}
                    >
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                  </form>
                </div>
              )}

              {/* Executive Committee Section */}
              {(activeTab === 'exco' || activeTab === 'sub') && (
                <div>
                  <h3 className="text-white mb-4">
                    {editingMember ? 'Edit' : 'Add'} {activeTab === 'sub' ? 'Sub' : 'Executive'} Committee Member
                  </h3>
                  
                  {/* Helpful Note */}
                  <div className="alert alert-info mb-4" style={{
                    background: 'rgba(13, 202, 240, 0.15)',
                    border: '1px solid rgba(13, 202, 240, 0.3)',
                    color: 'white',
                    borderRadius: '10px',
                  }}>
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Tip:</strong> To change {activeTab === 'sub' ? 'a member' : 'the President or any position'}, use the &quot;Edit&quot; button on the existing member card below. Don&apos;t add a new member {activeTab === 'exco' ? 'with the same position' : ''} - edit the existing one instead!
                  </div>

                  <form onSubmit={handleExcoSubmit}>
                    <div className="mb-4">
                      <label className="form-label text-white">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={excoFormData.name}
                        onChange={handleExcoInputChange}
                        className="glass-input form-control"
                        placeholder="Enter member name"
                        required
                      />
                    </div>

                    {activeTab === 'exco' && (
                      <div className="mb-4">
                        <label className="form-label text-white">Position</label>
                        <input
                          type="text"
                          name="position"
                          value={excoFormData.position}
                          onChange={handleExcoInputChange}
                          className="glass-input form-control"
                          placeholder="e.g., President, Secretary"
                          required
                        />
                      </div>
                    )}

                    <div className="mb-4">
                      <label className="form-label text-white">University</label>
                      <input
                        type="text"
                        name="university"
                        value={excoFormData.university}
                        onChange={handleExcoInputChange}
                        className="glass-input form-control"
                        placeholder="Enter university name"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white">Display Order</label>
                      <input
                        type="number"
                        name="order"
                        value={excoFormData.order}
                        onChange={handleExcoInputChange}
                        className="glass-input form-control"
                        placeholder="0"
                        min="0"
                      />
                      <small className="text-white" style={{ opacity: 0.7 }}>
                        Lower numbers appear first (President should be 0)
                      </small>
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white">
                        Photo {editingMember && '(Leave empty to keep current photo)'}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleExcoFileChange}
                        className="glass-input form-control"
                        required={!editingMember}
                      />
                    </div>

                    {excoPreview && (
                      <div className="mb-4 text-center">
                        <label className="form-label text-white d-block">Preview</label>
                        <img
                          src={excoPreview}
                          alt="Preview"
                          style={{
                            maxWidth: '200px',
                            maxHeight: '200px',
                            borderRadius: '10px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    )}

                    {excoMessage && (
                      <div
                        className={`alert ${
                          excoMessage.includes('✅') ? 'alert-success' : 'alert-danger'
                        } mb-4`}
                        style={{
                          background: excoMessage.includes('✅')
                            ? 'rgba(0, 255, 0, 0.2)'
                            : 'rgba(255, 0, 0, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: 'white',
                        }}
                      >
                        {excoMessage}
                      </div>
                    )}

                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        disabled={excoUploading}
                        className="btn btn-primary flex-grow-1"
                        style={{
                          background: 'linear-gradient(135deg, rgba(45, 88, 255, 0.8), rgba(30, 60, 180, 0.8))',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          padding: '12px',
                          fontSize: '1.1rem',
                        }}
                      >
                        {excoUploading ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}
                      </button>
                      {editingMember && (
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="btn btn-secondary"
                          style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            padding: '12px 20px',
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Members List */}
                  <div className="mt-5">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-3">
                      <h4 className="text-white mb-0">Current Members ({activeTab === 'sub' ? subMembers.length : members.length})</h4>
                      {((activeTab === 'exco' && members.length === 0) || (activeTab === 'sub' && subMembers.length === 0)) && (
                        <button
                          onClick={() => migrateStaticMembers(activeTab)}
                          disabled={migratingMembers}
                          className="btn btn-success"
                          style={{
                            background: 'rgba(25, 135, 84, 0.3)',
                            border: '1px solid rgba(25, 135, 84, 0.5)',
                            color: 'white',
                          }}
                        >
                          {migratingMembers ? 'Migrating...' : '⬇️ Import Current Members'}
                        </button>
                      )}
                    </div>

                    {((activeTab === 'exco' && members.length === 0) || (activeTab === 'sub' && subMembers.length === 0)) ? (
                      <div className="text-center py-5">
                        <p className="text-white" style={{ opacity: 0.7 }}>
                          No members in database yet. Click &quot;Import Current Members&quot; to add the existing team, or manually add members using the form above.
                        </p>
                      </div>
                    ) : (
                      <div className="members-grid">
                        {(activeTab === 'sub' ? subMembers : members).map((member) => (
                          <div key={member._id} className="member-card">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={member.image || '/placeholder.jpg'}
                              alt={member.name}
                              style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                marginBottom: '10px',
                              }}
                            />
                            {activeTab === 'exco' && <h5 className="text-white mb-1">{member.position}</h5>}
                            <p className="text-white mb-1" style={{ fontSize: '0.9rem' }}>
                              {member.name}
                            </p>
                            <p className="text-white mb-3" style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                              {member.university}
                            </p>
                            <div className="d-flex gap-2">
                              <button
                                onClick={() => handleEditMember(member)}
                                className="btn btn-sm btn-warning flex-grow-1"
                                style={{
                                  background: 'rgba(255, 193, 7, 0.3)',
                                  border: '1px solid rgba(255, 193, 7, 0.5)',
                                  color: 'white',
                                }}
                              >
                                <i className="bi bi-pencil"></i> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member._id)}
                                className="btn btn-sm btn-danger flex-grow-1"
                                style={{
                                  background: 'rgba(220, 53, 69, 0.3)',
                                  border: '1px solid rgba(220, 53, 69, 0.5)',
                                  color: 'white',
                                }}
                              >
                                <i className="bi bi-trash"></i> Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Professionals Section */}
              {activeTab === 'professionals' && (
                <div>
                  <h3 className="text-white mb-4">
                    {editingProfessional ? 'Edit Professional' : 'Add New Professional'}
                  </h3>
                  
                  <form onSubmit={handleProfSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-white">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={profFormData.name}
                          onChange={handleProfInputChange}
                          className="form-control"
                          required
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label text-white">Title/Position *</label>
                        <input
                          type="text"
                          name="title"
                          value={profFormData.title}
                          onChange={handleProfInputChange}
                          className="form-control"
                          required
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label text-white">Company/Organization *</label>
                        <input
                          type="text"
                          name="company"
                          value={profFormData.company}
                          onChange={handleProfInputChange}
                          className="form-control"
                          required
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label text-white">Expertise/Field *</label>
                        <select
                          name="expertise"
                          value={profFormData.expertise}
                          onChange={handleProfInputChange}
                          className="form-select"
                          required
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                        >
                          <option value="">Select Field</option>
                          <optgroup label="Information Technology">
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Data Science & AI">Data Science & AI</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="DevOps & Cloud">DevOps & Cloud</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="IT Support & Networking">IT Support & Networking</option>
                          </optgroup>
                          <optgroup label="Healthcare & Medicine">
                            <option value="Medical Doctor">Medical Doctor</option>
                            <option value="Nursing">Nursing</option>
                            <option value="Pharmacy">Pharmacy</option>
                            <option value="Dentistry">Dentistry</option>
                            <option value="Physiotherapy">Physiotherapy</option>
                            <option value="Medical Laboratory">Medical Laboratory</option>
                            <option value="Public Health">Public Health</option>
                          </optgroup>
                          <optgroup label="Engineering">
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Electronic Engineering">Electronic Engineering</option>
                            <option value="Computer Engineering">Computer Engineering</option>
                            <option value="Chemical Engineering">Chemical Engineering</option>
                            <option value="Construction Management">Construction Management</option>
                          </optgroup>
                          <optgroup label="Business & Finance">
                            <option value="Accounting & Auditing">Accounting & Auditing</option>
                            <option value="Banking & Finance">Banking & Finance</option>
                            <option value="Business Management">Business Management</option>
                            <option value="Marketing & Sales">Marketing & Sales</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Entrepreneurship">Entrepreneurship</option>
                            <option value="Supply Chain Management">Supply Chain Management</option>
                            <option value="Investment & Trading">Investment & Trading</option>
                          </optgroup>
                          <optgroup label="Legal & Governance">
                            <option value="Law & Legal Practice">Law & Legal Practice</option>
                            <option value="Public Administration">Public Administration</option>
                            <option value="Policy Analysis">Policy Analysis</option>
                            <option value="NGO & Development">NGO & Development</option>
                          </optgroup>
                          <optgroup label="Education & Research">
                            <option value="Teaching & Lecturing">Teaching & Lecturing</option>
                            <option value="Educational Administration">Educational Administration</option>
                            <option value="Research & Development">Research & Development</option>
                            <option value="Academic Writing">Academic Writing</option>
                          </optgroup>
                          <optgroup label="Agriculture & Environment">
                            <option value="Agriculture & Farming">Agriculture & Farming</option>
                            <option value="Agricultural Engineering">Agricultural Engineering</option>
                            <option value="Environmental Science">Environmental Science</option>
                            <option value="Veterinary Science">Veterinary Science</option>
                            <option value="Forestry">Forestry</option>
                          </optgroup>
                          <optgroup label="Tourism & Hospitality">
                            <option value="Hotel Management">Hotel Management</option>
                            <option value="Tourism Management">Tourism Management</option>
                            <option value="Event Management">Event Management</option>
                            <option value="Culinary Arts">Culinary Arts</option>
                          </optgroup>
                          <optgroup label="Creative & Media">
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Content Writing">Content Writing</option>
                            <option value="Journalism">Journalism</option>
                            <option value="Photography & Videography">Photography & Videography</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Social Media Management">Social Media Management</option>
                          </optgroup>
                          <optgroup label="Science & Laboratory">
                            <option value="Chemistry">Chemistry</option>
                            <option value="Physics">Physics</option>
                            <option value="Biology">Biology</option>
                            <option value="Biotechnology">Biotechnology</option>
                            <option value="Mathematics & Statistics">Mathematics & Statistics</option>
                          </optgroup>
                          <optgroup label="Other Professions">
                            <option value="Architecture">Architecture</option>
                            <option value="Quantity Surveying">Quantity Surveying</option>
                            <option value="Logistics & Transport">Logistics & Transport</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Security Services">Security Services</option>
                            <option value="Other">Other</option>
                          </optgroup>
                        </select>
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label text-white">Bio/Description *</label>
                        <textarea
                          name="bio"
                          value={profFormData.bio}
                          onChange={handleProfInputChange}
                          className="form-control"
                          rows="3"
                          required
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label text-white">WhatsApp (with country code)</label>
                        <input
                          type="text"
                          name="whatsapp"
                          value={profFormData.whatsapp}
                          onChange={handleProfInputChange}
                          className="form-control"
                          placeholder="+94771234567"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label text-white">LinkedIn URL</label>
                        <input
                          type="url"
                          name="linkedin"
                          value={profFormData.linkedin}
                          onChange={handleProfInputChange}
                          className="form-control"
                          placeholder="https://linkedin.com/in/username"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label text-white">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profFormData.email}
                          onChange={handleProfInputChange}
                          className="form-control"
                          placeholder="email@example.com"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                        />
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label text-white">Profile Image {!editingProfessional && '*'}</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfFileChange}
                          className="form-control"
                          required={!editingProfessional}
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                        />
                        {profPreview && (
                          <div className="mt-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={profPreview}
                              alt="Preview"
                              style={{
                                maxWidth: '200px',
                                maxHeight: '200px',
                                borderRadius: '10px',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        disabled={profUploading}
                        className="btn btn-primary flex-grow-1"
                        style={{
                          background: 'rgba(45, 88, 255, 0.3)',
                          border: '1px solid rgba(45, 88, 255, 0.5)',
                        }}
                      >
                        {profUploading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            {editingProfessional ? 'Updating...' : 'Adding...'}
                          </>
                        ) : (
                          <>{editingProfessional ? 'Update Professional' : 'Add Professional'}</>
                        )}
                      </button>
                      {editingProfessional && (
                        <button
                          type="button"
                          onClick={handleCancelProfEdit}
                          className="btn btn-secondary"
                          style={{
                            background: 'rgba(108, 117, 125, 0.3)',
                            border: '1px solid rgba(108, 117, 125, 0.5)',
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    {profMessage && (
                      <div className="mt-3 text-white text-center">
                        {profMessage}
                      </div>
                    )}
                  </form>

                  {/* Current Professionals */}
                  <div className="mt-5">
                    <h4 className="text-white mb-3">
                      Current Professionals ({professionals.length})
                    </h4>

                    {professionals.length === 0 ? (
                      <div className="text-center py-5">
                        <p className="text-white-50 mb-0">No professionals added yet</p>
                      </div>
                    ) : (
                      <div className="row">
                        {professionals.map((prof) => (
                          <div key={prof._id} className="col-md-6 col-lg-4 mb-3">
                            <div
                              className="p-3"
                              style={{
                                background: 'rgba(255, 255, 255, 0.08)',
                                borderRadius: '15px',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                              }}
                            >
                              {prof.image && (
                                <>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                  src={prof.image}
                                  alt={prof.name}
                                  style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                    marginBottom: '10px',
                                  }}
                                />
                                </>
                              )}
                              <h6 className="text-white mb-1">{prof.name}</h6>
                              <p className="text-white-50 mb-1" style={{ fontSize: '0.9rem' }}>
                                {prof.title}
                              </p>
                              <p className="text-white-50 mb-1" style={{ fontSize: '0.85rem' }}>
                                {prof.company}
                              </p>
                              <p className="mb-2">
                                <span
                                  className="badge"
                                  style={{
                                    background: 'rgba(45, 88, 255, 0.3)',
                                    border: '1px solid rgba(45, 88, 255, 0.5)',
                                    color: 'white',
                                  }}
                                >
                                  {prof.expertise}
                                </span>
                              </p>
                              <div className="d-flex gap-2">
                                <button
                                  onClick={() => handleEditProfessional(prof)}
                                  className="btn btn-sm btn-warning flex-grow-1"
                                  style={{
                                    background: 'rgba(255, 193, 7, 0.3)',
                                    border: '1px solid rgba(255, 193, 7, 0.5)',
                                    color: 'white',
                                  }}
                                >
                                  <i className="bi bi-pencil"></i> Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProfessional(prof._id)}
                                  className="btn btn-sm btn-danger flex-grow-1"
                                  style={{
                                    background: 'rgba(220, 53, 69, 0.3)',
                                    border: '1px solid rgba(220, 53, 69, 0.5)',
                                    color: 'white',
                                  }}
                                >
                                  <i className="bi bi-trash"></i> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Posts Management Section */}
              {activeTab === 'posts' && (
                <div>
                  <h3 className="text-white mb-4">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h3>
                  <form onSubmit={handlePostSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label className="form-label text-white">Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={postFormData.title}
                          onChange={handlePostInputChange}
                          className="form-control"
                          required
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                          placeholder="Enter post title"
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label text-white">Author</label>
                        <input
                          type="text"
                          name="author"
                          value={postFormData.author}
                          onChange={handlePostInputChange}
                          className="form-control"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                          placeholder="Author name"
                        />
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label text-white">Description *</label>
                        <textarea
                          name="description"
                          value={postFormData.description}
                          onChange={handlePostInputChange}
                          className="form-control"
                          rows="5"
                          required
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                          placeholder="Write your post content here..."
                        ></textarea>
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label text-white">Post Images (Multiple)</label>
                        <input
                          type="file"
                          onChange={handlePostFileChange}
                          className="form-control"
                          accept="image/*"
                          multiple
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                          }}
                        />
                        <small className="text-white-50">You can select multiple images</small>
                      </div>

                      {postPreviews.length > 0 && (
                        <div className="col-12 mb-3">
                          <label className="form-label text-white">Image Previews ({postPreviews.length})</label>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
                            {postPreviews.map((preview, idx) => (
                              <img
                                key={idx}
                                src={preview}
                                alt={`Preview ${idx + 1}`}
                                style={{
                                  width: '100%',
                                  height: '150px',
                                  objectFit: 'cover',
                                  borderRadius: '10px',
                                  border: '2px solid rgba(255, 255, 255, 0.3)',
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="col-12">
                        <div className="d-flex gap-2">
                          <button
                            type="submit"
                            className="btn btn-primary flex-grow-1"
                            disabled={postUploading}
                            style={{
                              background: 'rgba(13, 110, 253, 0.3)',
                              border: '1px solid rgba(13, 110, 253, 0.5)',
                              color: 'white',
                            }}
                          >
                            {postUploading ? 'Processing...' : editingPost ? 'Update Post' : 'Create Post'}
                          </button>
                          {editingPost && (
                            <button
                              type="button"
                              onClick={handleCancelPostEdit}
                              className="btn btn-secondary"
                              style={{
                                background: 'rgba(108, 117, 125, 0.3)',
                                border: '1px solid rgba(108, 117, 125, 0.5)',
                                color: 'white',
                              }}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>

                  {postMessage && (
                    <div className={`alert ${postMessage.includes('Error') ? 'alert-danger' : 'alert-success'} mt-3`}>
                      {postMessage}
                    </div>
                  )}

                  <hr className="my-5" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />

                  <div>
                    <h3 className="text-white mb-4">Manage Posts</h3>
                    {posts.length === 0 ? (
                      <p className="text-white-50 text-center py-5">No posts yet. Create your first post above!</p>
                    ) : (
                      <div className="row g-3">
                        {posts.map((post) => (
                          <div key={post._id} className="col-12">
                            <div
                              className="p-3"
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '10px',
                              }}
                            >
                              <div className="d-flex gap-3">
                                {post.images && post.images.length > 0 && (
                                  <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                                    {post.images.slice(0, 2).map((img, imgIdx) => (
                                      <img
                                        key={imgIdx}
                                        src={img}
                                        alt={`${post.title} ${imgIdx + 1}`}
                                        style={{
                                          width: '80px',
                                          height: '80px',
                                          objectFit: 'cover',
                                          borderRadius: '8px',
                                        }}
                                      />
                                    ))}
                                    {post.images.length > 2 && (
                                      <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '8px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                      }}>
                                        +{post.images.length - 2}
                                      </div>
                                    )}
                                  </div>
                                )}
                                <div className="flex-grow-1">
                                  <h5 className="text-white mb-1">{post.title}</h5>
                                  <p className="text-white-50 mb-1" style={{ fontSize: '0.85rem' }}>
                                    By {post.author || 'Akurana UG & YG'}
                                  </p>
                                  <p className="text-white-50 mb-2" style={{ fontSize: '0.85rem' }}>
                                    <i className="bi bi-eye-fill me-1" style={{ color: '#6496ff' }}></i>
                                    {post.views || 0} views
                                  </p>
                                  <p className="text-white mb-2" style={{ fontSize: '0.9rem' }}>
                                    {post.description.substring(0, 100)}
                                    {post.description.length > 100 && '...'}
                                  </p>
                                  <div className="d-flex gap-2">
                                    <button
                                      onClick={() => handleEditPost(post)}
                                      className="btn btn-sm btn-warning"
                                      style={{
                                        background: 'rgba(255, 193, 7, 0.3)',
                                        border: '1px solid rgba(255, 193, 7, 0.5)',
                                        color: 'white',
                                      }}
                                    >
                                      <i className="bi bi-pencil"></i> Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeletePost(post._id)}
                                      className="btn btn-sm btn-danger"
                                      style={{
                                        background: 'rgba(220, 53, 69, 0.3)',
                                        border: '1px solid rgba(220, 53, 69, 0.5)',
                                        color: 'white',
                                      }}
                                    >
                                      <i className="bi bi-trash"></i> Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="text-center mt-5">
                <Link href="/" className="back-home-btn">
                  <i className="bi bi-house-fill me-2"></i>Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
