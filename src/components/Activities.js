export default function Activities() {
  const activities = [
    {
      title: "Step Up After A/L Program",
      date: "2024 - Auditorium Balika Maha Vidyalaya",
      desc: "A dynamic program guiding students beyond their A/Ls with workshops, mentorship, and hands-on activities to explore career paths and develop essential skills for the future.",
      img: "https://lipsum.app/random/1600x900",
    },
    {
      title: "Step Up After A/L Program",
      date: "2024 - Auditorium Balika Maha Vidyalaya",
      desc: "A dynamic program guiding students beyond their A/Ls with workshops, mentorship, and hands-on activities.",
      img: "https://lipsum.app/random/1600x900",
    },
    {
      title: "Step Up After A/L Program",
      date: "2024 - Auditorium Balika Maha Vidyalaya",
      desc: "Mentorship sessions helping students choose the right career path.",
      img: "https://lipsum.app/random/1600x900",
    },
    {
      title: "Step Up After A/L Program",
      date: "2024 - Auditorium Balika Maha Vidyalaya",
      desc: "Engaging workshops and practical activities for youth empowerment.",
      img: "https://lipsum.app/random/1600x900",
    },
    {
        title:"Step Up After A/L Program",
        date:"2024-Auditorium Balika Maha Vidyalaya",
        desc:"Engaging workshops and practical activities for youth empowerment.",
        img:"https://lipsum.app/random/1600x900",
    },
    {
        title:"Step Up After A/L Program",
        date:"2024-Auditorium Balika Maha Vidyalaya",
        desc:"Engaging workshops and practical activities for youth empowerment.",
        img:"https://lipsum.app/random/1600x900",
    }
  ];

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h1 className="text-light mb-3">Our Activities</h1>
        <p style={{ maxWidth: "600px", margin: "0 auto", color:"rgba(255, 255, 255, 0.6)" }}>
          Discover the exciting initiatives and programs we organize to empower and inspire the youth. From workshops to mentorship sessions, explore how we make a positive impact in our community.
        </p>
      </div>

      <div className="activities-grid">
        {activities.map((activity, index) =>(
            <div key={index} className="activity-card">
                <img src={activity.img} alt={activity.title} className="img-fluid"/>
                <h3 className="text-light">{activity.title}</h3>
                <p className="text-light">{activity.date}</p>
                <p className="text-light">{activity.desc}</p>
            </div>
        ))}
      </div>

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
          padding: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .activity-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
        }

        .activity-card img {
          width: 100%;
          height:300px;
          object-fit:cover;
          border-radius: 1.5rem;
          margin-bottom: 15px;
        }

      `}</style>
    </section>
  );
}
