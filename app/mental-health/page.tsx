'use client';

import HealthSection from '@/components/Health/HealthSection';

const FACTS = [
    "Mental health is just as important as physical health.",
    "Mindfulness meditation can reduce symptoms of anxiety and depression.",
    "Social connection is a powerful buffer against mental health struggles.",
    "It's okay to ask for help. Seeking support is a sign of strength."
];

const TOPICS = [
    {
        title: "Understanding Anxiety",
        content: "Anxiety is more than just feeling stressed or worried. It is a natural response to stress, but when it becomes constant or overwhelming, it can interfere with daily life. Techniques like deep breathing (4-7-8 method), grounding exercises, and talking to a trusted adult can help manage these feelings."
    },
    {
        title: "Depression Awareness",
        content: "Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. It affects how you feel, think, and handle daily activities. It is NOT a sign of weakness. Early support and conversation are vital steps toward healing. If you feel hopeless, please reach out to the helplines listed below."
    },
    {
        title: "Stress Management",
        content: "School and social pressures can be overwhelming. Learn to recognize your stress triggers. Break big tasks into smaller steps, take breaks, and practice 'Digital Detox'—time away from social media comparisons."
    },
    {
        title: "Mindfulness & Gratitude",
        content: "Mindfulness is about being present in the moment without judgment. Spending just 5 minutes a day focusing on your breath or writing down three things you are grateful for can significantly improve your mental resilience."
    }
];

export default function MentalHealthPage() {
    return (
        <HealthSection
            title="Mental Health"
            description="Your mind matters. Explore resources and understanding for a balanced mental state."
            colorTheme="purple"
            dailyFacts={FACTS}
            topics={TOPICS}
        />
    );
}
