import styles from './page.module.css';
import Link from 'next/link';

// Mock data for daily refresh
const quotes = [
  "Health is a state of body. Wellness is a state of being.",
  "Take care of your body. It's the only place you have to live.",
  "To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear.",
  "A healthy outside starts from the inside."
];

const facts = [
  "Laughing 100 times is equivalent to 15 minutes of exercise on a stationary bicycle.",
  "Your hydration level can impact your brain function and energy levels significantly.",
  "Walking outside for just 20 minutes can lower cortisol levels.",
  "Blue light from screens can suppress melatonin and affect your sleep quality."
];

function getDailyContent(arr: string[]) {
  // Simple hash based on date to get a stable index for the day
  const date = new Date();
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return arr[dayOfYear % arr.length];
}

export default function Home() {
  const quote = getDailyContent(quotes);
  const fact = getDailyContent(facts);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Project <span className={styles.bridge}>HealthBridge</span>
        </h1>
        <p className={styles.mission}>
          Project HealthBridge is a student-led, non-profit, medical awareness initiative dedicated to improving health literacy and combating medical misinformation among teenagers. The project focuses on presenting evidence-based, age-appropriate medical information through MedTalks, myth-busting sessions, and interactive discussions that empower students to understand their health and make informed decisions.
        </p>
        <p className={styles.missionSecondary}>
          By bridging the gap between reliable medical knowledge and everyday understanding, Project HealthBridge aims to encourage early prevention, responsible health behaviors, and timely medical care, while maintaining strict ethical standards and avoiding medical advice or diagnosis.
        </p>
        <Link href="/scheduler" className={styles.ctaButton}>
          Start Your Journey
        </Link>
      </section>

      {/* Daily Content Grid */}
      <section className={styles.dailyGrid}>
        <div className={`${styles.card} ${styles.quoteCard}`}>
          <h3>Daily Quote</h3>
          <p>"{quote}"</p>
        </div>
        <div className={`${styles.card} ${styles.factCard}`}>
          <h3>Did You Know?</h3>
          <p>{fact}</p>
        </div>
      </section>
    </div>
  );
}
