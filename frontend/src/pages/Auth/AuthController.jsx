import { useAuth } from "../../hooks/CustomLoginHook.jsx";
import { Outlet, Navigate } from "react-router-dom";

const AuthController = () => {
  const { isUserLogin } = useAuth();

  if (isUserLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Outlet />
    </div>
  );
};

export default AuthController;
