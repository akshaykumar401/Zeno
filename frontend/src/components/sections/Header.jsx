import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserButton } from '@clerk/react';
import {
  SearchIcon,
  BellIcon,
  MessageIcon,
  MenuIcon,
  CloseIcon,
  ZenoLogo
} from '../ui/Icons.jsx';

const Header = ({ onOpenMobileMenu }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isMac] = useState(() => 
    typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent || navigator.platform || '')
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full h-14 sm:h-16 bg-[#0B0C10]/90 backdrop-blur-md border-b border-white/5 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 transition-all">
      {/* Mobile Search Overlay when opened */}
      {mobileSearchOpen ? (
        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2 sm:hidden animate-in fade-in duration-150">
          <div className="relative flex-1 flex items-center">
            <div className="absolute left-3 pointer-events-none text-zinc-500 flex items-center">
              <SearchIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Zeno, tags, creators..."
              className="w-full bg-zinc-900 text-sm text-zinc-100 placeholder-zinc-500 pl-9 pr-3 py-2 rounded-full border border-white/10 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <button
            type="button"
            onClick={() => setMobileSearchOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg cursor-pointer"
            aria-label="Close search"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </form>
      ) : (
        <>
          {/* Mobile Brand / Menu Toggle */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="p-1.5 -ml-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <ZenoLogo className="w-7 h-7" />
              <span className="text-base font-bold text-white tracking-tight">Zeno</span>
            </Link>
          </div>

          {/* Desktop/Tablet Center Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl mx-auto hidden sm:block">
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-zinc-500 flex items-center">
                <SearchIcon className="w-4 h-4" />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Zeno, tags, or creators..."
                className="w-full bg-zinc-900/90 text-sm text-zinc-200 placeholder-zinc-500 pl-10 pr-16 py-2 rounded-full border border-white/5 focus:outline-hidden focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition shadow-inner"
              />

              <div className="absolute right-3 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-400 bg-zinc-800/80 border border-white/10 rounded-md">
                  {isMac ? '⌘K' : 'Ctrl K'}
                </kbd>
              </div>
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3 ml-auto">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              className="sm:hidden p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* Notifications Link */}
            <Link
              to="/notifications"
              className="relative p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
              aria-label="Notifications"
            >
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#0B0C10]" />
            </Link>

            {/* Messages Link */}
            <Link
              to="/messages"
              className="hidden sm:flex p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
              aria-label="Messages"
            >
              <MessageIcon className="w-5 h-5" />
            </Link>

            {/* Clerk User Button */}
            <div className="flex items-center pl-1 sm:pl-2">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-1 ring-white/15',
                    userButtonPopoverCard: 'bg-zinc-900 text-white border border-white/10',
                  },
                }}
              />
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
