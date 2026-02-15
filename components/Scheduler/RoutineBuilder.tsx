'use client';

import { useState } from 'react';
import { Routine, RoutineType } from '@/types';
import styles from './SchedulerComponent.module.css';

// We will use inline styles for the modal for speed, but follow the design system
const PURPOSE_OPTIONS = [
    'General Wellbeing',
    'Weight Loss',
    'Mental Clarity',
    'Strength Building',
    'Stress Relief'
];

const SUGGESTIONS: Record<string, Partial<Routine>[]> = {
    'Weight Loss': [
        { title: 'Morning Jog', type: 'PHYSICAL', description: '30 min jog around the park' },
        { title: 'Healthy Breakfast', type: 'PHYSICAL', description: 'Oatmeal with fruits' }
    ],
    'Mental Clarity': [
        { title: 'Meditation', type: 'MENTAL', description: '10 mins of mindfulness' },
        { title: 'Journaling', type: 'MENTAL', description: 'Write down 3 things you are grateful for' }
    ],
    'General Wellbeing': [
        { title: 'Hydration Check', type: 'PHYSICAL', description: 'Drink a glass of water' },
        { title: 'Reading', type: 'MENTAL', description: 'Read 10 pages of a book' }
    ]
};

interface Props {
    onSave: (routine: Routine) => void;
    onClose: () => void;
}

export default function RoutineBuilder({ onSave, onClose }: Props) {
    const [step, setStep] = useState(1);
    const [purpose, setPurpose] = useState('');
    const [selectedSuggestion, setSelectedSuggestion] = useState<Partial<Routine> | null>(null);

    // Custom Routine Form
    const [title, setTitle] = useState('');
    const [type, setType] = useState<RoutineType>('PHYSICAL');
    const [days, setDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
    const [time, setTime] = useState('08:00');

    const handlePurposeSelect = (p: string) => {
        setPurpose(p);
        setStep(2);
    };

    const handleSuggestionSelect = (s: Partial<Routine>) => {
        setTitle(s.title || '');
        setType(s.type || 'PHYSICAL');
        setSelectedSuggestion(s);
        setStep(3);
    };

    const handleSave = () => {
        const newRoutine: Routine = {
            id: crypto.randomUUID(),
            title,
            description: selectedSuggestion?.description || 'Custom routine',
            type,
            completed: false,
            days,
            time
        };
        onSave(newRoutine);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'hsl(var(--foreground))' }}>
                    {step === 1 && "What is your main goal?"}
                    {step === 2 && "Suggested Routines"}
                    {step === 3 && "Customize Routine"}
                </h2>

                {step === 1 && (
                    <div className={styles.routineList}>
                        {PURPOSE_OPTIONS.map(p => (
                            <button
                                key={p}
                                onClick={() => handlePurposeSelect(p)}
                                className={styles.optionBtn}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}

                {step === 2 && (
                    <div className={styles.routineList}>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Based on "{purpose}":</p>
                        {(SUGGESTIONS[purpose] || SUGGESTIONS['General Wellbeing']).map((s, i) => (
                            <button
                                key={i}
                                onClick={() => handleSuggestionSelect(s)}
                                className={styles.optionBtn}
                            >
                                <span style={{ display: 'block', fontWeight: 600 }}>{s.title}</span>
                                <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>{s.type}</span>
                            </button>
                        ))}
                        <button onClick={() => setStep(3)} style={{ color: 'hsl(var(--primary))', fontSize: '0.9rem', marginTop: '0.5rem', textDecoration: 'underline' }}>
                            Skip to Custom
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className={styles.routineList}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={styles.formInput}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Time</label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className={styles.formInput}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value as RoutineType)}
                                    className={styles.formInput}
                                >
                                    <option value="PHYSICAL">Physical</option>
                                    <option value="MENTAL">Mental</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
                            <button
                                onClick={onClose}
                                className={`${styles.actionBtn} ${styles.secondaryBtn}`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className={`${styles.actionBtn} ${styles.primaryBtn}`}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
