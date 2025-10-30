import React, { useState } from 'react';
import { POST_MAX_LENGTH } from '../constants';

interface PostFormProps {
  addPost: (text: string) => void;
}

export const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const remainingChars = POST_MAX_LENGTH - text.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addPost(text.trim());
      setText('');
    }
  };

  return (
    <div className="py-8 md:py-12 bg-[var(--color-background)] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className={`relative border transition-colors duration-300 ${isFocused ? 'border-[var(--color-text-primary)]' : 'border-[var(--color-border)]'}`}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              maxLength={POST_MAX_LENGTH}
              placeholder="What's on your mind?"
              className="w-full h-24 p-4 text-lg bg-transparent focus:outline-none resize-none placeholder-[var(--color-text-secondary)] font-serif"
            />
            <div className="absolute bottom-2 right-3 text-xs text-[var(--color-text-secondary)]">
              {remainingChars}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={!text.trim()}
              className="px-6 py-2 border border-[var(--color-text-primary)] text-[var(--color-text-primary)] text-sm font-semibold hover:bg-[var(--color-accent-bg)] hover:text-[var(--color-accent-text)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[var(--color-text-primary)] transition-colors duration-300"
            >
              Release into the Void
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
