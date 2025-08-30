

export default function Sub(){
    const cards=[{
        name:"N.H.F Hansa",
        university:"University of Peradeniya",
        img:"/Hansa.jpg",
    },
    {
        name:"M.A.F Azka",
        university:"South Eastern",
        img:"/Azka.jpg",
    },
    {
        name:"M.N Shafa Maryam",
        university:"University of Rajarata",
        img:"/Shafa.jpg",
    },
    {
        name:"M.S Shamha",
        university:"University of Colombo",
        img:"/pp.jpg",
    },
    {
        name:"K.M Shimla",
        university:"University of Jaffna",
        img:"/Shimla.jpg",
    },
    {
        name:"M.F.F Shuha",
        university:"University of Jaffna",
        img:"/Shuha.jpg",
    },
    {
        name:"F Maryam",
        university:"University of Uvawellessa",
        img:"/pp.jpg",
    },
    {
        name:"M.M.F Shamla",
        university:"South Eastern",
        img:"/Shamla.jpg",
    },
    {
        name:"M.F.M Akmal",
        university:"University of Wayamba",
        img:"/Akmal.jpg",
    },
    {
        name:"M.S.F Nadhiya",
        university:"University of Kelaniya",
        img:"/Nadhiya.jpg",
    },
    {
        name:"R.M Leena Maryam",
        university:"University of Kelaniya",
        img:"/Leena.jpg",
    },
    {
        name:"N.M Razim",
        university:"University of Ruhuna",
        img:"/Razim.jpg",
    },
    {
        name:"H.M.S.M Aamir",
        university:"University of Wayamba",
        img:"/Aamir.jpg",
    },
    {
        name:"M.M.F Mahisha",
        university:"South Eastern",
        img:"/Mahisha.jpg",
    },
    {
        name:"M.R.F Shamla",
        university:"University of Wayamba",
        img:"/pp.jpg",
    },
];

return(
    <section className="container py-5">
        <div className="text-start mb-5">
            <h1 className="text-light mb-5">Sub Committee</h1>
        </div>

        <div className="exco-grid">
            {cards.map((card,index)=>(
                <div key={index} className="cardy">
                    <img src={card.img} alt={card.name} className="img-fluid" />
                    <p className="namee mb-1 fs-6 fs-md-6">{card.name}</p>
                    <p className="fs-7 fs-md-6 university">{card.university}</p>
                </div>
            ))}
        </div>

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
                    padding: 10px;
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

