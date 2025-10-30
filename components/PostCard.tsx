import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const formattedDate = new Date(post.createdAt).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <div
      onClick={onClick}
      className="p-4 bg-[var(--color-background)] border border-[var(--color-border)] cursor-pointer transition-shadow duration-300 hover:shadow-[0_4px_12px_0_var(--color-card-shadow)] break-inside-avoid mb-4"
    >
      <p className="text-base font-serif text-[var(--color-text-primary)] mb-3 leading-relaxed">
        {post.text.length > 150 ? `${post.text.substring(0, 150)}...` : post.text}
      </p>
      <p className="text-xs text-[var(--color-text-secondary)] text-right">{formattedDate}</p>
    </div>
  );
};
