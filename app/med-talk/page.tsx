'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { PlayCircle, Upload, CheckCircle } from 'lucide-react';
import styles from './medtalk.module.css';

// Mock Videos (Empty initially)
const INITIAL_VIDEOS: any[] = [];

export default function MedTalkPage() {
    const { user } = useAuth();
    const [videos, setVideos] = useState(INITIAL_VIDEOS);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch videos on load
    useEffect(() => {
        const fetchVideos = async () => {
            const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
            if (data) setVideos(data);
        };
        fetchVideos();
    }, []);

    const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const title = prompt("Enter video title:");
        if (!title) return;

        setUploading(true);
        try {
            // 1. Upload file to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('videos')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('videos')
                .getPublicUrl(fileName);

            // 3. Save metadata to Database
            const newVideo = {
                title,
                url: publicUrl,
                duration: '10:00', // Placeholder, would need metadata extraction
                progress: 0,
                thumbnail: '#4A90E2' // Placeholder color
            };

            const { data, error: dbError } = await supabase
                .from('videos')
                .insert([newVideo])
                .select();

            if (dbError) throw dbError;

            if (data) {
                setVideos([data[0], ...videos]);
                alert('Video uploaded successfully!');
            }
        } catch (error: any) {
            alert('Error uploading: ' + error.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (id: number, url: string) => {
        if (!confirm("Are you sure you want to delete this video?")) return;

        try {
            // Extract filename from URL for storage deletion
            const fileName = url.split('/').pop();
            if (fileName) {
                await supabase.storage.from('videos').remove([fileName]);
            }

            const { error } = await supabase.from('videos').delete().eq('id', id);
            if (error) throw error;

            setVideos(videos.filter(v => v.id !== id));
        } catch (error: any) {
            alert('Error deleting: ' + error.message);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>MedTalks</h1>
                    <p className={styles.subtitle}>Evidence-based medical discussions for everyone.</p>
                </div>
                {user?.role === 'OWNER' && (
                    <>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="video/*"
                            onChange={handleFileSelect}
                        />
                        <button className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                            <Upload size={20} />
                            {uploading ? 'Uploading...' : 'Upload Video'}
                        </button>
                    </>
                )}
            </header>

            <div className={styles.grid}>
                {videos.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#666' }}>
                        <p style={{ fontSize: '1.2rem', color: 'hsl(var(--foreground))' }}>No videos found. Check back later!</p>
                    </div>
                ) : (
                    videos.map(video => (
                        <div key={video.id} className={styles.card}>
                            <div className={styles.thumbnail} style={{ backgroundColor: video.thumbnail }}>
                                <PlayCircle size={48} className={styles.playIcon} />
                                <span className={styles.duration}>{video.duration || '0:00'}</span>
                            </div>
                            <div className={styles.cardContent}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <h3>{video.title}</h3>
                                    {user?.role === 'OWNER' && (
                                        <button
                                            onClick={() => handleDelete(video.id, video.url)}
                                            style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                                <div className={styles.progressContainer}>
                                    <div className={styles.progressBar}>
                                        <div className={styles.progressFill} style={{ width: `${video.progress}%` }}></div>
                                    </div>
                                    <span className={styles.progressLabel}>{video.progress}% watched</span>
                                </div>
                                <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '10px', fontSize: '0.9rem', color: 'var(--primary)', textDecoration: 'none' }}>
                                    Watch Video
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
