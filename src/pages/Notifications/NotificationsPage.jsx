import React, { useState, useEffect } from 'react';
import styles from './NotificationsPage.module.css';
import Notification from '../../components/Notification/Notification';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import { fetchNotifications } from '../../utils/api';

export default function NotificationsPage({ addActivity, notificationsCount, setNotificationsCount }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications();
      setNotifications(data);
      const unreadCount = data.filter(n => !n.read).length;
      setNotificationsCount(unreadCount);
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = (id) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id && !n.read) {
        setNotificationsCount(c => Math.max(0, c - 1));
        return { ...n, read: true };
      }
      return n;
    }));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setNotificationsCount(0);
    if (addActivity) addActivity('Marked all notifications as read', 'blue');
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h2>Notifications Feed</h2>
          <p>Stay up to date with activity, mentions, and updates across your feeds.</p>
        </div>
        {notifications.some(n => !n.read) && (
          <Button variant="secondary" onClick={handleMarkAllRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className={styles.filterBar}>
        <div className={styles.tabs}>
          {['all', 'unread', 'read'].map(type => (
            <button
              key={type}
              className={`${styles.tabBtn} ${filter === type ? styles.activeTab : ''}`}
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <p>Fetching notifications from channels...</p>
        </div>
      ) : error ? (
        <Card className={styles.errorCard} hoverable={false}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" className={styles.errorIcon}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3>Oops! Data Retrieval Error</h3>
          <p>{error}</p>
          <Button variant="primary" onClick={loadNotifications}>Retry Connection</Button>
        </Card>
      ) : filteredNotifications.length > 0 ? (
        <div className={styles.list}>
          {filteredNotifications.map(notification => (
            <Notification
              key={notification.id}
              notification={notification}
              onRead={handleRead}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <p>No notifications found in this category.</p>
        </div>
      )}
    </div>
  );
}
