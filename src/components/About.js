export default function About() {
    
    return(
        <section id="about" className="py-7 px-2" >
            <div className="container" id="about-container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h2 className="mb-4 text-center text-lg-start">About Us</h2>
                        <p className="about-text" style={{textAlign: "justify"}}>
                        Akurana Undergraduates and Young Graduates is dedicated to guiding students completing their O/L and A/L exams through one of life’s most crucial turning points. We provide clear career pathways, practical guidance, and resources to help them make informed decisions aligned with their passions. Through interactive workshops, personalized mentorship, and a strong support network, we empower youth to explore opportunities, gain essential skills, and build confidence for higher education and beyond—preparing them for success and positive contributions to society.
                        </p>
                    </div>
                
                    <div className="col-lg-6 text-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/img5.jpeg" alt="group" style={{width:"500px"}} className="img-fluid shadow group"/>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .about-text {
                    font-size: 1.25rem;
                }
                
                @media (max-width: 768px) {
                    .about-text {
                        font-size: 0.95rem;
                    }
                }
            `}</style>
        </section>
    );
}