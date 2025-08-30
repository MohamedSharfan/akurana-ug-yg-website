import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Activities from "@/components/Activities";

export default function ActivityDetails(){
    const router = useRouter();
    const { id } = router.query;
     


    const activities = [
    {
        title: "Step Up After A/L Program",
        highlight: [
            "Interactive workshops to explore career options",
            "Mentorship sessions with experienced professionals",
            "Hands-on activities for practical skill development",
            "Networking opportunities with peers and experts",
        ],
        desc: "The 'Step Up After A/L Program' is designed to bridge the gap between school life and the next big chapter of your journey. This initiative empowers students to make informed decisions about their future by introducing them to various career pathways, higher education opportunities, and essential life skills.Through **interactive workshops**, students gain practical insights into different industries, enabling them to identify their interests and strengths. Our **mentorship sessions with experienced professionals** provide real-world perspectives, helping participants understand the skills and mindset required to succeed in competitive environments.The program emphasizes **hands-on activities and real projects**, encouraging students to apply what they learn in simulated or real scenarios. In addition, participants benefit from **networking opportunities**, connecting with like-minded peers, industry experts, and potential mentors who can guide them through their personal and professional growth.Whether your goal is to pursue higher education, join the workforce, or explore entrepreneurship, this program equips you with the knowledge, confidence, and strategies to thrive in the future. It's not just about what's next — it's about building the foundation for a lifetime of success.",
        img:[
            "https://lipsum.app/random/1600x900",
            "https://lipsum.app/random/1600x900",
            "https://lipsum.app/random/1600x900",
        ],
    }];
    const activity = activities[Number(id)];

    const [imgCount, setImgCount] = useState(2);
    useEffect(()=>{
        const interval  = setInterval(()=>{
            setImgCount((count) =>(count === activity.img.length -1?0:count+1))
        },5000)
        return()=>clearInterval(interval );
    },[])

    if(!activity) return <p>Activity Not Found</p>

    

    return(
        <div className="container py-4">
            <Link href="/">
                <button className="btn btn-primary">Back</button>
            </Link>
            <div className="row">
                <div className="col-12 mb-3">
                    <img 
                        key={imgCount}
                        src={activity.img[imgCount]}
                        alt="photo"
                        style={{width: "", height:"400px" }}
                        className="img-fluid w-auto img-he "
                    />
                </div>
                <div className="col-12 col-md-8">
                    <h1 className="text-light">{activity.title}</h1>
                    <p className="text-light para" style={{opacity: "0.5"}}>{activity.desc}</p>
                </div> 
                 <ul className="list-group list-group-flush">
                    {activity.highlight.map((item,index)=>{
                        return <li key={index} className="list-group-item text-light d-flex align-items-center" style={{backgroundColor:"transparent", boxShadow:"none", border: "none"}}><i className="bi bi-circle-fill text-warning me-2" style={{color:"rgba(255,255,255,0.5)"}}></i>{item}</li>
                    })}
                    
                 </ul>
            </div>

        </div>
    );
}