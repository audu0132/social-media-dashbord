import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Post from '../src/components/Post/Post';

describe('Post Component', () => {
  const samplePost = {
    id: 1,
    author: { name: 'Sarah Connor' },
    content: 'Testing component render capabilities.',
    likes: 10,
    comments: 2,
    category: 'Design',
  };

  it('renders author name and content correctly', () => {
    render(<Post post={samplePost} />);
    
    expect(screen.getByText('Sarah Connor')).toBeInTheDocument();
    expect(screen.getByText('Testing component render capabilities.')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('updates like state when clicked', () => {
    const handleLikeMock = vi.fn();
    render(<Post post={samplePost} onLike={handleLikeMock} />);
    
    const likeButton = screen.getByRole('button', { name: /like-button/i });
    expect(screen.getByText('10')).toBeInTheDocument();
    
    // Click like
    fireEvent.click(likeButton);
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(handleLikeMock).toHaveBeenCalledWith(1, true);

    // Click again to unlike
    fireEvent.click(likeButton);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(handleLikeMock).toHaveBeenCalledWith(1, false);
  });
});
