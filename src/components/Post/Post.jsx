import React, { useState } from 'react';
import styles from './Post.module.css';
import Card from '../common/Card/Card';
import Button from '../common/Button/Button';
import Modal from '../common/Modal/Modal';

export default function Post({ post, onLike, onDelete }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [comments, setComments] = useState(post.commentsList || [
    { id: 1, author: 'Sarah Connor', text: 'Great dashboard setup!' },
    { id: 2, author: 'Alex Rivera', text: 'Stunning CSS aesthetics here.' }
  ]);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      if (onLike) onLike(post.id, false);
    } else {
      setLikes(likes + 1);
      if (onLike) onLike(post.id, true);
    }
    setIsLiked(!isLiked);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const commentObj = {
      id: Date.now(),
      author: 'You (Admin)',
      text: newComment
    };
    
    setComments([...comments, commentObj]);
    setNewComment('');
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U';
  };

  return (
    <>
      <Card className={styles.postCard} hoverable={true}>
        <div className={styles.postHeader}>
          <div className={styles.avatar}>
            {getInitials(post.author.name)}
          </div>
          <div className={styles.postMeta}>
            <h3 className={styles.authorName}>{post.author.name}</h3>
            <p className={styles.time}>{post.time || 'Just now'}</p>
          </div>
          {post.category && (
            <span className={styles.categoryBadge}>{post.category}</span>
          )}
          {onDelete && (
            <button 
              className={styles.deleteBtn} 
              onClick={() => onDelete(post.id)}
              title="Delete post"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          )}
        </div>

        <p className={styles.content}>{post.content}</p>

        {post.image && (
          <img src={post.image} alt="Post content" className={styles.postImage} />
        )}

        <div className={styles.postActions}>
          <button 
            onClick={handleLike} 
            className={`${styles.actionBtn} ${isLiked ? styles.liked : ''}`}
            aria-label="like-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span>{likes}</span>
          </button>

          <button 
            onClick={() => setIsCommentsOpen(true)} 
            className={styles.actionBtn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>{comments.length}</span>
          </button>

          <button className={styles.actionBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="22" x2="12" y2="12" />
            </svg>
          </button>
        </div>
      </Card>

      <Modal 
        isOpen={isCommentsOpen} 
        onClose={() => setIsCommentsOpen(false)} 
        title="Comments"
      >
        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentAvatar}>
                {getInitials(comment.author)}
              </div>
              <div className={styles.commentContent}>
                <span className={styles.commentAuthor}>{comment.author}</span>
                <p className={styles.commentText}>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddComment} className={styles.commentForm}>
          <input 
            type="text" 
            placeholder="Write a comment..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={styles.commentInput}
          />
          <Button type="submit" variant="primary">Send</Button>
        </form>
      </Modal>
    </>
  );
}
