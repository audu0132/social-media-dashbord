import React from 'react';
import styles from './Profile.module.css';
import Card from '../common/Card/Card';

export default function Profile({ profile }) {
  if (!profile) return null;
  
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U';
  };

  return (
    <Card className={styles.profileCard} hoverable={false}>
      <div className={styles.banner}></div>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {getInitials(profile.name)}
        </div>
      </div>
      <div className={styles.body}>
        <h2 className={styles.name}>{profile.name}</h2>
        <span className={styles.handle}>@{profile.handle}</span>
        <p className={styles.bio}>{profile.bio || 'No bio written yet.'}</p>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{profile.followers ? profile.followers.toLocaleString() : 0}</span>
            <span className={styles.statLabel}>Followers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{profile.following ? profile.following.toLocaleString() : 0}</span>
            <span className={styles.statLabel}>Following</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{profile.postsCount || 0}</span>
            <span className={styles.statLabel}>Posts</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
