'use client';

import { Instagram, Activity, Heart, Smartphone } from 'lucide-react';
import styles from './connect.module.css';

export default function ConnectPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Connect with HealthBridge</h1>
            <p className={styles.subtitle}>Join our community and sync your progress.</p>

            <div className={styles.grid}>
                {/* Instagram */}
                <a href="https://instagram.com/project_healthbridge" target="_blank" rel="noopener noreferrer" className={`${styles.card} ${styles.instagram}`}>
                    <Instagram size={48} />
                    <h3>@project_healthbridge</h3>
                    <p>Follow us for daily tips and community stories.</p>
                </a>

                {/* Strava */}
                <div className={`${styles.card} ${styles.strava}`}>
                    <Activity size={48} />
                    <h3>Strava</h3>
                    <p>Connect your account to track runs and rides.</p>
                    <a href="https://www.strava.com/" target="_blank" rel="noopener noreferrer" className={styles.connectBtn}>Connect</a>
                </div>

                {/* Apple Health */}
                <div className={`${styles.card} ${styles.health}`}>
                    <Heart size={48} />
                    <h3>Apple Health</h3>
                    <p>Sync your daily steps and vitals.</p>
                    <a href="https://www.apple.com/ios/health/" target="_blank" rel="noopener noreferrer" className={styles.connectBtn}>Sync</a>
                </div>

                {/* Samsung Health */}
                <div className={`${styles.card} ${styles.samsung}`}>
                    <Smartphone size={48} />
                    <h3>Samsung Health</h3>
                    <p>Integrate your Galaxy rewards.</p>
                    <a href="https://www.samsung.com/global/galaxy/apps/samsung-health/" target="_blank" rel="noopener noreferrer" className={styles.connectBtn}>Link</a>
                </div>
            </div>
        </div>
    );
}
