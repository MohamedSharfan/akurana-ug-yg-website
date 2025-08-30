import { useEffect, useState } from "react";


export default function Hero(){
    let heroData = [
        { text1: "Guiding", text2: "Tomorrow’s Leaders" },
        { text1: "Inspiring", text2: "Growth and Excellence" },
        { text1: "Shaping", text2: "Bright Futures" }
    ];
    const heroImages = [
        "/back1.jpeg",
        "/back2.jpeg",
        "/back3.jpeg"
    ];
    const [heroCount,setHeroCount] = useState(2);

    useEffect(()=>{
        const intrevel = setInterval(()=>{
            setHeroCount((count) => {return count===2?0:count+1});
        },5000);
        return()=> clearInterval(intrevel);
    },[])

    return(
        <div className="hero-container position-relative">
            <img 
                key={heroCount} 
                src={heroImages[heroCount]} 
                alt={`back${heroCount+1}`} 
                style={{width: "100%", height:"600px" }}
                className="img-fluid w-100 hero-image" />
            <div className="position-absolute top-50 start-50 translate-middle text-center">
                <h1 className="heading display-4 fw-bold">Akurana Undergraduates and Youngraduates</h1>
                <h1 className="hero_text1 display-4 display-md-3 display-lg-2 text-center">{heroData[heroCount].text1} {heroData[heroCount].text2} </h1>
            </div>
            <div className='hero-dot-play'>
                <ul className='hero-dots'>
                    <li onClick={()=>setHeroCount(0)} className={heroCount === 0?"hero-dot-orange":"hero-dot"}></li>
                    <li onClick={()=>setHeroCount(1)} className={heroCount === 1?"hero-dot-orange":"hero-dot"}></li>
                    <li onClick={()=>setHeroCount(2)} className={heroCount === 2?"hero-dot-orange":"hero-dot"}></li>
                </ul>
            </div>
        </div>
    );
    

}