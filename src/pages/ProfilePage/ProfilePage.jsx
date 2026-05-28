import React, { useState } from 'react';
import styles from './ProfilePage.module.css';
import Profile from '../../components/Profile/Profile';
import Post from '../../components/Post/Post';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';

export default function ProfilePage({ profile, setProfile, posts, setPosts, addActivity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    handle: profile.handle,
    bio: profile.bio
  });

  // Filter posts created by this admin
  const userPosts = posts.filter(p => p.author.name === 'You (Admin)' || p.author.name === profile.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.handle.trim()) return;

    setProfile(prev => ({
      ...prev,
      ...formData
    }));
    setIsEditing(false);
    if (addActivity) addActivity('Updated your profile information', 'purple');
  };

  const handleLikePost = (postId, liked) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: liked ? p.likes + 1 : p.likes - 1, isLiked: liked };
      }
      return p;
    }));
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    if (addActivity) addActivity('Deleted a post from your profile feed', 'red');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h2>User Profile</h2>
          <p>Manage your channels metadata, user summary, and personal feeds.</p>
        </div>
        <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </Button>
      </div>

      <div className={styles.grid}>
        {/* Left column: Profile view OR edit form */}
        <div className={styles.profileColumn}>
          {isEditing ? (
            <Card className={styles.editCard} hoverable={false}>
              <h3>Edit Profile Details</h3>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Display Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="handle">Handle</label>
                  <input
                    type="text"
                    id="handle"
                    value={formData.handle}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
                <Button type="submit" variant="primary">Save Changes</Button>
              </form>
            </Card>
          ) : (
            <Profile profile={profile} />
          )}
        </div>

        {/* Right column: User Posts lists */}
        <div className={styles.postsColumn}>
          <h3 className={styles.sectionTitle}>Your Posts ({userPosts.length})</h3>
          
          <div className={styles.postsList}>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <Post
                  key={post.id}
                  post={post}
                  onLike={handleLikePost}
                  onDelete={handleDeletePost}
                />
              ))
            ) : (
              <div className={styles.empty}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <p>You haven't shared any posts yet. Go to Feed to share your first update!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
