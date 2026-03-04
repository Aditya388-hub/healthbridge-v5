
'use client';

import { Routine } from '@/types';
import { CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';
import styles from './SchedulerComponent.module.css';

interface Props {
    routines: Routine[];
    onToggle: (id: string) => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function SchedulerView({ routines, onToggle }: Props) {
    const [selectedDay, setSelectedDay] = useState('Mon');

    const dayRoutines = routines.filter(r => r.days.includes(selectedDay))
        .sort((a, b) => (a.time || '').localeCompare(b.time || ''));

    return (
        <div className={styles.viewContainer}>
            <div className={styles.dayTabs}>
                {DAYS.map(day => (
                    <button
                        key={day}
                        className={`${styles.dayTab} ${selectedDay === day ? styles.activeTab : ''}`}
                        onClick={() => setSelectedDay(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>

            <div className={styles.viewHeader}>
                <h3>Tasks for {selectedDay}</h3>
                <button 
                    className={styles.quickAddBtn}
                    onClick={() => {
                        const addBtn = document.querySelector('[class*="addButton"]') as HTMLButtonElement;
                        if (addBtn) addBtn.click();
                    }}
                >
                    + Quick Add
                </button>
            </div>

            <div className={styles.routineList}>
                {dayRoutines.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No routines scheduled for {selectedDay}. Time to relax!</p>
                    </div>
                ) : (
                    <div className={styles.taskGrid}>
                        {dayRoutines.map(routine => (
                            <div
                                key={routine.id}
                                className={`${styles.routineCard} ${routine.completed ? styles.completed : ''} ${routine.type === 'MENTAL' ? styles.mental : styles.physical}`}
                                onClick={() => onToggle(routine.id)}
                            >
                                <div className={styles.routineTime}>{routine.time}</div>
                                <div className={styles.routineContent}>
                                    <h4>{routine.title}</h4>
                                    <p>{routine.description}</p>
                                </div>
                                <div className={styles.routineCheck}>
                                    {routine.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
