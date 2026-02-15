'use client';

import { useState } from 'react';
import styles from './SchedulerComponent.module.css';

export default function IntegrationPanel() {
    const [integrations, setIntegrations] = useState({
        google: false,
        apple: false,
        samsung: false,
        outlook: false
    });

    const toggle = (key: keyof typeof integrations) => {
        setIntegrations(prev => ({ ...prev, [key]: !prev[key] }));
        // In real app, this would trigger OAuth flow
    };

    return (
        <div className={styles.routineCard} style={{ display: 'block', cursor: 'default' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'hsl(var(--foreground))' }}>Calendar Sync</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                Allow HealthBridge to add routines to your device calendar.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {Object.entries(integrations).map(([key, enabled]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ textTransform: 'capitalize', fontSize: '0.95rem' }}>{key} Calendar</span>
                        <button
                            onClick={() => toggle(key as keyof typeof integrations)}
                            style={{
                                width: '40px',
                                height: '24px',
                                background: enabled ? 'hsl(var(--secondary))' : '#ddd',
                                borderRadius: '12px',
                                position: 'relative',
                                transition: 'background 0.2s'
                            }}
                        >
                            <span style={{
                                position: 'absolute',
                                left: enabled ? '18px' : '2px',
                                top: '2px',
                                width: '20px',
                                height: '20px',
                                background: 'white',
                                borderRadius: '50%',
                                transition: 'left 0.2s',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                            }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
