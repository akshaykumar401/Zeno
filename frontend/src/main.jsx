import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./hooks/CustomLoginHook.jsx";
import {
  AuthController,
  Home,
  Login,
  SignUp,
  Explore,
  Search,
  Notification,
  Message,
  Profile,
  CreatePost
} from "./pages/index.js"
import { ClerkProvider } from '@clerk/react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key: please define VITE_CLERK_PUBLISHABLE_KEY in your .env file")
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/notifications",
        element: <Notification />,
      },
      {
        path: "/messages",
        element: <Message />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/create",
        element: <CreatePost />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthController />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/login/*",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signup/*",
        element: <SignUp />,
      },
    ],
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/login">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
)
