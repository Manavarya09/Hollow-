import React, { useMemo } from 'react';
import { Post } from '../types';
import { SentimentChart } from './SentimentChart';

interface PersonalDashboardProps {
  userPosts: Post[];
  onPostSelect: (post: Post) => void;
}

const sentimentToValue = (sentiment?: 'positive' | 'negative' | 'neutral'): number => {
    switch (sentiment) {
        case 'positive': return 1;
        case 'negative': return -1;
        case 'neutral':
        default: return 0;
    }
}

export const PersonalDashboard: React.FC<PersonalDashboardProps> = ({ userPosts, onPostSelect }) => {
  const chartData = useMemo(() => {
    if (userPosts.length < 2) return [];

    return [...userPosts]
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map(post => ({
            date: new Date(post.createdAt),
            value: sentimentToValue(post.sentiment)
        }));
  }, [userPosts]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif mb-2 text-[var(--color-text-primary)]">My Echoes</h2>
        <p className="text-[var(--color-text-secondary)] mb-8">A private reflection of the thoughts you've released.</p>
        
        {userPosts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[var(--color-border)]">
            <p className="text-[var(--color-text-secondary)]">You haven't released any thoughts yet.</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Your posts will appear here once you submit them.</p>
          </div>
        ) : (
          <div>
            <div className="mb-8 p-4 border border-[var(--color-border)]">
              <h3 className="font-semibold mb-4 text-[var(--color-text-primary)]">Sentiment Timeline</h3>
              {chartData.length > 0 ? (
                <SentimentChart data={chartData} />
              ) : (
                <p className="text-sm text-center text-[var(--color-text-secondary)] py-8">
                  You need at least two thoughts to see a timeline. Keep sharing.
                </p>
              )}
            </div>
            <div className="space-y-4">
              {[...userPosts].reverse().map(post => (
                <div key={post.id} onClick={() => onPostSelect(post)} className="p-4 border border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-background-hover)] transition-colors">
                  <p className="font-serif text-[var(--color-text-primary)]">{post.text}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-2 text-right">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};