import { useState } from 'react';
import {
  SparklesIcon,
  HeartIcon,
  RepeatIcon,
  BookmarkIcon,
  CheckBadgeIcon
} from '../../components/ui/Icons.jsx';

const categories = ['All', 'Trending', 'Design & UX', 'AI Swarms', 'Spatial Web', 'Hardware', 'Audio Labs'];

const trendingCards = [
  { rank: '#1', tag: '#AIRevolution', title: 'Multi-Agent Swarm Orchestration in Production', count: '48.2k Posts', delta: '+142% this hour' },
  { rank: '#2', tag: '#FigmaUpdate', title: 'Obsidian Theme Surface Luminance Spec', count: '24.1k Posts', delta: '+88% this hour' },
  { rank: '#3', tag: '#NextJS16', title: 'Zero-JS Edge Workers Performance Benchmarks', count: '18.9k Posts', delta: '+64% this hour' },
  { rank: '#4', tag: '#QuantumSilicon', title: 'Optical Neural Interconnects at 3nm Node', count: '12.4k Posts', delta: '+41% this hour' },
];

const featuredCreators = [
  { name: 'Sarah Jenkins', handle: '@sarah_ventures', bio: 'General Partner @Zeno. Investing in spatial compute & swarm intelligence.', followers: '94.2k', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
  { name: 'Marcus Vance', handle: '@marcus_design', bio: 'Head of Product Design. Crafting obsidian luminance systems for next-gen engines.', followers: '68.5k', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { name: 'Julian Frost', handle: '@frost_audio', bio: 'Spatial acoustic engineer. Procedural bio-signal loops & ambient spatial sound.', followers: '42.1k', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
];

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [followed, setFollowed] = useState({});

  const toggleFollow = (handle) => {
    setFollowed((prev) => ({ ...prev, [handle]: !prev[handle] }));
  };

  return (
    <div className="w-full flex flex-col gap-6 min-w-0">
      {/* Hero Spotlight Space Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-zinc-900 border border-indigo-500/20 p-5 sm:p-7 shadow-2xl backdrop-blur-md">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Live Zeno Space</span>
              <span className="text-xs text-zinc-400">• 428 listening right now</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              Future of Spatial Web Interfaces in 2026
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300">
              Join top design engineers and architects discussing multi-agent interaction and high-contrast obsidian depth models.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex -space-x-2.5">
              <img src={featuredCreators[0].avatar} alt="" className="w-8 h-8 rounded-full border-2 border-zinc-900 object-cover" />
              <img src={featuredCreators[1].avatar} alt="" className="w-8 h-8 rounded-full border-2 border-zinc-900 object-cover" />
              <img src={featuredCreators[2].avatar} alt="" className="w-8 h-8 rounded-full border-2 border-zinc-900 object-cover" />
            </div>
            <button
              type="button"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 active:scale-95 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              Tune In 🎧
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full min-w-0">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeCategory === cat
                ? 'bg-zinc-800 text-white border border-white/10 shadow-xs'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Trending Topics Grid */}
      <section className="flex flex-col gap-3 min-w-0">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-indigo-400" />
            <span>Trending on Zeno</span>
          </h2>
          <span className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer">Explore all topics →</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingCards.map((item) => (
            <div
              key={item.tag}
              className="p-4 rounded-xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-white/5 hover:border-indigo-500/30 transition-all duration-200 cursor-pointer group flex flex-col justify-between gap-3 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-indigo-400">{item.rank}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">{item.delta}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-indigo-300 transition">
                  {item.tag}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-snug">
                  {item.title}
                </p>
              </div>
              <span className="text-[11px] text-zinc-500 font-medium">{item.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Top Creators Spotlight Carousel/Grid */}
      <section className="flex flex-col gap-3 min-w-0">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Featured Creators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredCreators.map((creator) => {
            const isFollowed = followed[creator.handle];
            return (
              <div
                key={creator.handle}
                className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex flex-col justify-between gap-4 shadow-lg backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={creator.avatar} alt={creator.name} className="w-11 h-11 rounded-full object-cover ring-1 ring-white/10" />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-white">{creator.name}</span>
                        <CheckBadgeIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-zinc-500">{creator.handle}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFollow(creator.handle)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      isFollowed
                        ? 'bg-zinc-800 text-zinc-300 hover:text-white'
                        : 'bg-white text-zinc-950 hover:bg-zinc-200'
                    }`}
                  >
                    {isFollowed ? 'Following' : 'Follow'}
                  </button>
                </div>

                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {creator.bio}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-zinc-500">
                  <span>{creator.followers} followers</span>
                  <span className="text-indigo-400 hover:underline cursor-pointer">View profile</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Curated Feed Highlight Card */}
      <section className="flex flex-col gap-3 min-w-0">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Hot Discussions
        </h2>

        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-white/5 flex flex-col gap-3.5 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={featuredCreators[0].avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
              <div>
                <span className="text-xs sm:text-sm font-semibold text-white">Autonomous multi-agent swarms vs. fine-tuned giant models</span>
                <p className="text-[11px] text-zinc-500">Posted by @sarah_ventures • 3h ago</p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-800/40 border border-white/5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs text-zinc-200">
              <span>Specialized Multi-Agent Swarms</span>
              <span className="font-bold font-mono text-indigo-400">61%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '61%' }} />
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 mt-1">
              <span>Frontier Monolithic Models (10T+)</span>
              <span className="font-bold font-mono text-zinc-400">27%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-zinc-600 rounded-full" style={{ width: '27%' }} />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 hover:text-rose-400 transition cursor-pointer">
                <HeartIcon className="w-4 h-4" /> 1.1k
              </span>
              <span className="flex items-center gap-1.5 hover:text-indigo-400 transition cursor-pointer">
                <RepeatIcon className="w-4 h-4" /> 315
              </span>
            </div>
            <BookmarkIcon className="w-4 h-4 hover:text-white transition cursor-pointer" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
