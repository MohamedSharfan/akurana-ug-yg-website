import { useRef } from "react";

export default function Contact(){

    const handleSubmit = () => {
        const form = document.querySelector("form"); // select the form
        if (form) {
            setTimeout(() => form.reset(), 1000); // small delay so Web3Forms receives data
        }
};

    return(
        <section id="contact" className="container py-4 mx-auto">
        <form action="https://api.web3forms.com/submit" method="POST" onSubmit={handleSubmit}>
            <div id="contact-container" className="row align-items-center">
                <div className="col-lg-6 mb-lg-0 text-lg-start text-center text-lg-start mb-4 text-light ">
                    <h2 className="fw-bold display-5 display-md-4">Contact Us</h2>
                    <p className="lead fs-6 fs-md-5">
                        Have questions, ideas, or want to collaborate with us?  
                        We’d love to hear from you!  
                        Feel free to reach out for guidance, event details, or partnership opportunities.  
                        The Akurana Undergraduates & Young Graduates team is always ready to support and inspire the youth towards a brighter future.  
                        Contact us today and let’s make an impact together!
                    </p>
                </div>
                <div className="col-lg-6 ">
                    <input type="hidden" name="access_key" value="e22974d7-d479-4aa8-b873-72995116eb73" />
                    
                    <div className="mb-3 text-start">  
                        <label htmlFor="name" className="form-label text-start text-light">Name</label>
                        <input type="text" className="form-control glass-input" id="name" name="name" required placeholder="Enter your name"/>
                    </div>
                    <div className="mb-3  text-start">
                        <label htmlFor="email" className="form-label text-light">Email</label>
                        <input type="email" id="email" className="form-control glass-input" name="email" required placeholder="Enter your email"/>
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="message" className="form-label text-light">Messege</label>
                        <textarea name="message" className="form-control glass-input" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary ">Send</button>  
                </div>
            </div>
        </form>
        </section>
    );
    
}