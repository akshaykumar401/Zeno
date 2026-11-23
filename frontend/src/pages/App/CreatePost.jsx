import { useState } from 'react';
import { useAuth } from '../../hooks/CustomLoginHook.jsx';
import {
  PenSparkIcon,
  ImageIcon,
  SparklesIcon,
  CloseIcon
} from '../../components/ui/Icons.jsx';
import TiptapEditor from '../../components/editor/TiptapEditor.jsx';

const quickTags = ['#DesignSystems', '#UXObsidian', '#AIRevolution', '#NextJS16', '#SpatialWeb', '#ZenoExclusive'];

const CreatePost = () => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [editorInstance, setEditorInstance] = useState(null);
  const [audience, setAudience] = useState('Everyone');
  const [activeTab, setActiveTab] = useState('text');
  const [pollOptions, setPollOptions] = useState(['Yes, high contrast', 'Prefer subtle elevations']);
  const [hasImage, setHasImage] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const displayName = user?.fullName || user?.username || 'Creator';
  const displayHandle = user?.primaryEmailAddress?.emailAddress
    ? `@${user.primaryEmailAddress.emailAddress.split('@')[0]}`
    : '@zeno_creator';

  const charLimit = 280;
  const charsRemaining = charLimit - content.length;
  const charPercentage = Math.min(100, Math.max(0, (content.length / charLimit) * 100));

  const handleAddTag = (tag) => {
    if (editorInstance) {
      editorInstance.chain().focus().insertContent(` ${tag} `).run();
    } else {
      setContent((prev) => (prev ? `${prev} ${tag}` : tag));
    }
  };

  const handlePublish = () => {
    if (!content.trim() && !hasImage) return;
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublished(true);
      setContent('');
      if (editorInstance) {
        editorInstance.commands.clearContent();
      }
      setHasImage(false);
      setTimeout(() => setPublished(false), 3000);
    }, 600);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 min-w-0">
      {/* Top Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Create Post</span>
            <span className="p-1 rounded-md bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <PenSparkIcon className="w-4 h-4" />
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Rich text editor powered by Tiptap with Markdown & formatting support.
          </p>
        </div>

        {/* Audience Selector */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="bg-transparent text-xs text-zinc-300 focus:outline-hidden cursor-pointer"
          >
            <option value="Everyone" className="bg-zinc-900 text-white">Everyone can reply</option>
            <option value="Followers" className="bg-zinc-900 text-white">Followers only</option>
            <option value="Mentioned" className="bg-zinc-900 text-white">Mentioned only</option>
          </select>
        </div>
      </div>

      {/* Main Composer Box */}
      <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md flex flex-col gap-5 min-w-0">
        {/* Author row */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt={displayName} className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0C10]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{displayName}</p>
            <p className="text-xs text-zinc-500 truncate">{displayHandle}</p>
          </div>
        </div>

        {/* Tiptap Rich Text Editor */}
        <div className="min-w-0">
          <TiptapEditor
            placeholder={`What's pulsing in your workspace, ${displayName.split(' ')[0]}? (Type or format rich text)`}
            minHeight="min-h-[140px]"
            showToolbar={true}
            onEditorReady={(editor) => setEditorInstance(editor)}
            onChange={({ text }) => {
              setContent(text);
            }}
          />
        </div>

        {/* Image Attachment Preview */}
        {hasImage && (
          <div className="relative rounded-xl overflow-hidden border border-white/10 max-h-72 group">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80"
              alt="Attached preview"
              className="w-full h-56 object-cover"
            />
            <button
              type="button"
              onClick={() => setHasImage(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md transition cursor-pointer"
              aria-label="Remove image"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
            <span className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] text-zinc-300 border border-white/10">
              Attached Preview
            </span>
          </div>
        )}

        {/* Poll Builder Mode */}
        {activeTab === 'poll' && (
          <div className="p-4 rounded-xl bg-zinc-800/40 border border-white/5 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold uppercase tracking-wider">
              <span>Poll Options</span>
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className="text-rose-400 hover:text-rose-300 transition cursor-pointer"
              >
                Remove Poll
              </button>
            </div>
            {pollOptions.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...pollOptions];
                    newOpts[idx] = e.target.value;
                    setPollOptions(newOpts);
                  }}
                  className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-hidden focus:border-indigo-500"
                  placeholder={`Choice ${idx + 1}`}
                />
              </div>
            ))}
            {pollOptions.length < 4 && (
              <button
                type="button"
                onClick={() => setPollOptions([...pollOptions, `Choice ${pollOptions.length + 1}`])}
                className="text-left text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                + Add option
              </button>
            )}
          </div>
        )}

        {/* Zeno Wave Audio Visualizer Preview */}
        {activeTab === 'wave' && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-zinc-900/40 border border-indigo-500/20 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-indigo-400 flex items-center gap-1.5">
                <span>⚡</span> Zeno Audio Wave Preview
              </span>
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className="text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white shrink-0 shadow-md cursor-pointer"
              >
                ▶
              </button>
              <div className="flex-1 flex items-center gap-1 h-8">
                {[40, 65, 85, 30, 95, 70, 50, 80, 100, 60, 45, 90, 75, 40, 60, 85, 30, 90, 50].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-full bg-indigo-500/60"
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-400 font-mono">01:24</span>
            </div>
          </div>
        )}

        {/* Quick Tag Recommendations */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-zinc-500 flex items-center gap-1">
            <SparklesIcon className="w-3.5 h-3.5 text-indigo-400" />
            Tags:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleAddTag(tag)}
              className="px-2.5 py-1 rounded-md bg-zinc-800/60 hover:bg-zinc-800 border border-white/5 text-[11px] text-zinc-400 hover:text-indigo-300 transition cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Toolbar & Publish Action Row */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 flex-wrap gap-3">
          {/* Attachment buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setHasImage(!hasImage)}
              className={`p-2 rounded-lg transition cursor-pointer ${hasImage ? 'bg-indigo-500/20 text-indigo-400' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              title="Attach media"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'poll' ? 'text' : 'poll')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${activeTab === 'poll' ? 'bg-indigo-500/20 text-indigo-400' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              📊 Poll
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'wave' ? 'text' : 'wave')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${activeTab === 'wave' ? 'bg-indigo-500/20 text-indigo-400' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              ⚡ Wave
            </button>
          </div>

          {/* Character counter & submit */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 relative flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-zinc-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={charsRemaining < 20 ? 'text-rose-500' : 'text-indigo-500'}
                    strokeDasharray={`${charPercentage}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
              <span className={`text-xs font-mono ${charsRemaining < 20 ? 'text-rose-400' : 'text-zinc-500'}`}>
                {charsRemaining}
              </span>
            </div>

            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing || (!content.trim() && !hasImage)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wide shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              {isPublishing ? 'Publishing...' : 'Publish Post ⚡'}
            </button>
          </div>
        </div>

        {/* Feedback Banner */}
        {published && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center justify-between">
            <span>✨ Post published to Zeno successfully!</span>
            <span>View feed →</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
