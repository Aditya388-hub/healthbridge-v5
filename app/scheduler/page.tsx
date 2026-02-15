'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { Routine } from '@/types';
import SchedulerView from '@/components/Scheduler/SchedulerView';
import RoutineBuilder from '@/components/Scheduler/RoutineBuilder';
import IntegrationPanel from '@/components/Scheduler/IntegrationPanel';
import styles from './scheduler.module.css';

export default function SchedulerPage() {
    const { user } = useAuth();
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [showBuilder, setShowBuilder] = useState(false);

    // Mock initial load
    useEffect(() => {
        // In real app, fetch from DB
        const stored = localStorage.getItem('healthbridge_routines');
        if (stored) {
            setRoutines(JSON.parse(stored));
        } else {
            // If no routines, prompt builder
            if (user) setShowBuilder(true);
        }
    }, [user]);

    const addRoutine = (newRoutine: Routine) => {
        const updated = [...routines, newRoutine];
        setRoutines(updated);
        localStorage.setItem('healthbridge_routines', JSON.stringify(updated));
        setShowBuilder(false);
    };

    const toggleComplete = (id: string) => {
        const updated = routines.map(r => {
            if (r.id === id) {
                // Logic for EXP would go here
                return { ...r, completed: !r.completed };
            }
            return r;
        });
        setRoutines(updated);
        localStorage.setItem('healthbridge_routines', JSON.stringify(updated));
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>My Wellness Schedule</h1>
                <button className={styles.addButton} onClick={() => setShowBuilder(true)}>
                    + Add Routine
                </button>
            </header>

            {showBuilder && (
                <RoutineBuilder onSave={addRoutine} onClose={() => setShowBuilder(false)} />
            )}

            <div className={styles.mainGrid}>
                <div className={styles.calendarSection}>
                    <SchedulerView routines={routines} onToggle={toggleComplete} />
                </div>
                <div className={styles.sidePanel}>
                    <IntegrationPanel />
                    <div className={styles.stats}>
                        <h3>Weekly Progress</h3>
                        {/* Mock Stat */}
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: '65%' }}></div>
                        </div>
                        <p>65% of weekly goals met</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
