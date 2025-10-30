import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PostForm } from './components/PostForm';
import { PostGrid } from './components/PostGrid';
import { PersonalDashboard } from './components/PersonalDashboard';
import { CollectiveReport } from './components/CollectiveReport';
import { PostModal } from './components/PostModal';
import { Post, View, Theme } from './types';
import { INITIAL_POSTS } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ThemeSwitcher } from './components/ThemeSwitcher';

function App() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [userPostIds, setUserPostIds] = useLocalStorage<string[]>('hollow-user-posts', []);
  const [currentView, setCurrentView] = useState<View>('grid');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [theme, setTheme] = useLocalStorage<Theme>('hollow-theme', 'paper');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const addPost = (text: string) => {
    const newPost: Post = {
      id: new Date().toISOString(),
      text,
      createdAt: new Date().toISOString(),
      sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as 'positive' | 'negative' | 'neutral',
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setUserPostIds(prevIds => [newPost.id, ...prevIds]);
    setCurrentView('grid'); // Switch to grid view after posting
  };

  const userPosts = posts.filter(post => userPostIds.includes(post.id));

  const renderView = () => {
    switch (currentView) {
      case 'grid':
        return (
          <>
            <PostForm addPost={addPost} />
            <PostGrid posts={posts} onPostSelect={setSelectedPost} />
          </>
        );
      case 'dashboard':
        return <PersonalDashboard userPosts={userPosts} onPostSelect={setSelectedPost} />;
      case 'report':
        return <CollectiveReport posts={posts} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] transition-colors duration-300">
      <Header 
        currentView={currentView} 
        setView={setCurrentView} 
        theme={theme} 
        setTheme={setTheme} 
      />
      <main>
        {renderView()}
      </main>
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}

export default App;
