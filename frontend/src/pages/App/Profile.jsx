import { useState } from 'react';
import { useAuth } from '../../hooks/CustomLoginHook.jsx';
import {
  CheckBadgeIcon,
  PinIcon,
  HeartIcon,
  RepeatIcon,
  BookmarkIcon
} from '../../components/ui/Icons.jsx';

const Profile = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('Zeno');
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Design Technologist & Founding Engineer. Building spatial obsidian luminance interfaces at Zeno.');

  const displayName = user?.fullName || user?.username || 'Zeno Creator';
  const displayHandle = user?.primaryEmailAddress?.emailAddress 
    ? `@${user.primaryEmailAddress.emailAddress.split('@')[0]}` 
    : '@zeno_creator';

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 min-w-0">
      {/* Profile Card Container */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md min-w-0">
        {/* Panoramic Gradient Cover Banner */}
        <div className="h-36 sm:h-52 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-zinc-900 relative">
          <div className="absolute inset-0 bg-radial from-indigo-500/20 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-semibold text-zinc-300 border border-white/10">
              PRO CREATOR
            </span>
          </div>
        </div>

        {/* Identity & Actions Bar */}
        <div className="px-4 sm:px-6 pb-6 pt-0 relative flex flex-col gap-4">
          <div className="flex items-end justify-between -mt-12 sm:-mt-16 mb-2 flex-wrap gap-3">
            {/* Avatar */}
            <div className="relative">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={displayName}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-[#0B0C10] shadow-2xl bg-zinc-800"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-700 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-[#0B0C10] shadow-2xl">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-[#0B0C10]" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-white/10 transition cursor-pointer"
              >
                {isEditing ? 'Save Bio' : 'Edit Profile'}
              </button>

              <button
                type="button"
                onClick={() => signOut()}
                className="px-4 py-2 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Name & Handle */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{displayName}</h1>
              <CheckBadgeIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 font-medium">{displayHandle}</p>
          </div>

          {/* Bio */}
          {isEditing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={2}
              className="w-full bg-zinc-800/80 border border-indigo-500/40 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 focus:outline-hidden"
            />
          ) : (
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
              {bio}
            </p>
          )}

          {/* Metadata details */}
          <div className="flex items-center gap-x-5 gap-y-2 flex-wrap text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span>📍</span> San Francisco, CA
            </span>
            <span className="flex items-center gap-1.5">
              <span>🔗</span> <a href="#" className="text-indigo-400 hover:underline">zeno.design</a>
            </span>
            <span className="flex items-center gap-1.5">
              <span>📅</span> Joined March 2026
            </span>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 pt-2 border-t border-white/5 text-xs">
            <span className="text-zinc-400">
              <strong className="text-white font-bold font-mono">1.4k</strong> Following
            </span>
            <span className="text-zinc-400">
              <strong className="text-white font-bold font-mono">18.6k</strong> Followers
            </span>
            <span className="text-zinc-400">
              <strong className="text-white font-bold font-mono">342</strong> Posts
            </span>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex items-center border-t border-white/5 px-4 sm:px-6 divide-x divide-transparent">
          {['Posts', 'Replies', 'Highlights', 'Likes'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition cursor-pointer ${
                activeTab === tab
                  ? 'border-indigo-500 text-white'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Content Feed */}
      <div className="flex flex-col gap-4 min-w-0">
        {/* Pinned Post */}
        <article className="p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col gap-3.5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold">
            <PinIcon className="w-3.5 h-3.5" />
            <span>Pinned Post</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {displayName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-white">{displayName}</span>
                <CheckBadgeIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-zinc-500">{displayHandle} • Mar 14</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Announcing our new spatial obsidian elevation design library. Built natively for next-gen interactive workspaces. Zero stroke borders, pure luminance depth steps. ⚡🌌
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-zinc-400">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 hover:text-rose-400 cursor-pointer">
                <HeartIcon className="w-4 h-4" /> 3.8k
              </span>
              <span className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer">
                <RepeatIcon className="w-4 h-4" /> 1.2k
              </span>
              <span className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer">
                💬 245
              </span>
            </div>
            <BookmarkIcon className="w-4 h-4 hover:text-white cursor-pointer" />
          </div>
        </article>

        {/* Secondary Post */}
        <article className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-white/5 flex flex-col gap-3.5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {displayName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-white">{displayName}</span>
                <CheckBadgeIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-zinc-500">{displayHandle} • 2d ago</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Testing multi-agent orchestration for local client components in Vite. The performance delta is mindblowing compared to monolithic pipelines! 🚀
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-zinc-400">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 hover:text-rose-400 cursor-pointer">
                <HeartIcon className="w-4 h-4" /> 842
              </span>
              <span className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer">
                <RepeatIcon className="w-4 h-4" /> 189
              </span>
              <span className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer">
                💬 64
              </span>
            </div>
            <BookmarkIcon className="w-4 h-4 hover:text-white cursor-pointer" />
          </div>
        </article>
      </div>
    </div>
  );
};

export default Profile;
