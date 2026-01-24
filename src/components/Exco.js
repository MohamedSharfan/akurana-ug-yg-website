import { useEffect, useState } from 'react';

export default function Exco(){
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch('/api/exco?type=exco');
            const data = await response.json();
            
            console.log('Exco API response:', data);
            
            if (data.success && data.members && data.members.length > 0) {
                // Map MongoDB members to cards format
                const dbMembers = data.members.map((member) => ({
                    name: member.name,
                    position: member.position,
                    university: member.university,
                    img: member.image || '/placeholder.jpg',
                }));
                console.log('Mapped exco members:', dbMembers);
                setCards(dbMembers);
            } else {
                // No members in database
                console.log('No exco members found in database');
                setCards([]);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
            setCards([]);
        } finally {
            setLoading(false);
        }
    };

return(
    <section className="container py-5">
        <div className="text-start mb-5">
            <h1 className="text-light mb-5">Executive Committee</h1>
        </div>

        {loading ? (
            <div className="text-center text-white py-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading committee members...</p>
            </div>
        ) : (
            <div className="exco-grid">
                {cards.map((card,index)=>(
                    <div key={index} className="cardy">
                        <div className="image-container">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src={card.img} 
                                alt={card.name} 
                                className="img-fluid member-img" 
                                loading={index < 6 ? "eager" : "lazy"}
                                decoding="async"
                                onLoad={(e) => e.target.classList.add('loaded')}
                            />
                        </div>
                        <h4 className="text-light fs-6 fs-md-5">{card.position}</h4>
                        <p className="namee mb-1 fs-6 fs-md-6">{card.name}</p>
                        <p className="fs-7 fs-md-6 university">{card.university}</p>
                    </div>
                ))}
            </div>
        )}

        <style jsx>
            {`
                .exco-grid{
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 15px;
                }
                .cardy{
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255,0.3);
                    border-radius: 1.5rem;
                    padding: 20px;
                    transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out;
                }
                .cardy:hover{
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
                }

                .image-container {
                    position: relative;
                    width: 100%;
                    height: 150px;
                    background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    border-radius: 1.5rem;
                    margin-bottom: 15px;
                    overflow: hidden;
                }

                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }

                .member-img {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 1.5rem;
                    opacity: 0;
                    transition: opacity 0.3s ease-in;
                }

                .member-img.loaded {
                    opacity: 1;
                }
                .university{
                    color:rgba(255,255,255,0.5);
                }
                .namee{
                    color:#D4AF37;
                    padding:5px 0px;
                }
            `}
        </style>
    </section>
);


}

