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
        desc: "The 'Step Up After A/L Program' is designed to bridge the gap between school life and the next big chapter of your journey. This initiative empowers students to make informed decisions about their future by introducing them to various career pathways, higher education opportunities, and essential life skills. Through **interactive workshops**, students gain practical insights into different industries, enabling them to identify their interests and strengths. Our **mentorship sessions with experienced professionals** provide real-world perspectives, helping participants understand the skills and mindset required to succeed in competitive environments. The program emphasizes **hands-on activities and real projects**, encouraging students to apply what they learn in simulated or real scenarios. In addition, participants benefit from **networking opportunities**, connecting with like-minded peers, industry experts, and potential mentors who can guide them through their personal and professional growth. Whether your goal is to pursue higher education, join the workforce, or explore entrepreneurship, this program equips you with the knowledge, confidence, and strategies to thrive in the future. It's not just about what's next — it's about building the foundation for a lifetime of success.",
        img: [
            "/afteral.jpeg",
            "/afteral2.jpeg",
            "/afteral3.jpeg",
            "/afteral4.jpeg",
        ],
    },
    {
        title: "Annual General Meeting",
        highlight: [
            "Celebrating yearly achievements and milestones",
            "Sharing future plans and initiatives",
            "Interactive Q&A sessions with members",
            "Strengthening unity and collaboration among members",
        ],
        desc: "The Annual General Meeting (AGM) is a flagship event that brings all our members together to celebrate achievements, reflect on our progress, and plan the roadmap for the future. During this gathering, we highlight key milestones, present financial and operational updates, and outline strategic goals for the coming year. This meeting is more than just a review — it’s an opportunity for **active member participation**, where everyone’s voice matters in shaping the organization’s direction. From discussing new initiatives to introducing upcoming programs, the AGM fosters **transparency, collaboration, and strong community engagement**. It’s a chance for members to network, share ideas, and work collectively towards our mission of empowering the next generation.",
        img: [
            "/fresher.jpeg"
        ],
    },
    {
        title: "Before O/L Guidance Programme",
        highlight: [
            "Interactive sessions to prepare for O/L exams",
            "Career awareness sessions for early planning",
            "Building confidence and time management skills",
            "Q&A with educators and professionals",
        ],
        desc: "The **Before O/L Guidance Programme** aims to equip students with the right mindset and strategies as they approach their Ordinary Level examinations. These sessions focus on **career awareness**, helping students understand various educational streams and opportunities beyond school life. In addition to academic tips, the program emphasizes **confidence building, time management, and stress control techniques** to ensure students perform at their best. Expert educators and professionals guide participants through personalized advice, Q&A sessions, and interactive discussions, making this program both informative and inspiring.",
        img: [
            "/beforeol.jpeg",
            "/beforeol2.jpeg",
            "/beforeol3.jpeg",
            "/beforeol4.jpeg",
            "/beforeol5.jpeg",
            "/beforeol6.jpeg",
        ],
    },
    {
        title: "After O/L Guidance Programme",
        highlight: [
            "Helping students choose the right A/L streams",
            "Exploring future academic and career pathways",
            "Mentorship from undergraduates and professionals",
            "Skill-building activities for personal growth",
        ],
        desc: "The **After O/L Guidance Programme** is designed to support students during the critical transition period after their O/L exams. Choosing the right A/L stream is one of the most important decisions in a student’s life, and this program ensures that decision is made with clarity and confidence. Through **interactive sessions**, students learn about different streams, career paths, and higher education options available in Sri Lanka and abroad. Experienced mentors share real-world insights and provide personalized guidance. Additionally, the program includes **soft skills and personal development activities**, helping students prepare not just academically, but also for life beyond school.",
        img: [
            "/afterol.jpeg",
            "/afterol2.jpeg",
            "/afterol3.jpeg",
            "/afterol4.jpeg",
            "/afterol5.jpeg",
        ],
    },
    {
        title: "Before A/L Programme",
        highlight: [
            "Academic preparation strategies for A/L success",
            "Career-oriented sessions for goal setting",
            "Stress management and time optimization techniques",
            "Interactive workshops with subject experts",
        ],
        desc: "The **Before A/L Programme** helps students gear up for one of the most challenging academic phases in their school journey. It offers **comprehensive preparation strategies**, from effective study techniques to stress management skills, ensuring students enter their A/L years with confidence. Our sessions are designed to help students **set clear academic and career goals**, identify their strengths, and build a structured approach to achieving success. This program also provides access to **subject experts and professionals**, who share valuable tips and insights, making learning both effective and enjoyable.",
        img: [
            "/beforeal.jpeg",
            "/beforeal2.jpeg",
            "/beforeal3.jpeg",
            "/beforeal4.jpeg",
            "/beforeal5.jpeg",
        ],
    },
    {
        title: "Akurana UG & YG Annual Members' Get Together",
        highlight: [
            "Building stronger connections among members",
            "Sharing experiences and success stories",
            "Fun activities and networking opportunities",
            "Celebrating unity and community growth",
        ],
        desc: "The **Akurana UG & YG Annual Members’ Get Together** is a vibrant event that brings together our community of undergraduates and young graduates. It’s a day dedicated to **celebrating unity, sharing experiences, and strengthening our network**. The event includes engaging discussions, interactive sessions, and fun activities to foster stronger personal and professional relationships among members. This gathering reflects our mission to create a supportive community that empowers and inspires one another to achieve greater heights.",
        img: [
            "/get2.jpeg",
            "/get3.jpeg",
            "/get4.jpeg",
            "/get6.jpeg",
            "/get5.jpeg",
            "/get1.jpeg",
        ],
    },
    {
        title: "Freshers' Welcome",
        highlight: [
            "A warm introduction to the UG & YG community",
            "Interactive games and bonding activities",
            "Motivational talks from senior members",
            "Opportunities to form lasting friendships",
        ],
        desc: "The **Freshers’ Welcome** is a special event designed to give new members a warm start in the Akurana UG & YG family. This gathering is packed with **fun activities, networking opportunities, and inspirational talks** from senior members who share their experiences and tips for success. It’s not just an introduction — it’s a celebration of new beginnings, where freshers can **build friendships, explore opportunities, and feel at home** within our vibrant community.",
        img: [
            "/fresher1.jpeg",
            "/fresher2.jpeg",
            "/fresher3.jpeg",
            "/fresher4.jpeg",
            "/fresher5.jpeg",
            "/fresher6.jpeg",
        ],
    },
];

    const activity = activities[Number(id)];

    const [imgCount, setImgCount] = useState(2);
    const[fade, setFade] = useState(true);
    useEffect(()=>{
        const interval  = setInterval(()=>{
            setFade(false);
            setTimeout(()=>{
                setImgCount((count) =>(count === activity.img.length -1?0:count+1))
                setFade(true);
            },300);
        },5000);
        return()=>clearInterval(interval );
    },[activity.img.length]);

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
                        alt=""
                        style={{width: "600px", height:"auto" }}
                        className={`img-fluid img-he img-fade ${fade ? 'show':''}`} 
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