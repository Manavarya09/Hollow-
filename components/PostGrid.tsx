import React from 'react';
import { Post } from '../types';
import { PostCard } from './PostCard';

interface PostGridProps {
  posts: Post[];
  onPostSelect: (post: Post) => void;
}

export const PostGrid: React.FC<PostGridProps> = ({ posts, onPostSelect }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onClick={() => onPostSelect(post)} />
        ))}
      </div>
    </div>
  );
};
