
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Navbar () {
    const[isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const isDonatePage = router.pathname === '/donate';
    const isProfessionalsPage = router.pathname === '/professionals';
    const isHomePage = router.pathname === '/';

    return(
        <nav className='navbar navbar-expand-lg navbar-dark fixed-top'>
            <div className='container'>
                <a href={isHomePage ? "#home" : "/"} className='navbar-brand'><img src="/logo.png" alt="Logo" style={{ width: '50px' }} /></a>
                <button className='navbar-toggler' type='button' onClick={() => setIsOpen(!isOpen)} aria-controls='navbarNav' aria-expanded={isOpen} aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' :''}`} id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <a href={isHomePage ? "#home" : "/#home"} className='nav-link'>Home</a>
                        </li>
                        <li className='nav-item'>
                            <a href={isHomePage ? "#about" : "/#about"} className='nav-link'>About</a>
                        </li>
                        <li className='nav-item'>
                            <a href={isHomePage ? "#activities" : "/#activities"} className='nav-link'>Activities</a>
                        </li>
                        <li className='nav-item'>
                            <a href={isHomePage ? "#contact" : "/#contact"} className='nav-link'>Contact</a>
                        </li>
                        <li className='nav-item'>
                            <a href="/professionals" className='nav-link'>
                                <i className="bi bi-briefcase-fill me-1"></i> Network
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a href="/donate" className='donate-btn'>
                                <i className="bi bi-heart-fill me-1"></i> Donate Us
                            </a>
                        </li>     
                    </ul>
                </div>
            </div>
        </nav>
    );
} 