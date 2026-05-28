// Simulated endpoints for Dashboard
const MOCK_PROFILE = {
  name: 'Audumbar',
  handle: 'audumbar_dev',
  bio: 'Frontend Architect & UI Designer. Building the future of clean web interfaces.',
  avatar: 'AD',
  followers: 24812,
  following: 892,
  reactions: 93700,
  postsCount: 3,
};

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'like', user: 'Sarah Connor', text: 'liked your post in Design', time: '10 mins ago', read: false },
  { id: 2, type: 'comment', user: 'Alex Rivera', text: 'commented: "Incredible speed boosts!" on your Tech post', time: '2 hours ago', read: false },
  { id: 3, type: 'mention', user: 'Audumbar', text: 'mentioned you in a post: "@social_admin check this out!"', time: '5 hours ago', read: true },
  { id: 4, type: 'follow', user: 'Emma Watson', text: 'started following you', time: '1 day ago', read: true },
];

/**
 * Simulates fetching the active user profile details
 */
export async function fetchProfile() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 5% random failure rate to test React error handling UI states
      if (Math.random() < 0.05) {
        reject(new Error('Failed to retrieve user profile data. Please refresh.'));
      } else {
        resolve({ ...MOCK_PROFILE });
      }
    }, 800);
  });
}

/**
 * Simulates fetching notifications history
 */
export async function fetchNotifications() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.05) {
        reject(new Error('Failed to load notifications history.'));
      } else {
        resolve([...MOCK_NOTIFICATIONS]);
      }
    }, 600);
  });
}

/**
 * Simulates updating profile information on the server
 */
export async function updateProfile(updatedData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!updatedData.name) {
        reject(new Error('Name cannot be empty.'));
      } else {
        resolve({ ...MOCK_PROFILE, ...updatedData });
      }
    }, 500);
  });
}
