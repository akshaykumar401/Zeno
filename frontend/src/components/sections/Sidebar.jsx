import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/CustomLoginHook.jsx';
import {
  ZenoLogo,
  HomeFeedIcon,
  ExploreIcon,
  SearchIcon,
  BellIcon,
  MessageIcon,
  ProfileIcon,
  CreatePostIcon,
  PenSparkIcon,
  MoreIcon
} from '../ui/Icons.jsx';

const navItems = [
  { label: 'Home / Feed', path: '/', icon: HomeFeedIcon },
  { label: 'Explore', path: '/explore', icon: ExploreIcon },
  { label: 'Search', path: '/search', icon: SearchIcon },
  { label: 'Notifications', path: '/notifications', icon: BellIcon, badge: 3 },
  { label: 'Messages', path: '/messages', icon: MessageIcon },
  { label: 'Profile', path: '/profile', icon: ProfileIcon },
  { label: 'Create Post', path: '/create', icon: CreatePostIcon },
];

const Sidebar = ({ onCloseMobile }) => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const displayName = user?.fullName || user?.username || 'Zeno Creator';
  const displayHandle = user?.primaryEmailAddress?.emailAddress 
    ? `@${user.primaryEmailAddress.emailAddress.split('@')[0]}` 
    : '@zeno_live';

  return (
    <aside className="w-full h-full flex flex-col justify-between bg-[#0B0C10] px-4 py-5 select-none overflow-y-auto scrollbar-none">
      {/* Top Branding & Navigation */}
      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Branding (Clickable Home Link) */}
        <Link
          to="/"
          onClick={onCloseMobile}
          className="flex items-center gap-3 px-2 group cursor-pointer"
        >
          <ZenoLogo className="w-9 h-9 transition-transform group-hover:scale-105" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              Zeno
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isHome = item.path === '/';
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={isHome}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3.5 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-zinc-800/80 text-white shadow-xs border border-white/5'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3.5">
                  <Icon className="w-5 h-5 transition-transform duration-150 group-hover:scale-105" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Primary CTA Button (Links to /create) */}
        <Link
          to="/create"
          onClick={onCloseMobile}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-gradient-to-r from-[#7B61FF] via-[#8B72FF] to-[#9980FF] hover:from-[#7054F7] hover:to-[#8E73FA] text-white text-sm font-semibold tracking-wide shadow-lg shadow-indigo-600/25 active:scale-[0.98] transition cursor-pointer"
        >
          <PenSparkIcon className="w-4 h-4" />
          <span>New Post</span>
        </Link>
      </div>

      {/* Bottom User Card */}
      <div className="relative mt-6 pt-4 border-t border-white/5">
        {showUserMenu && (
          <div className="absolute bottom-16 left-0 right-0 p-2 rounded-xl bg-zinc-900 border border-white/10 shadow-2xl z-50 flex flex-col gap-1 backdrop-blur-md">
            <Link
              to="/profile"
              onClick={() => {
                setShowUserMenu(false);
                if (onCloseMobile) onCloseMobile();
              }}
              className="px-3 py-2 border-b border-white/5 hover:bg-white/5 rounded-lg transition"
            >
              <p className="text-xs font-semibold text-white truncate">{displayName}</p>
              <p className="text-[11px] text-zinc-400 truncate">{displayHandle}</p>
            </Link>
            <button
              onClick={() => {
                setShowUserMenu(false);
                if (onCloseMobile) onCloseMobile();
                signOut();
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-lg transition cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        )}

        <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/40 hover:bg-zinc-800/60 border border-white/5 transition">
          {/* Profile link section */}
          <Link
            to="/profile"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
          >
            <div className="relative shrink-0">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={displayName}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/10">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0C10]" />
            </div>

            <div className="min-w-0 flex flex-col">
              <span className="text-xs font-medium text-white truncate leading-tight">
                {displayName}
              </span>
              <span className="text-[11px] text-zinc-500 truncate leading-tight">
                {displayHandle}
              </span>
            </div>
          </Link>

          {/* Context menu toggle button */}
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-white/5 transition cursor-pointer"
            aria-label="User options"
          >
            <MoreIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
