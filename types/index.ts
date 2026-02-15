export type Role = 'GUEST' | 'OWNER';

export interface User {
    username: string;
    email: string; // Added email for auth
    role: Role;
    dob?: string;
    height?: number; // cm
    weight?: number; // kg
    habits?: string[];
    exp: number;
}

export type RoutineType = 'PHYSICAL' | 'MENTAL';

export interface Routine {
    id: string;
    title: string;
    description: string;
    type: RoutineType;
    time?: string; // HH:MM
    completed: boolean;
    days: string[]; // ['Mon', 'Tue'...]
}

export interface ContentItem {
    id: string;
    title: string;
    url: string; // Video URL or Doc URL
    thumbnail?: string;
    category: string;
    uploadedBy: string; // owner
    completeness: number; // 0-100 percentage
}
