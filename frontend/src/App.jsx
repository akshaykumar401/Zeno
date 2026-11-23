import { useState } from 'react';
import { Outlet, Navigate, NavLink, Link } from 'react-router-dom';
import { useAuth } from './hooks/CustomLoginHook.jsx';
import { Header, Sidebar, Footer } from './components/sections/index.js';
import {
  CloseIcon,
  HomeFeedIcon,
  ExploreIcon,
  BellIcon,
  MessageIcon,
  PenSparkIcon
} from './components/ui/Icons.jsx';

const App = () => {
  const { isUserLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isUserLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#07080B] text-zinc-100 flex antialiased selection:bg-indigo-500/30 w-full max-w-full">
      {/* Desktop Fixed Sidebar (Permanently pinned to viewport - never scrolls with page) */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 h-screen z-30 flex-col justify-between bg-[#0B0C10] border-r border-white/5">
        <Sidebar />
      </aside>

      {/* Mobile Drawer (Backdrop + Slide-out Sidebar) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 flex flex-col bg-[#0B0C10] shadow-2xl">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg z-20 cursor-pointer"
              aria-label="Close menu"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Column (Offset by md:pl-64 to accommodate the fixed sidebar) */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen md:pl-64 w-full">
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl w-full mx-auto pb-28 md:pb-8 min-w-0">
          <Outlet />
        </main>

        {/* Global Responsive Footer */}
        <div className="pb-16 md:pb-0 w-full">
          <Footer />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Visible only on small screens) */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0B0C10]/95 backdrop-blur-xl border-t border-white/5 px-4 py-2 flex items-center justify-around shadow-2xl"
        style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))' }}
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `p-2.5 rounded-xl transition ${isActive ? 'text-indigo-400 bg-white/5' : 'text-zinc-400 hover:text-zinc-200'}`
          }
          aria-label="Home"
        >
          <HomeFeedIcon className="w-5 h-5" />
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `p-2.5 rounded-xl transition ${isActive ? 'text-indigo-400 bg-white/5' : 'text-zinc-400 hover:text-zinc-200'}`
          }
          aria-label="Explore"
        >
          <ExploreIcon className="w-5 h-5" />
        </NavLink>

        {/* Quick Post Center Button (Links to /create) */}
        <Link
          to="/create"
          className="p-3 -mt-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 active:scale-95 transition cursor-pointer"
          aria-label="New Post"
        >
          <PenSparkIcon className="w-5 h-5" />
        </Link>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `relative p-2.5 rounded-xl transition ${isActive ? 'text-indigo-400 bg-white/5' : 'text-zinc-400 hover:text-zinc-200'}`
          }
          aria-label="Notifications"
        >
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500" />
        </NavLink>

        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `p-2.5 rounded-xl transition ${isActive ? 'text-indigo-400 bg-white/5' : 'text-zinc-400 hover:text-zinc-200'}`
          }
          aria-label="Messages"
        >
          <MessageIcon className="w-5 h-5" />
        </NavLink>
      </nav>
    </div>
  );
};

export default App;
