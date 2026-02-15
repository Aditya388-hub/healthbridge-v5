'use client';

import { ReactNode } from 'react';

interface ScrollAnimateProps {
    children: ReactNode;
    className?: string;
}

export default function ScrollAnimate({ children, className = "" }: ScrollAnimateProps) {
    return <div className={className}>{children}</div>;
}
