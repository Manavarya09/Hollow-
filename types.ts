export interface Post {
  id: string;
  text: string;
  createdAt: string;
  clusterId?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface Cluster {
  id: string;
  label: string;
  postCount: number;
}

export interface Report {
  topThemes: { theme: string; snippet: string }[];
  sentimentSummary: { sentiment: string; percentage: number }[];
  generatedText: string;
  date: string;
}

export type View = 'grid' | 'dashboard' | 'report';

export type Theme = 'paper' | 'dark' | 'sepia';
