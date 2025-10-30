import { Post } from './types';

export const POST_MAX_LENGTH = 280;

export const INITIAL_POSTS: Post[] = [
  { id: '1', text: "Sometimes I wonder if we're all just collections of stories we tell ourselves.", createdAt: '2024-07-29T10:00:00Z', sentiment: 'neutral' },
  { id: '2', text: "The quiet hum of the city at 3 AM is a strange kind of peace.", createdAt: '2024-07-29T10:05:00Z', sentiment: 'positive' },
  { id: '3', text: "Feeling an overwhelming sense of dread about the future. It's hard to shake off.", createdAt: '2024-07-29T10:10:00Z', sentiment: 'negative' },
  { id: '4', text: "Just finished a book that completely changed my perspective. The world feels new.", createdAt: '2024-07-29T10:15:00Z', sentiment: 'positive' },
  { id: '5', text: "Why do we hold on to things that hurt us?", createdAt: '2024-07-29T10:20:00Z', sentiment: 'negative' },
  { id: '6', text: "The simple act of making a good cup of coffee can be a small victory.", createdAt: '2024-07-29T10:25:00Z', sentiment: 'positive' },
  { id: '7', text: "I miss the person I was before I knew too much.", createdAt: '2024-07-29T10:30:00Z', sentiment: 'negative' },
  { id: '8', text: "Is it burnout or am I just fundamentally lazy? The line feels blurry.", createdAt: '2024-07-29T10:35:00Z', sentiment: 'neutral' },
  { id: '9', text: "There's a quiet hope in planting a seed and watching it grow.", createdAt: '2024-07-29T10:40:00Z', sentiment: 'positive' },
  { id: '10', text: "The weight of unspoken words is heavier than any physical burden.", createdAt: '2024-07-29T10:45:00Z', sentiment: 'neutral' },
  { id: '11', text: "Sometimes I feel like an actor in my own life, just reading lines.", createdAt: '2024-07-29T10:50:00Z', sentiment: 'negative' },
  { id: '12', text: "A stranger smiled at me today and it genuinely made my day better.", createdAt: '2024-07-29T10:55:00Z', sentiment: 'positive' },
];
