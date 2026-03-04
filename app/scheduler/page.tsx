'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import { Routine } from '@/types';
import SchedulerView from '@/components/Scheduler/SchedulerView';
import RoutineBuilder from '@/components/Scheduler/RoutineBuilder';
import IntegrationPanel from '@/components/Scheduler/IntegrationPanel';
import { supabase } from '@/lib/supabase';
import styles from './scheduler.module.css';

export default function SchedulerPage() {
    const { user } = useAuth();
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [showBuilder, setShowBuilder] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRoutines = useCallback(async () => {
        if (!user?.email) return;
        
        setIsLoading(true);
        const { data, error } = await supabase
            .from('routines')
            .select('*')
            .eq('user_id', user.email);

        if (error) {
            console.error('Error fetching routines:', error);
        } else if (data) {
            setRoutines(data as Routine[]);
        }
        setIsLoading(false);
    }, [user?.email]);

    useEffect(() => {
        fetchRoutines();
    }, [fetchRoutines]);

    const addRoutine = async (newRoutine: Routine) => {
        if (!user?.email) return;

        const routineWithUserId = { ...newRoutine, user_id: user.email };
        const { error } = await supabase
            .from('routines')
            .insert([routineWithUserId]);

        if (error) {
            console.error('Error adding routine:', error);
            alert('Failed to save routine. Please try again.');
        } else {
            fetchRoutines();
        }
    };

    const toggleComplete = async (id: string) => {
        const routine = routines.find(r => r.id === id);
        if (!routine) return;

        const { error } = await supabase
            .from('routines')
            .update({ completed: !routine.completed })
            .eq('id', id);

        if (error) {
            console.error('Error updating routine:', error);
        } else {
            // Optimistic update
            setRoutines(prev => prev.map(r => 
                r.id === id ? { ...r, completed: !r.completed } : r
            ));
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>My Wellness Schedule</h1>
                <div className={styles.headerActions}>
                    <button className={styles.addButton} onClick={() => setShowBuilder(true)}>
                        + Add Routine
                    </button>
                </div>
            </header>

            {showBuilder && (
                <RoutineBuilder 
                    onSave={addRoutine} 
                    onClose={() => setShowBuilder(false)} 
                />
            )}

            <div className={styles.mainGrid}>
                {isLoading ? (
                    <div className={styles.loadingContainer}>
                        <p>Loading your schedule...</p>
                    </div>
                ) : (
                    <div className={styles.calendarSection}>
                        <SchedulerView routines={routines} onToggle={toggleComplete} />
                    </div>
                )}
                <div className={styles.sidePanel}>
                    <IntegrationPanel />
                    <div className={styles.stats}>
                        <h3>Weekly Progress</h3>
                        <div className={styles.progressBar}>
                            <div 
                                className={styles.progressFill} 
                                style={{ 
                                    width: `${routines.length > 0 
                                        ? Math.round((routines.filter(r => r.completed).length / routines.length) * 100) 
                                        : 0}%` 
                                }}
                            ></div>
                        </div>
                        <p>
                            {routines.length > 0 
                                ? `${Math.round((routines.filter(r => r.completed).length / routines.length) * 100)}% of tasks met today` 
                                : 'No tasks scheduled yet'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

