'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { ReactNode } from 'react';

interface ScrollAnimateProps {
    children: ReactNode;
    className?: string;
    delay?: number; // Delay in ms
    threshold?: number;
    staggerIndex?: number; // For staggered lists
    as?: React.ElementType; // To render as different tag (e.g., 'main', 'section')
}

export default function ScrollAnimate({
    children,
    className = "",
    delay = 0,
    threshold = 0.1,
    staggerIndex = 0
}: ScrollAnimateProps) {
    const { ref, controls } = useScrollAnimation(threshold);

    const variants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: (delay / 1000) + (staggerIndex * 0.1)
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
