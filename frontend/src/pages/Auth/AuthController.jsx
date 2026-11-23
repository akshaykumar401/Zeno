import { useAuth } from "../../hooks/CustomLoginHook.jsx";
import { Outlet, Navigate } from "react-router-dom";

const AuthController = () => {
  const { isUserLogin } = useAuth();

  if (isUserLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07080B] text-zinc-100 p-4 selection:bg-indigo-500/30">
      <div className="w-full max-w-md flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthController;
