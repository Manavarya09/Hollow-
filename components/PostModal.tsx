import React, { useState, useEffect, useCallback } from 'react';
import { Post } from '../types';

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
}

export const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Wait for the animation to finish before calling the parent's onClose
    setTimeout(() => {
      onClose();
      setIsClosing(false); // Reset state for the next time it opens
    }, 200); // This duration should match the animation-duration
  }, [onClose]);

  useEffect(() => {
    if (post) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [post, handleClose]);

  if (!post) {
    return null;
  }
  
  const formattedDate = new Date(post.createdAt).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-accent-bg)]/80 backdrop-blur-sm ${isClosing ? 'animate-backdrop-out' : 'animate-backdrop-in'}`}
      onClick={handleClose}
    >
      <div
        className={`bg-[var(--color-background)] p-6 md:p-8 max-w-2xl w-full mx-4 border border-[var(--color-border)] ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg md:text-xl font-serif text-[var(--color-text-primary)] mb-6 leading-relaxed">{post.text}</p>
        <p className="text-sm text-[var(--color-text-secondary)] text-right">{formattedDate}</p>
      </div>
      <style>{`
        @keyframes backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes backdrop-out { from { opacity: 1; } to { opacity: 0; } }
        .animate-backdrop-in { animation: backdrop-in 0.2s ease-out forwards; }
        .animate-backdrop-out { animation: backdrop-out 0.2s ease-in forwards; }

        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-out {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        .animate-fade-out { animation: fade-out 0.2s ease-in forwards; }
      `}</style>
    </div>
  );
};
