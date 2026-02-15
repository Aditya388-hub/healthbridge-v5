'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Brain, Calendar, Video, BookOpen, Share2, Menu, X, Bot } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { label: 'Physical', path: '/physical-health', icon: Heart },
        { label: 'Mental', path: '/mental-health', icon: Brain },
        { label: 'Scheduler', path: '/scheduler', icon: Calendar },
        { label: 'MedTalk', path: '/med-talk', icon: Video },
        { label: 'AI Help', path: '/ai-helper', icon: Bot },
        { label: 'Research', path: '/research', icon: BookOpen },
        { label: 'Connect', path: '/connect', icon: Share2 },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.brandWrapper}>
                    <div className={styles.branding}>
                        <div className={styles.logoIcon}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.heartPulseSVG}>
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" opacity="0.2" />
                                <path d="M2.05 8.5C2.05 5.45 4.5 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3 0 5.45 2.45 5.45 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35l-1.45-1.32C5.4 15.36 2.05 12.28 2.05 8.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                <path d="M6 10h2l1-3 2 6 1-3h2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className={styles.brandText}>
                            <span className={styles.mainTitle}>PROJECT HEALTHBRIDGE</span>
                            <span className={styles.subTitle}>STUDENT LED INITIATIVE</span>
                        </div>
                    </div>
                </Link>

                {/* Mobile Menu Button */}
                <button className={styles.mobileMenuBtn} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Nav */}
                <div className={`${styles.navLinks} ${isOpen ? styles.show : ''}`}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    {user ? (
                        <div className={styles.userProfile}>
                            <div className={styles.avatar}>{user.username.charAt(0).toUpperCase()}</div>
                        </div>
                    ) : (
                        <Link href="/onboarding" className={styles.getStarted}>Get Started</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
