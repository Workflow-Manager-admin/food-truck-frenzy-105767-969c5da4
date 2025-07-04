import React from "react";
import { signInWithGoogle, signOutUser } from "../services/firebase";
import { useUser } from "../context/UserContext";
import { COLORS } from "../constants/gameConstants";

// PUBLIC_INTERFACE
/**
 * AuthBar: Small bar showing sign in/out and user display (uses Google Firebase Auth)
 */
function AuthBar() {
  const { state, dispatch } = useUser();

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      dispatch({ type: "LOGIN", user: result.user });
    } catch (err) {
      // Simple error alert for demo
      alert("Login failed");
    }
  };

  const handleLogout = async () => {
    await signOutUser();
    dispatch({ type: "LOGOUT" });
  };

  if (state.user) {
    return (
      <div style={{
        position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)",
        zIndex: 18, background: COLORS.primary, color: COLORS.secondary,
        padding: "8px 18px", borderRadius: 24, fontWeight: 900,
        boxShadow: "0 2px 8px #fd818855"
      }}>
        <span>
          <img src={state.user.photoURL} alt="avatar" style={{
            width: 30, height: 30, borderRadius: "50%", marginRight: 12, verticalAlign: "middle"
          }}/>
          Welcome, {state.user.displayName || state.user.email}
        </span>
        <button onClick={handleLogout} style={{
          background: COLORS.accent, color: COLORS.secondary,
          border: "none", borderRadius: 11, marginLeft: 15, fontWeight: 700,
          padding: "3px 10px", cursor: "pointer"
        }}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)",
      zIndex: 18, background: COLORS.primary, color: COLORS.secondary,
      padding: "8px 18px", borderRadius: 24, fontWeight: 900,
      boxShadow: "0 2px 8px #fd818855"
    }}>
      <button onClick={handleLogin} style={{
        background: COLORS.accent, color: COLORS.secondary,
        border: "none", borderRadius: 11, fontWeight: 700,
        padding: "3px 10px", cursor: "pointer"
      }}>
        Sign in with Google
      </button>
    </div>
  );
}

export default AuthBar;
