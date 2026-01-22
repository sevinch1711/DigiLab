
export enum Subject {
  BIOLOGY = 'Biology',
  CHEMISTRY = 'Chemistry',
  PHYSICS = 'Physics',
  INFORMATICS = 'Informatics',
  HOME = 'Home',
  LEADERBOARD = 'Leaderboard',
  ABOUT = 'About'
}

export type Language = 'uz' | 'en' | 'ru';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correct: number;
  level: number;
}

export type QuestionPool = Record<number, Question[]>;

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  subject: Subject;
}

export interface SubjectStats {
  masteryLevel: number;
  completedLabs: string[];
  weaknesses: string[];
}

export interface UserStats {
  points: number;
  level: number;
  badges: Badge[];
  completedLabs: string[];
  subjectAnalytics: Record<Subject, SubjectStats>;
  isRegistered: boolean;
  userName: string;
}
