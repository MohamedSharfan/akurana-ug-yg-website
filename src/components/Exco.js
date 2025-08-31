

export default function Exco(){
    const cards=[{
        name:"M.S.M Sharfan",
        position:"President",
        university:"University of Ruhuna",
        img:"/Sharfan.jpg",
    },
    {
        name:"M.S.F Afra",
        position:"Vice President",
        university:"University of Peradeniya",
        img:"/Afra.jpg",
    },
    {
        name:"M.R.A Sadique",
        position:"Secretary",
        university:"University of Colombo",
        img:"/Sadique.png",
    },
    {
        name:"M.F Saara",
        position:"Assistant Secretary",
        university:"University of Peradeniya",
        img:"/Saara.jpg",
    },
    {
        name:"E.J.M Muaaz",
        position:"Treasurer",
        university:"University of Moratuwa",
        img:"/Muzny.jpg",
    },
    {
        name:"K.R.F Hafsa",
        position:"Assistant Treasurer",
        university:"University of Uvawellassa",
        img:"/Hafsa.jpg",
    },
    {
        name:"M.A Ouff Mohamed",
        position:"Editor",
        university:"University of Sri Jayawardenapura",
        img:"/Ouff.jpg",
    },
    {
        name:"M.F Zainab",
        position:"Junior Editor",
        university:"University of Peradeniya",
        img:"/Zainab.jpg",
    },
    {
        name:"M.S.M Shadhir",
        position:"Event Coordinator",
        university:"University of Ruhuna",
        img:"/Shadhir.jpg",
    },
    {
        name:"M.S Kadheeja",
        position:"Assistant Event Coordinator",
        university:"University of Rajarata",
        img:"/Kadeeja.jpg",
    },
    {
        name:"R.M.F Rukaiya",
        position:"Members' Welfare Coordinator",
        university:"University of Kelaniya",
        img:"/Rukaiya.jpg",
    },
    {
        name:"A.R Ifa",
        position:"Assistant Members' Welfare Coordinator",
        university:"University of Peradeniya",
        img:"/Ifa.jpg",
    },
];

return(
    <section className="container py-5">
        <div className="text-start mb-5">
            <h1 className="text-light mb-5">Executive Committee</h1>
        </div>

        <div className="exco-grid">
            {cards.map((card,index)=>(
                <div key={index} className="cardy">
                    <img src={card.img} alt={card.name} className="img-fluid" />
                    <h4 className="text-light fs-6 fs-md-5">{card.position}</h4>
                    <p className="namee mb-1 fs-6 fs-md-6">{card.name}</p>
                    <p className="fs-7 fs-md-6 university">{card.university}</p>
                </div>
            ))}
        </div>

        <style jsx>
            {`
                .exco-grid{
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 30px;
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

                .cardy img{
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 1.5rem;
                    margin-bottom: 15px;
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

