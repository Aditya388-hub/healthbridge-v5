'use client';

import HealthSection from '@/components/Health/HealthSection';

const FACTS = [
    "Dietary fiber helps lower cholesterol and control blood sugar levels.",
    "Regular physical activity can improve muscle strength and boost endurance.",
    "Eating a variety of fruits and vegetables provides essential vitamins and minerals.",
    "Sleep is essential for muscle recovery and overall physical health."
];

const TOPICS = [
    {
        title: "Healthy Eating",
        content: "A balanced diet supplying the nutrients your body needs to work effectively. Without good nutrition, your body is more prone to disease, infection, fatigue, and poor performance. Focus on whole grains, lean proteins (chicken, fish, tofu), and plenty of vegetables. Reduce intake of processed sugars and saturated fats. Remember, food is fuel!"
    },
    {
        title: "Exercise & Fitness",
        content: "Physical activity that boosts your heart rate and strengthens muscles is crucial. Aim for at least 30 minutes of moderate exercise daily. Options include running, swimming, cycling, or even brisk walking. Consistency is key—find an activity you enjoy so it becomes a habit, not a chore."
    },
    {
        title: "Sleep Hygiene",
        content: "Sleep is when your body repairs itself. Teenagers typically need 8-10 hours of sleep per night. Poor sleep links to concentration issues and mood swings. Try to maintain a regular sleep schedule, avoid screens 1 hour before bed, and keep your room cool and dark."
    },
    {
        title: "Hydration",
        content: "Water is essential for every cell in your body. Dehydration can lead to headaches and low energy. carry a water bottle and aim for 6-8 glasses a day, more if you are exercising."
    }
];

export default function PhysicalHealthPage() {
    return (
        <HealthSection
            title="Physical Health"
            description="Nurture your body through nutrition and movement. Your physical state is the foundation of your life's journey."
            colorTheme="green"
            dailyFacts={FACTS}
            topics={TOPICS}
        />
    );
}
