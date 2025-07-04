import React, { createContext, useReducer, useContext } from "react";

/**
 * UserContext: Handles signed-in user info, badge/achievement unlocks, and local settings.
 * Used for managing auth, user progress, unlocked badges, etc.
 */

const initialState = {
  user: null,
  badges: [],
  achievements: [],
  leaderboard: []
};

const UserContext = createContext(initialState);

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user };
    case "LOGOUT":
      return { ...state, user: null };
    case "UNLOCK_BADGE":
      return state.badges.includes(action.badge)
        ? state
        : { ...state, badges: [...state.badges, action.badge] };
    case "LOAD_LEADERBOARD":
      return { ...state, leaderboard: action.leaderboard };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function UserProvider({ children }) {
  /** Context provider for user/auth/badges info. */
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useUser() {
  /** Hook to consume user context. */
  return useContext(UserContext);
}
