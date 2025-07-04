//
// Service for managing leaderboard via localStorage or Firebase backend
//

const LOCAL_LEADERBOARD_KEY = "frenzy_leaderboard";

// PUBLIC_INTERFACE
/**
 * Fetches the local leaderboard (and sorts by score).
 */
export function fetchLocalLeaderboard() {
  const raw = window.localStorage.getItem(LOCAL_LEADERBOARD_KEY);
  return raw
    ? JSON.parse(raw).sort((a, b) => b.score - a.score)
    : [];
}

// PUBLIC_INTERFACE
/**
 * Stores a new entry to the local leaderboard.
 * @param {Object} entry { name, score }
 */
export function addToLocalLeaderboard(entry) {
  let leaderboard = fetchLocalLeaderboard();
  leaderboard.push(entry);
  leaderboard.sort((a, b) => b.score - a.score);
  window.localStorage.setItem(LOCAL_LEADERBOARD_KEY, JSON.stringify(leaderboard));
}
