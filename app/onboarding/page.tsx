'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import styles from './onboarding.module.css';

export default function OnboardingPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        age: '',
        weight: '',
        height: '',
        role: 'GUEST'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In real app, validate and save full profile
        login(formData.username, formData.email, formData.role === 'OWNER' ? 'OWNER' : 'GUEST');
        router.push('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Welcome to HealthBridge</h1>
                <p>Let's get to know you better to personalize your journey.</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Username *</label>
                        <input
                            required
                            type="text"
                            placeholder="How should we call you?"
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email Address *</label>
                        <input
                            required
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label>Age</label>
                            <input
                                type="number"
                                placeholder="Years"
                                value={formData.age}
                                onChange={e => setFormData({ ...formData, age: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Height (cm)</label>
                            <input
                                type="number"
                                placeholder="cm"
                                value={formData.height}
                                onChange={e => setFormData({ ...formData, height: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Weight (kg)</label>
                            <input
                                type="number"
                                placeholder="kg"
                                value={formData.weight}
                                onChange={e => setFormData({ ...formData, weight: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Role (For Demo)</label>
                        <select
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="GUEST">Student / User</option>
                            <option value="OWNER">Owner / Admin</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Start My Journey
                    </button>
                </form>
            </div>
        </div>
    );
}
