'use client';

import { useState } from 'react';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import styles from './bot.module.css';

interface Message {
    role: 'user' | 'ai';
    text: string;
}

export default function AIBotPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', text: 'Hello! I am HealthBridge AI. Ask me about basic health habits, nutrition, or mindfulness.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Mock AI Response Logic
        setTimeout(() => {
            let response = "I can only answer questions related to health and wellbeing.";
            const lower = userMsg.toLowerCase();

            if (lower.includes('exercise') || lower.includes('workout')) {
                response = "Regular exercise improves heart health and mood. Try mixing cardio (like running) with strength training.";
            } else if (lower.includes('water') || lower.includes('hydration')) {
                response = "Staying hydrated is crucial! Aim for about 2 liters of water a day, but listen to your body.";
            } else if (lower.includes('sleep') || lower.includes('tired')) {
                response = "Getting 7-9 hours of sleep is vital for recovery. Try to maintain a consistent sleep schedule.";
            } else if (lower.includes('hello')) {
                response = "Hi there! How can I help you with your health journey today?";
            }

            setMessages(prev => [...prev, { role: 'ai', text: response }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatWindow}>
                <div className={styles.messages}>
                    {messages.map((m, i) => (
                        <div key={i} className={`${styles.message} ${m.role === 'ai' ? styles.ai : styles.user}`}>
                            <div className={styles.avatar}>
                                {m.role === 'ai' ? <Bot size={20} /> : <UserIcon size={20} />}
                            </div>
                            <div className={styles.bubble}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && <div className={styles.typing}>AI is thinking...</div>}
                </div>

                <div className={styles.inputArea}>
                    <input
                        type="text"
                        placeholder="Ask a health question..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend} disabled={!input.trim()}>
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
