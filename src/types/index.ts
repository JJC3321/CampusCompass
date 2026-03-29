export type Category = 'scholarships' | 'mental-health' | 'learning';

export interface UserProfile {
  readonly fullName: string;
  readonly school: string;
  readonly gender: string;
  readonly raceEthnicity: string;
}

export interface SchoolInfo {
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
}

export interface Resource {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly category: Category;
  readonly lat: number;
  readonly lng: number;
  readonly location: string;
  readonly date: string | null;
}

export interface ChatMessage {
  readonly role: 'user' | 'assistant';
  readonly content: string;
}

export interface SearchRequest {
  readonly school: string;
  readonly gender: string;
  readonly raceEthnicity: string;
  readonly query?: string;
}

export interface ChatRequest {
  readonly message: string;
  readonly history: readonly ChatMessage[];
  readonly userProfile: UserProfile;
}

export const CATEGORY_COLORS: Record<Category, string> = {
  scholarships: '#2563EB',
  'mental-health': '#16A34A',
  learning: '#9333EA',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  scholarships: 'Scholarships & Financial Aid',
  'mental-health': 'Mental Health & Wellness',
  learning: 'Learning Programs',
};
