import { useState } from 'react';
import {
  BellIcon,
  HeartIcon,
  RepeatIcon,
  SparklesIcon,
  CheckBadgeIcon
} from '../../components/ui/Icons.jsx';

const initialNotifications = [
  {
    id: 1,
    type: 'like',
    user: 'Marcus Vance',
    handle: '@marcus_design',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    content: 'liked your post: "We just open-sourced the obsidian dark theme spec for enterprise design engines."',
    time: '4m ago',
    read: false
  },
  {
    id: 2,
    type: 'repost',
    user: 'Sarah Jenkins',
    handle: '@sarah_ventures',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    content: 'reposted your architecture design breakdown to 94.2k followers.',
    time: '32m ago',
    read: false
  },
  {
    id: 3,
    type: 'mention',
    user: 'Elena Rostova',
    handle: '@elena_ai',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    content: 'mentioned you in a thread: "Check out @zeno_creator\'s thoughts on spatial surface luminance steps."',
    time: '2h ago',
    read: true
  },
  {
    id: 4,
    type: 'follow',
    user: 'Julian Frost',
    handle: '@frost_audio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    content: 'started following your posts on Zeno.',
    time: '5h ago',
    read: true
  },
  {
    id: 5,
    type: 'space',
    user: 'Zeno Spaces',
    handle: '@zeno_spaces',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    content: 'Live session "Future of Spatial Web Interfaces in 2026" started. 428 creators are listening.',
    time: '6h ago',
    read: true
  }
];

const Notification = () => {
  const [filter, setFilter] = useState('All');
  const [notifications, setNotifications] = useState(initialNotifications);
  const [followed, setFollowed] = useState({});

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleFollow = (handle) => {
    setFollowed((prev) => ({ ...prev, [handle]: !prev[handle] }));
  };

  const filteredNotifications = notifications.filter((item) => {
    if (filter === 'Mentions') return item.type === 'mention';
    if (filter === 'Likes') return item.type === 'like' || item.type === 'repost';
    if (filter === 'Verified') return item.type === 'space' || item.type === 'follow';
    return true;
  });

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 min-w-0">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Notifications</span>
            <span className="p-1 rounded-md bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <BellIcon className="w-4 h-4" />
            </span>
          </h1>
        </div>

        <button
          type="button"
          onClick={markAllRead}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 overflow-x-auto scrollbar-none">
        {['All', 'Mentions', 'Likes', 'Verified'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              filter === tab
                ? 'bg-zinc-800 text-white border border-white/10 shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-3 min-w-0">
        {filteredNotifications.map((n) => {
          return (
            <div
              key={n.id}
              className={`p-4 rounded-xl border transition-all duration-200 backdrop-blur-md flex items-start justify-between gap-3 ${
                !n.read
                  ? 'bg-zinc-900/80 border-indigo-500/20 shadow-md'
                  : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                {/* Type Badge Icon */}
                <div className="relative shrink-0 mt-0.5">
                  <img src={n.avatar} alt={n.user} className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10" />
                  <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#0B0C10] ${
                    n.type === 'like' ? 'bg-rose-500/90 text-white' :
                    n.type === 'repost' ? 'bg-emerald-500/90 text-white' :
                    n.type === 'mention' ? 'bg-indigo-500/90 text-white' :
                    n.type === 'space' ? 'bg-amber-500/90 text-white' :
                    'bg-purple-500/90 text-white'
                  }`}>
                    {n.type === 'like' && <HeartIcon className="w-2.5 h-2.5" filled />}
                    {n.type === 'repost' && <RepeatIcon className="w-2.5 h-2.5" />}
                    {n.type === 'mention' && <span className="text-[10px] font-bold">@</span>}
                    {n.type === 'space' && <SparklesIcon className="w-2.5 h-2.5" />}
                    {n.type === 'follow' && <span className="text-[10px] font-bold">+</span>}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs sm:text-sm font-semibold text-white">{n.user}</span>
                    <CheckBadgeIcon className="w-3.5 h-3.5" />
                    <span className="text-[11px] text-zinc-500">{n.handle}</span>
                    <span className="text-[11px] text-zinc-600">• {n.time}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                    {n.content}
                  </p>
                </div>
              </div>

              {/* Action for follow notifications */}
              {n.type === 'follow' && (
                <button
                  type="button"
                  onClick={() => toggleFollow(n.handle)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition cursor-pointer ${
                    followed[n.handle]
                      ? 'bg-zinc-800 text-zinc-300'
                      : 'bg-white text-zinc-950 hover:bg-zinc-200'
                  }`}
                >
                  {followed[n.handle] ? 'Following' : 'Follow Back'}
                </button>
              )}

              {n.type === 'space' && (
                <button
                  type="button"
                  className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold shrink-0 hover:bg-indigo-500/30 transition cursor-pointer"
                >
                  Tune In
                </button>
              )}

              {!n.read && (
                <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;
