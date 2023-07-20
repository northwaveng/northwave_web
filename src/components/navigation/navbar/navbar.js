import Link from 'next/link'
import styles from '@/components/navigation/navbar/Navbar.module.css'
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [navbarScrolled, setNavbarScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > window.screen.height;
            setNavbarScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`${styles.navbar} navbar navbar-expand-md navbar-dark fixed-top ${navbarScrolled ? styles.scrolled : ''
                }`}
        >
            <div className="container-fluid">
                <Link className="navbar-brand text-white" href="/" as="/">
                    <img
                        src="/logo/logo_text_dark_trans.png"
                        alt="logo"
                        className="rounded"
                        width={50}
                    />
                </Link>
            </div>
        </nav>
    );
}
