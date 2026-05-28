import React, { useState } from 'react';
import styles from './Home.module.css';
import Post from '../../components/Post/Post';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';

export default function Home({ posts, setPosts, addActivity, activities }) {
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('General');
  const [filterTab, setFilterTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: { name: 'You (Admin)' },
      content: newPostContent,
      likes: 0,
      comments: 0,
      category: newPostCategory,
      time: 'Just now'
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    if (addActivity) addActivity(`Created new post in "${newPostCategory}"`, 'green');
  };

  const handleLikePost = (postId, liked) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: liked ? p.likes + 1 : p.likes - 1, isLiked: liked };
      }
      return p;
    }));

    const post = posts.find(p => p.id === postId);
    if (post && addActivity) {
      if (liked) {
        addActivity(`Liked post by ${post.author.name}`, 'red');
      } else {
        addActivity(`Unliked post by ${post.author.name}`, 'blue');
      }
    }
  };

  const handleDeletePost = (postId) => {
    const postToDelete = posts.find(p => p.id === postId);
    setPosts(prev => prev.filter(p => p.id !== postId));
    if (postToDelete && addActivity) {
      addActivity(`Deleted post: "${postToDelete.content.substring(0, 20)}..."`, 'purple');
    }
  };

  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filterTab === 'All' || post.category === filterTab;
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.container}>
      {/* Top Welcome Section */}
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeInfo}>
          <h2>Feed Overview</h2>
          <p>Explore recent postings, publish status reports, and filter channel reactions.</p>
        </div>
        <div className={styles.searchBar}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input 
            type="text" 
            placeholder="Search posts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Metrics Section */}
      <section className={styles.metricsGrid}>
        <Card className={`${styles.metricCard} ${styles.followers}`} hoverable={true}>
          <div className={styles.metricHeader}>
            <span>Total Followers</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
          <div className={styles.metricValueContainer}>
            <span className={styles.metricValue}>24,812</span>
            <span className={`${styles.metricTrend} ${styles.up}`}>+12.4%</span>
          </div>
          <div className={styles.chartMock}>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '35%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '45%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '60%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '80%' }}></div>
          </div>
        </Card>

        <Card className={`${styles.metricCard} ${styles.reactions}`} hoverable={true}>
          <div className={styles.metricHeader}>
            <span>Reactions</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div className={styles.metricValueContainer}>
            <span className={styles.metricValue}>{totalLikes * 100 + 450}</span>
            <span className={`${styles.metricTrend} ${styles.up}`}>+8.2%</span>
          </div>
          <div className={styles.chartMock}>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '20%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '55%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '70%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '90%' }}></div>
          </div>
        </Card>

        <Card className={`${styles.metricCard} ${styles.engagement}`} hoverable={true}>
          <div className={styles.metricHeader}>
            <span>Engagement Rate</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className={styles.metricValueContainer}>
            <span className={styles.metricValue}>5.82%</span>
            <span className={`${styles.metricTrend} ${styles.up}`}>+1.1%</span>
          </div>
          <div className={styles.chartMock}>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '65%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '70%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '85%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '75%' }}></div>
          </div>
        </Card>

        <Card className={`${styles.metricCard} ${styles.posts}`} hoverable={true}>
          <div className={styles.metricHeader}>
            <span>Active Posts</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <div className={styles.metricValueContainer}>
            <span className={styles.metricValue}>{posts.length}</span>
            <span className={`${styles.metricTrend} ${styles.stable}`}>Stable</span>
          </div>
          <div className={styles.chartMock}>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '40%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '40%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '50%' }}></div>
            <div className={`${styles.chartBar} ${styles.filled}`} style={{ height: '60%' }}></div>
          </div>
        </Card>
      </section>

      {/* Main split grid layout */}
      <div className={styles.splitGrid}>
        {/* Left Side: Post Creator & Post Lists */}
        <div className={styles.feedColumn}>
          <Card className={styles.creatorCard} hoverable={false}>
            <form onSubmit={handleCreatePost}>
              <div className={styles.creatorHeader}>
                <div className={styles.creatorAvatar}>YA</div>
                <textarea
                  className={styles.creatorInput}
                  placeholder="What would you like to share today, Admin?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
              <div className={styles.creatorActions}>
                <select
                  className={styles.categorySelect}
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="Tech">Tech</option>
                  <option value="Design">Design</option>
                </select>
                <Button type="submit" variant="primary">Share Post</Button>
              </div>
            </form>
          </Card>

          <div className={styles.feedHeader}>
            <h3>Feed Posts</h3>
            <div className={styles.tabs}>
              {['All', 'General', 'Tech', 'Design'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilterTab(cat)}
                  className={`${styles.tabBtn} ${filterTab === cat ? styles.activeTab : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.postsList}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <Post 
                  key={post.id}
                  post={post}
                  onLike={handleLikePost}
                  onDelete={handleDeletePost}
                />
              ))
            ) : (
              <div className={styles.emptyFeed}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <p>No posts match your filters. Create a new post to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Analytics breakdown and Live Logs */}
        <div className={styles.analyticsColumn}>
          <Card className={styles.widgetCard} hoverable={false}>
            <h3 className={styles.widgetTitle}>Platform Share</h3>
            <div className={styles.platforms}>
              <div className={styles.platformRow}>
                <div className={styles.platformMeta}>
                  <span>Twitter / X</span>
                  <span>45%</span>
                </div>
                <div className={styles.track}>
                  <div className={`${styles.fill} ${styles.twitter}`} style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className={styles.platformRow}>
                <div className={styles.platformMeta}>
                  <span>Instagram</span>
                  <span>30%</span>
                </div>
                <div className={styles.track}>
                  <div className={`${styles.fill} ${styles.instagram}`} style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className={styles.platformRow}>
                <div className={styles.platformMeta}>
                  <span>Facebook</span>
                  <span>15%</span>
                </div>
                <div className={styles.track}>
                  <div className={`${styles.fill} ${styles.facebook}`} style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className={styles.widgetCard} hoverable={false}>
            <h3 className={styles.widgetTitle}>Live Logs</h3>
            <div className={styles.activities}>
              {activities.slice(0, 4).map(act => (
                <div key={act.id} className={styles.activityItem}>
                  <span className={`${styles.indicator} ${styles[act.type]}`}></span>
                  <div className={styles.activityDetails}>
                    <span className={styles.activityText}>{act.text}</span>
                    <span className={styles.activityTime}>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
