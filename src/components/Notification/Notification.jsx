import React from 'react';
import styles from './Notification.module.css';
import Card from '../common/Card/Card';

export default function Notification({ notification, onRead }) {
  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return (
          <svg className={`${styles.icon} ${styles.like}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        );
      case 'comment':
        return (
          <svg className={`${styles.icon} ${styles.comment}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case 'mention':
        return (
          <svg className={`${styles.icon} ${styles.mention}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
          </svg>
        );
      case 'follow':
        return (
          <svg className={`${styles.icon} ${styles.follow}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`${styles.notificationCard} ${!notification.read ? styles.unread : ''}`} 
      onClick={() => onRead && onRead(notification.id)}
      hoverable={true}
    >
      <div className={styles.iconContainer}>
        {getIcon(notification.type)}
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          <span className={styles.user}>{notification.user}</span> {notification.text}
        </p>
        <span className={styles.time}>{notification.time}</span>
      </div>
      {!notification.read && (
        <span className={styles.indicator} title="Unread notification"></span>
      )}
    </Card>
  );
}
