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
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
          <span className="text-sm font-serif font-semibold text-slate-700 tracking-wide animate-pulse">Zeno</span>
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
