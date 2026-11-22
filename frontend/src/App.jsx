import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./hooks/CustomLoginHook.jsx";

const App = () => {
  const { isUserLogin } = useAuth();

  if (!isUserLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App