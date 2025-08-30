
import { useState } from 'react';

export default function Navbar () {
    const[isOpen, setIsOpen] = useState(false);


    return(
        <nav className='navbar navbar-expand-lg navbar-dark fixed-top'>
            <div className='container'>
                <a href="#home" className='navbar-brand'><img src="/logo.png" alt="Logo" style={{ width: '50px' }} /></a>
                <button className='navbar-toggler' type='button' onClick={() => setIsOpen(!isOpen)} aria-controls='navbarNav' aria-expanded={isOpen} aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' :''}`} id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <a href="#home" className='nav-link'>Home</a>
                        </li>
                        <li className='nav-item'>
                            <a href="#about" className='nav-link'>About</a>
                        </li>
                        <li className='nav-item'>
                            <a href="#activities" className='nav-link'>Activities</a>
                        </li>
                        <li className='nav-item'>
                            <a href="#contact" className='nav-link'>Contact</a>
                        </li>     
                    </ul>
                </div>
            </div>
        </nav>
    );
} 