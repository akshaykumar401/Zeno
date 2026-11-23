import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/CustomLoginHook.jsx';
import { SparklesIcon } from '../../components/ui/Icons.jsx';
import TiptapEditor from '../../components/editor/TiptapEditor.jsx';

const moments = [
  { id: 1, name: 'Your Story', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', isUser: true },
  { id: 2, name: 'elena_ai', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', live: true },
  { id: 3, name: 'keej_ux', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
  { id: 4, name: 'sarah_v', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
  { id: 5, name: 'dev_mar...', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 6, name: 'hologram', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  { id: 7, name: 'tata.code', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80' },
];

const trends = [
  { category: 'Technology • Trending', tag: '#AIRevolution', count: '48.2k Posts' },
  { category: 'Design Tools • Hot', tag: '#FigmaUpdate', count: '12.8k Posts' },
  { category: 'Frameworks • Ecosystem', tag: '#NextJS16', count: '9.4k Posts' },
  { category: 'Hardware • Architecture', tag: '#QuantumSilicon', count: '6.1k Posts' },
];

const suggestedFollows = [
  { name: 'Arlo Thorne', handle: '@arlo_thorne', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' },
  { name: 'Kaelen Vox', handle: '@vox_render', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80' },
  { name: 'Nicolette Du', handle: '@nico_dev', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80' },
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('For You');
  const [postContent, setPostContent] = useState('');
  const [homeEditor, setHomeEditor] = useState(null);

  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || 'Creator';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start w-full min-w-0 max-w-full">
      {/* Center Feed Column */}
      <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-6 min-w-0 w-full">
        {/* Moments Bar */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 backdrop-blur-md min-w-0 w-full overflow-hidden">
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">Moments</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                LIVE
              </span>
            </div>
            <Link to="/explore" className="text-xs text-zinc-400 hover:text-white transition cursor-pointer">
              Archive &gt;
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none w-full min-w-0 -mx-1 px-1">
            {moments.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
                <div className="relative">
                  <div className={`p-0.5 rounded-full transition-transform duration-200 group-hover:scale-105 ${
                    item.live 
                      ? 'bg-gradient-to-tr from-pink-500 via-indigo-500 to-purple-500' 
                      : 'bg-zinc-800 border border-white/10'
                  }`}>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-[#0B0C10]"
                    />
                  </div>
                  {item.live && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-600 text-white shadow-xs">
                      LIVE
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] text-zinc-400 group-hover:text-zinc-200 transition truncate max-w-[56px] sm:max-w-[64px] text-center">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Post Composer Card */}
        <section className="bg-zinc-900/60 border border-white/5 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-xl backdrop-blur-md min-w-0 w-full">
          <div className="flex gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                firstName.charAt(0)
              )}
            </div>

            <div className="flex-1 min-w-0">
              <TiptapEditor
                placeholder={`What are you building on Zeno, ${firstName}?`}
                showToolbar={false}
                minHeight="min-h-[60px]"
                onEditorReady={(editor) => setHomeEditor(editor)}
                onChange={({ text }) => setPostContent(text)}
              />

              <div className="mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-white/5 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-3 sm:gap-4 text-xs text-zinc-400">
                  <button type="button" className="hover:text-indigo-400 transition flex items-center gap-1 cursor-pointer">
                    <span>🖼️</span> <span className="hidden sm:inline">Media</span>
                  </button>
                  <button type="button" className="hover:text-indigo-400 transition flex items-center gap-1 cursor-pointer">
                    <span>📊</span> <span className="hidden sm:inline">Poll</span>
                  </button>
                  <button type="button" className="hover:text-indigo-400 transition flex items-center gap-1 cursor-pointer">
                    <span>⚡</span> <span className="hidden sm:inline">Zeno</span>
                  </button>
                  <button type="button" className="hover:text-indigo-400 transition flex items-center gap-1 cursor-pointer">
                    <span>😊</span> <span className="hidden sm:inline">Emoji</span>
                  </button>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
                  <span className="text-[11px] sm:text-xs text-zinc-500 font-mono">
                    {280 - postContent.length}
                  </span>
                  <button
                    type="button"
                    disabled={!postContent.trim()}
                    onClick={() => {
                      if (!postContent.trim()) return;
                      homeEditor?.commands.clearContent();
                      setPostContent('');
                    }}
                    className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white text-xs font-semibold tracking-wide shadow-md shadow-indigo-600/30 active:scale-95 transition cursor-pointer"
                  >
                    Post ⚡
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feed Filter Tabs */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {['For You', 'Following', 'Communities'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-zinc-800 text-white border border-white/10'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button type="button" className="text-zinc-400 hover:text-white p-1" aria-label="Feed settings">
            <SparklesIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Post Card */}
        <article className="bg-zinc-900/50 border border-white/5 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-xl backdrop-blur-md flex flex-col gap-3.5 sm:gap-4 min-w-0 w-full">
          <div className="flex items-center justify-between min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Marcus Vance"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-1 ring-white/10 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-semibold text-white truncate">Marcus Vance</span>
                  <span className="text-[11px] sm:text-xs text-zinc-500 truncate">@marcus_design • 2h</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-indigo-400 font-medium truncate">Head of Product Design @Zeno</p>
              </div>
            </div>
            <button type="button" className="text-zinc-500 hover:text-zinc-300 p-1">•••</button>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed wrap-break-words">
            We just open-sourced the obsidian dark theme spec for enterprise design engines. Notice how depth shifts purely through elevated surface luminance steps rather than harsh strokes. What&apos;s your take on high-contrast indigo elevation? ✨⚡
          </p>

          <div className="flex items-center gap-2 flex-wrap text-xs text-indigo-400 font-medium">
            <span>#DesignSystems</span>
            <span>#UXObsidian</span>
            <span>#Zeno</span>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/5 relative group min-w-0 w-full">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80"
              alt="Design workstations"
              className="w-full h-48 sm:h-72 object-cover transition-transform duration-300 group-hover:scale-102"
            />
            <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] text-zinc-300 border border-white/10">
              1 of 4 slides
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-zinc-400 min-w-0">
            <div className="flex items-center gap-3.5 sm:gap-6">
              <button type="button" className="hover:text-rose-400 transition flex items-center gap-1 cursor-pointer">
                <span>❤️</span> <span>2.4k</span>
              </button>
              <button type="button" className="hover:text-indigo-400 transition flex items-center gap-1 cursor-pointer">
                <span>💬</span> <span>318</span>
              </button>
              <button type="button" className="hover:text-emerald-400 transition flex items-center gap-1 cursor-pointer">
                <span>🔁</span> <span>892</span>
              </button>
              <span className="text-zinc-500 hidden sm:flex items-center gap-1">
                <span>👁️</span> <span>48.9k</span>
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button type="button" className="hover:text-zinc-200 transition cursor-pointer" aria-label="Bookmark">🔖</button>
              <button type="button" className="hover:text-zinc-200 transition cursor-pointer" aria-label="Share">📤</button>
            </div>
          </div>
        </article>
      </div>

      {/* Right Column / Widgets */}
      <aside className="lg:col-span-4 flex flex-col gap-4 sm:gap-6 min-w-0 w-full">
        {/* Zeno Spaces Card */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-md min-w-0 w-full">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Zeno Spaces</h3>
            </div>
            <span className="text-[10px] font-semibold text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
              2 ACTIVE
            </span>
          </div>

          <div className="bg-zinc-800/40 border border-white/5 rounded-xl p-3.5 sm:p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-400">
                Design & Engineering
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                🎧 428 listening
              </span>
            </div>

            <h4 className="text-sm font-semibold text-white leading-snug">
              Future of Spatial Web Interfaces in 2026
            </h4>

            <div className="flex items-center justify-between pt-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-zinc-900" />
                <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-zinc-900" />
                <div className="w-6 h-6 rounded-full bg-pink-500 border-2 border-zinc-900" />
              </div>

              <Link
                to="/explore"
                className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition cursor-pointer"
              >
                Tune In 🎧
              </Link>
            </div>
          </div>
        </div>

        {/* Trends For You */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-md min-w-0 w-full">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Trends for You</h3>
            <span className="text-zinc-500 hover:text-zinc-300 cursor-pointer">⚙️</span>
          </div>

          <div className="flex flex-col gap-3.5 sm:gap-4">
            {trends.map((item) => (
              <div
                key={item.tag}
                onClick={() => navigate(`/search?q=${encodeURIComponent(item.tag)}`)}
                className="flex items-start justify-between cursor-pointer group"
              >
                <div>
                  <span className="text-[11px] text-zinc-500">{item.category}</span>
                  <p className="text-sm font-semibold text-zinc-200 group-hover:text-indigo-400 transition">
                    {item.tag}
                  </p>
                  <span className="text-[11px] text-zinc-500">{item.count}</span>
                </div>
                <span className="text-zinc-600 hover:text-zinc-400 text-xs">•••</span>
              </div>
            ))}
          </div>

          <Link
            to="/explore"
            className="w-full mt-3 sm:mt-4 pt-3 border-t border-white/5 text-xs text-indigo-400 hover:text-indigo-300 font-medium text-center transition cursor-pointer block"
          >
            Show more trends
          </Link>
        </div>

        {/* Who To Follow */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-md min-w-0 w-full">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Who to Follow</h3>
            <span className="text-zinc-500 hover:text-zinc-300 text-xs cursor-pointer">🔄</span>
          </div>

          <div className="flex flex-col gap-3">
            {suggestedFollows.map((person) => (
              <div key={person.handle} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={person.avatar} alt={person.name} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{person.name}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{person.handle}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-3 py-1 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold transition shrink-0 cursor-pointer"
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Home;
