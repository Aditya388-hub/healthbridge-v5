import styles from './Navbar.module.css'; // Reuse container style or new one? Let's use inline for simplicity or create Footer.module.css. I will create Footer.module.css
import { Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{ background: 'white', padding: '3rem 1.5rem', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Helplines (Singapore)</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={18} color="hsl(var(--primary))" />
                        <span><strong>SOS (24h):</strong> 1-767</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={18} color="hsl(var(--primary))" />
                        <span><strong>IMH Helpline:</strong> 6389-2222</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={18} color="hsl(var(--primary))" />
                        <span><strong>Tinkle Friend:</strong> 1800-274-4788</span>
                    </div>
                </div>
                <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#888' }}>
                    Project HealthBridge does not provide medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
                </p>
            </div>
        </footer>
    );
}
