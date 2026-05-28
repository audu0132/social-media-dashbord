import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotificationsPage from './pages/Notifications/NotificationsPage';
import useLocalStorage from './hooks/useLocalStorage';
import './styles/variables.css';

const DEFAULT_PROFILE = {
  name: 'Audumbar',
  handle: 'audumbar_dev',
  bio: 'Frontend Architect & UI Designer. Building the future of clean web interfaces.',
  avatar: 'AD',
  followers: 24812,
  following: 892,
  reactions: 93700,
  postsCount: 3,
};

const DEFAULT_POSTS = [
  {
    id: 1,
    author: { name: 'Audumbar' },
    content: 'My first React post! Setting up this dashboard was super smooth with Vite. 🚀',
    likes: 12,
    comments: 4,
    category: 'General',
    time: '2 hours ago'
  },
  {
    id: 2,
    author: { name: 'Sarah Connor' },
    content: 'Deep diving into CSS container queries and HSL colors today. Web design is evolving so fast! 🎨✨',
    likes: 42,
    comments: 18,
    category: 'Design',
    time: '4 hours ago'
  },
  {
    id: 3,
    author: { name: 'Alex Rivera' },
    content: 'Just deployed our new React app to production. The performance gains from Vite compiler are mind-blowing! 💻⚡',
    likes: 29,
    comments: 7,
    category: 'Tech',
    time: '1 day ago'
  }
];

export default function App() {
  const [profile, setProfile] = useLocalStorage('profile', DEFAULT_PROFILE);
  const [posts, setPosts] = useLocalStorage('posts', DEFAULT_POSTS);
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [notificationsCount, setNotificationsCount] = useLocalStorage('notificationsCount', 2);
  const [activities, setActivities] = useLocalStorage('activities', [
    { id: 1, text: 'Dashboard setup completed', time: '10 mins ago', type: 'blue' },
    { id: 2, text: 'Connected to local server', time: '1 hour ago', type: 'green' }
  ]);

  // Set the theme attribute on root html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Add a new activity log
  const addActivity = (text, type = 'blue') => {
    const newAct = {
      id: Date.now(),
      text,
      time: 'Just now',
      type
    };
    setActivities(prev => [newAct, ...prev.slice(0, 4)]);
  };

  // Update profile posts count automatically based on current posts state
  useEffect(() => {
    const userPostsCount = posts.filter(
      p => p.author.name === 'You (Admin)' || p.author.name === profile.name
    ).length;
    if (profile.postsCount !== userPostsCount) {
      setProfile(prev => ({ ...prev, postsCount: userPostsCount }));
    }
  }, [posts, profile.name]);

  return (
    <Router>
      <div className="app-layout">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          notificationsCount={notificationsCount} 
        />
        <main className="app-main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  posts={posts} 
                  setPosts={setPosts} 
                  addActivity={addActivity} 
                  activities={activities} 
                />
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProfilePage 
                  profile={profile} 
                  setProfile={setProfile} 
                  posts={posts} 
                  setPosts={setPosts} 
                  addActivity={addActivity} 
                />
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <NotificationsPage 
                  addActivity={addActivity} 
                  notificationsCount={notificationsCount} 
                  setNotificationsCount={setNotificationsCount} 
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
