import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Activities() {
  const router = useRouter();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default/fallback static activities
  const fallbackActivities = [
    {
      title: "Step Up After A/L Programme",
      desc: "A dynamic program guiding students beyond their A/Ls with workshops, mentorship, and hands-on activities to explore career paths and develop essential skills for the future.",
      img: "/afteral3.jpeg",
    },
    {
      title: "Annual General Meeting",
      desc: "Celebrating achievements, sharing future plans, and shaping the path for empowering the next generation.",
      img: "/agm.jpeg",
    },
    {
      title: "Before O/L Guidance Programme",
      desc: "Interactive sessions designed to guide students before O/L exams, helping them discover their strengths and make informed career choices.",
      img: "/beforeol.jpeg",
    },
    {
      title: "After O/L Guidance Programme",
      desc: "Empowering students after O/Ls with interactive workshops, career guidance, and essential skill-building activities.",
      img: "/afterol2.jpeg",
    },
    {
        title:"Before A/L Programme",
        desc:"Helping students prepare for A/Ls through focused sessions, career guidance, and skill development activities.",
        img:"/beforeal5.jpeg",
    },
    {
        title:"Akurana UG & YG Annual Members' Get Together",
        desc:"An exciting gathering to strengthen connections, share ideas, and celebrate our community spirit.",
        img:"/get2.jpeg",
    },
    {
        title:"Freshers' Welcome",
        desc:"A warm welcome event to connect, share experiences, and celebrate new beginnings.",
        img:"/fresher3.jpeg",
    }
  ];

  useEffect(() => {
    fetchActivities();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/images?category=activities');
      const data = await response.json();
      
      if (data.success && data.images.length > 0) {
        // Database has images - use them (overrides static)
        const dbActivities = data.images.map((img) => ({
          title: img.title,
          desc: img.description || "No description available",
          img: img.image, // Base64 image from MongoDB
        }));
        setActivities(dbActivities);
      } else {
        // Database empty - show default static content
        setActivities(fallbackActivities);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      // Show default content on error
      setActivities(fallbackActivities);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-5" id="activities">
      <div className="text-center mb-5">
        <h1 className="text-light mb-3">Our Activities</h1>
        <p style={{ maxWidth: "600px", margin: "0 auto", color:"rgba(255, 255, 255, 0.6)" }}>
          Discover the exciting initiatives and programs we organize to empower and inspire the youth. From workshops to mentorship sessions, explore how we make a positive impact in our community.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-white py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading activities...</p>
        </div>
      ) : (
        <div className="activities-grid">
          {activities.map((activity, index) =>(
              <div 
                key={index}
                className="activity-card"
                onClick={()=> router.push(`/activities/${index}`)}
              >
                  <div className="activity-image-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={activity.img} 
                      alt={activity.title} 
                      className="activity-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="activity-content">
                    <h3 className="activity-title">{activity.title}</h3>
                    <p className="activity-desc">{activity.desc}</p>
                  </div>
              </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .activities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .activity-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 1.5rem;
          padding: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          overflow: hidden;
          text-align: center;
        }

        .activity-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
        }

        .activity-image-container {
          width: 100%;
          height: 250px;
          overflow: hidden;
        }

        .activity-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .activity-card:hover .activity-image {
          transform: scale(1.1);
        }

        .activity-content {
          padding: 25px 20px;
        }

        .activity-title {
          color: white;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 15px;
          line-height: 1.4;
        }

        .activity-desc {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .activities-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .activity-image-container {
            height: 200px;
          }

          .activity-content {
            padding: 20px 15px;
          }

          .activity-title {
            font-size: 1.1rem;
            margin-bottom: 12px;
          }

          .activity-desc {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .activity-image-container {
            height: 180px;
          }

          .activity-content {
            padding: 15px 12px;
          }

          .activity-title {
            font-size: 1rem;
          }

          .activity-desc {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
