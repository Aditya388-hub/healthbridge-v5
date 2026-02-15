'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { FileText, Upload, Download, Eye } from 'lucide-react';
import styles from './research.module.css';

const INITIAL_PAPERS: any[] = [];

export default function ResearchPage() {
    const { user } = useAuth();
    const [papers, setPapers] = useState(INITIAL_PAPERS);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchPapers = async () => {
            const { data, error } = await supabase.from('papers').select('*').order('created_at', { ascending: false });
            if (data) setPapers(data);
        };
        fetchPapers();
    }, []);

    const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const title = prompt("Enter paper title:");
        if (!title) return;

        setUploading(true);
        try {
            // 1. Upload to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('papers') // Use 'papers' bucket
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // 2. Get URL
            const { data: { publicUrl } } = supabase.storage
                .from('papers')
                .getPublicUrl(fileName);

            // 3. Save to DB
            const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
            const newPaper = {
                title,
                url: publicUrl,
                type: 'PDF',
                size: fileSize,
                progress: 0
            };

            const { data, error: dbError } = await supabase
                .from('papers')
                .insert([newPaper])
                .select();

            if (dbError) throw dbError;

            if (data) {
                setPapers([data[0], ...papers]);
                alert('Paper uploaded successfully!');
            }
        } catch (error: any) {
            alert('Error uploading: ' + error.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (id: number, url: string) => {
        if (!confirm("Delete this paper?")) return;
        try {
            const fileName = url.split('/').pop();
            if (fileName) {
                await supabase.storage.from('papers').remove([fileName]);
            }
            await supabase.from('papers').delete().eq('id', id);
            setPapers(papers.filter(p => p.id !== id));
        } catch (error: any) {
            alert('Error deleting: ' + error.message);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Research Papers</h1>
                    <p className={styles.subtitle}>Curated scientific literature for deeper understanding.</p>
                </div>
                {user?.role === 'OWNER' && (
                    <>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="application/pdf"
                            onChange={handleFileSelect}
                        />
                        <button className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                            <Upload size={18} /> {uploading ? 'Uploading...' : 'Add Paper'}
                        </button>
                    </>
                )}
            </header>

            <div className={styles.list}>
                {papers.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <p style={{ fontSize: '1.2rem', color: 'hsl(var(--foreground))' }}>No papers uploaded yet.</p>
                    </div>
                ) : (
                    papers.map(paper => (
                        <div key={paper.id} className={styles.paperRow}>
                            <div className={styles.iconWrapper}>
                                <FileText size={24} />
                            </div>
                            <div className={styles.info}>
                                <h3>{paper.title}</h3>
                                <div className={styles.meta}>
                                    <span className={styles.type}>{paper.type} • {paper.size}</span>
                                    {paper.progress > 0 && <span className={styles.progress}>{paper.progress}% Read</span>}
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <a href={paper.url} target="_blank" rel="noopener noreferrer" className={styles.iconBtn} title="View"><Eye size={20} /></a>
                                <a href={paper.url} download className={styles.iconBtn} title="Download"><Download size={20} /></a>
                                {user?.role === 'OWNER' && (
                                    <button
                                        className={styles.iconBtn}
                                        title="Delete"
                                        onClick={() => handleDelete(paper.id, paper.url)}
                                        style={{ color: 'red' }}
                                    >
                                        <div style={{ transform: 'rotate(45deg)', display: 'inline-block' }}>+</div>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
