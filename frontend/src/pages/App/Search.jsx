import { useState } from 'react';
import {
  SearchIcon,
  SparklesIcon,
  HeartIcon,
  CheckBadgeIcon,
  CloseIcon
} from '../../components/ui/Icons.jsx';

const recentSearches = ['#AIRevolution', 'obsidian dark spec', 'spatial audio stems', 'Marcus Vance'];

const searchCreators = [
  { name: 'Marcus Vance', handle: '@marcus_design', bio: 'Head of Product Design @ZenoEnterprise. Obsidian depth tokens.', followers: '68.5k', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  { name: 'Sarah Jenkins', handle: '@sarah_ventures', bio: 'General Partner @ZenoVentures. Multi-agent swarm investor.', followers: '94.2k', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
];

const searchPosts = [
  {
    author: 'Elena Rostova',
    handle: '@elena_ai',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    time: '4h ago',
    text: 'The elimination of 1px border dividers makes the viewport breathe noticeably better on 4K monitors. Super clean obsidian elevation!',
    likes: '1.4k',
    replies: '142'
  },
  {
    author: 'Julian Frost',
    handle: '@frost_audio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    time: '6h ago',
    text: 'Synthesized live procedural bio-signals into a 90-second dynamic spatial loop for studio monitors.',
    likes: '842',
    replies: '104'
  }
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeScope, setActiveScope] = useState('Top');
  const [history, setHistory] = useState(recentSearches);
  const [followed, setFollowed] = useState({});

  const removeHistoryItem = (item) => {
    setHistory((prev) => prev.filter((h) => h !== item));
  };

  const toggleFollow = (handle) => {
    setFollowed((prev) => ({ ...prev, [handle]: !prev[handle] }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 min-w-0">
      {/* Prominent Search Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Explore & Search</span>
            <span className="p-1 rounded-md bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <SearchIcon className="w-4 h-4" />
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Query creators, trending tags, spatial discussions, and media.
          </p>
        </div>

        {/* Big Search Bar */}
        <div className="relative flex items-center">
          <SearchIcon className="w-5 h-5 absolute left-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tags, topics, creators, or keywords..."
            className="w-full bg-zinc-900/90 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 pl-12 pr-12 py-3.5 rounded-2xl border border-white/10 focus:outline-hidden focus:border-indigo-500/60 shadow-xl"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-4 p-1 rounded-full text-zinc-500 hover:text-white transition cursor-pointer"
              aria-label="Clear search"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Recent Searches Pills */}
        {history.length > 0 && !searchTerm && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <SparklesIcon className="w-3.5 h-3.5 text-indigo-400" /> Recent:
            </span>
            {history.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/70 text-xs text-zinc-300 border border-white/5 hover:bg-zinc-800 cursor-pointer transition"
                onClick={() => setSearchTerm(item)}
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeHistoryItem(item);
                  }}
                  className="text-zinc-500 hover:text-zinc-200"
                >
                  ✕
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={() => setHistory([])}
              className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Search Scopes */}
        <div className="flex items-center gap-2 border-b border-white/5 pb-2 overflow-x-auto scrollbar-none">
          {['Top', 'Latest', 'People', 'Media', 'Tags'].map((scope) => (
            <button
              key={scope}
              type="button"
              onClick={() => setActiveScope(scope)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeScope === scope
                  ? 'bg-zinc-800 text-white border border-white/10 shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {scope}
            </button>
          ))}
        </div>
      </div>

      {/* People Matches */}
      <section className="flex flex-col gap-3 min-w-0">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">
          Matching Creators
        </h2>

        <div className="flex flex-col gap-2.5">
          {searchCreators.map((creator) => {
            const isFollowed = followed[creator.handle];
            return (
              <div
                key={creator.handle}
                className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/40 border border-white/5 flex items-center justify-between gap-3 backdrop-blur-md shadow-md"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={creator.avatar} alt={creator.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-semibold text-white truncate">{creator.name}</span>
                      <CheckBadgeIcon className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[11px] text-zinc-500 truncate">{creator.handle}</p>
                    <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5">{creator.bio}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFollow(creator.handle)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition cursor-pointer ${
                    isFollowed
                      ? 'bg-zinc-800 text-zinc-300'
                      : 'bg-white text-zinc-950 hover:bg-zinc-200'
                  }`}
                >
                  {isFollowed ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Post Results */}
      <section className="flex flex-col gap-3 min-w-0">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">
          Top Posts
        </h2>

        <div className="flex flex-col gap-4">
          {searchPosts.map((post, idx) => (
            <article
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-white/5 flex flex-col gap-3 shadow-xl backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <img src={post.avatar} alt={post.author} className="w-9 h-9 rounded-full object-cover shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-white truncate">{post.author}</span>
                    <CheckBadgeIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] text-zinc-500">{post.handle} • {post.time}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {post.text}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-zinc-400">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5 hover:text-rose-400 cursor-pointer">
                    <HeartIcon className="w-4 h-4" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer">
                    💬 {post.replies}
                  </span>
                </div>
                <span className="text-zinc-500 hover:text-zinc-300 cursor-pointer">Share 📤</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Search;
