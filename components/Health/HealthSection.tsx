'use client';

import { useState, useEffect } from 'react';
import styles from './Health.module.css';

interface Topic {
    title: string;
    content: string;
    icon?: string;
}

interface Props {
    title: string;
    description: string;
    colorTheme: 'blue' | 'green' | 'purple';
    dailyFacts: string[];
    topics: Topic[];
}

export default function HealthSection({ title, description, colorTheme, dailyFacts, topics }: Props) {
    const [fact, setFact] = useState('');

    useEffect(() => {
        // Stable daily random
        const date = new Date();
        const index = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24) % dailyFacts.length;
        setFact(dailyFacts[index]);
    }, [dailyFacts]);

    return (
        <div className={`${styles.container} ${styles[colorTheme]}`}>
            <header className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
            </header>

            <div className={styles.dailyFact}>
                <span className={styles.factLabel}>Daily Insight</span>
                <p>{fact}</p>
            </div>

            <div className={styles.grid}>
                {topics.map((topic, i) => (
                    <div key={i} className={styles.card}>
                        <h2>{topic.title}</h2>
                        <div className={styles.content}>
                            {topic.content}
                        </div>
                        {/* Action button related to topic */}
                        <button className={styles.actionBtn}>Learn More</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
