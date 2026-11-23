import { createContext, useContext } from "react";
import { useAuth as useClerkAuth, useUser, useClerk } from "@clerk/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { isSignedIn, isLoaded, userId, sessionId, getToken } = useClerkAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  const isUserLogin = Boolean(isSignedIn);
  const isLoading = !isLoaded;

  // Getting if user is logged in or not
  const getIsUserLogin = () => {
    return isUserLogin;
  };

  // Function for Toggling user to change the user Login -> Logout state
  const toggleLoginUser = async () => {
    if (isSignedIn) {
      await signOut();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#07080B] text-zinc-100 selection:bg-indigo-500/30">
        <div className="relative flex flex-col items-center gap-6">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -inset-6 bg-indigo-500/15 blur-3xl rounded-full pointer-events-none" />

          {/* Spinner with Central Branded Emblem */}
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 border-r-purple-500 animate-spin" />
            <div className="w-11 h-11 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 flex items-center justify-center ring-1 ring-white/10">
              <img src="/zeno-logo.png" alt="Zeno" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Brand Name & Animated Status */}
          <div className="flex flex-col items-center gap-1.5 z-10">
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              Zeno
            </span>
            <span className="text-xs text-zinc-500 font-medium tracking-wide animate-pulse">
              Connecting to workspace...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isUserLogin,
        isLoading,
        isSignedIn: isUserLogin,
        user,
        userId,
        sessionId,
        getToken,
        signOut,
        getIsUserLogin,
        toggleLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export {
  AuthProvider,
  useAuth,
};
