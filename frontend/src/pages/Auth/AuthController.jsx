import { useAuth } from "../../hooks/CustomLoginHook.jsx";
import { Outlet, Navigate } from "react-router-dom";

const AuthController = () => {
  const { isUserLogin } = useAuth();

  return (
    <>{!isUserLogin ?
      <div>
        Login
      </div>
      :
      <Navigate to="/" replace />}
    </>
  )
}

export default AuthController