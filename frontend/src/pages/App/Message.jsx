import { useState } from 'react';
import {
  SearchIcon,
  SendIcon,
  ImageIcon,
  CheckBadgeIcon
} from '../../components/ui/Icons.jsx';

const initialConversations = [
  {
    id: 1,
    name: 'Marcus Vance',
    handle: '@marcus_design',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    online: true,
    lastMessage: 'The new obsidian luminance tokens look pristine! Let me know when you review the pull request.',
    time: '2m',
    unread: 2
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    handle: '@sarah_ventures',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    online: true,
    lastMessage: 'Are you tuning in to the Spatial Web Space tonight?',
    time: '1h',
    unread: 0
  },
  {
    id: 3,
    name: 'Julian Frost',
    handle: '@frost_audio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    online: false,
    lastMessage: 'Sent you the 90-second spatial audio loop stems.',
    time: '5h',
    unread: 0
  },
  {
    id: 4,
    name: 'Elena Rostova',
    handle: '@elena_ai',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    online: true,
    lastMessage: 'The elimination of 1px border dividers makes 4K viewports breathe.',
    time: '1d',
    unread: 0
  }
];

const Message = () => {
  const [conversations] = useState(initialConversations);
  const [activeChat, setActiveChat] = useState(initialConversations[0]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hey Alex! Just looked over your high-contrast surface luminance spec.', time: '10:14 AM' },
    { id: 2, sender: 'me', text: 'Awesome! What did you think of removing explicit stroke borders in favor of elevated background steps?', time: '10:16 AM' },
    { id: 3, sender: 'them', text: 'It makes depth feel continuous rather than boxed in. Especially on OLED panels.', time: '10:18 AM' },
    { id: 4, sender: 'them', text: 'The new obsidian luminance tokens look pristine! Let me know when you review the pull request.', time: '10:20 AM' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
  };

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-[calc(100vh-8.5rem)] min-h-[500px] bg-zinc-900/50 border border-white/5 rounded-2xl backdrop-blur-md overflow-hidden flex min-w-0 shadow-2xl">
      {/* Left Column: Conversations List */}
      <div className={`w-full md:w-80 lg:w-96 shrink-0 border-r border-white/5 flex flex-col bg-[#0B0C10]/95 ${
        activeChat ? 'hidden md:flex' : 'flex'
      }`}>
        {/* Header & Search */}
        <div className="p-4 border-b border-white/5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight">Messages</h2>
            <button
              type="button"
              className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold hover:bg-indigo-500/30 transition cursor-pointer"
            >
              + New
            </button>
          </div>

          <div className="relative flex items-center">
            <SearchIcon className="w-4 h-4 absolute left-3 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search direct messages..."
              className="w-full bg-zinc-900 text-xs text-zinc-200 placeholder-zinc-500 pl-9 pr-3 py-2 rounded-xl border border-white/5 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Conversations Scrollable List */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {filteredConversations.map((item) => {
            const isSelected = activeChat?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveChat(item)}
                className={`p-3.5 flex items-start gap-3 transition cursor-pointer ${
                  isSelected ? 'bg-zinc-800/80 border-l-2 border-indigo-500' : 'hover:bg-white/5'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={item.avatar} alt={item.name} className="w-11 h-11 rounded-full object-cover ring-1 ring-white/10" />
                  {item.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0C10]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold text-white truncate">{item.name}</span>
                    <span className="text-[10px] text-zinc-500">{item.time}</span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1 leading-snug">
                    {item.lastMessage}
                  </p>
                </div>

                {item.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                    {item.unread}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Conversation Pane */}
      <div className={`flex-1 flex flex-col bg-[#07080B] min-w-0 ${
        !activeChat ? 'hidden md:flex' : 'flex'
      }`}>
        {activeChat ? (
          <>
            {/* Conversation Header */}
            <div className="h-16 px-4 sm:px-6 border-b border-white/5 flex items-center justify-between bg-[#0B0C10]/80 backdrop-blur-md">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveChat(null)}
                  className="md:hidden p-1.5 -ml-1 text-zinc-400 hover:text-white"
                  aria-label="Back to conversations"
                >
                  ←
                </button>
                <div className="relative shrink-0">
                  <img src={activeChat.avatar} alt={activeChat.name} className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10" />
                  {activeChat.online && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#0B0C10]" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-white truncate">{activeChat.name}</span>
                    <CheckBadgeIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] text-zinc-500 truncate">
                    {activeChat.online ? 'Active now' : 'Offline'} • {activeChat.handle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-400">
                <button type="button" className="p-2 hover:text-white hover:bg-white/5 rounded-lg transition" title="Start voice session">
                  📞
                </button>
                <button type="button" className="p-2 hover:text-white hover:bg-white/5 rounded-lg transition" title="Info">
                  ℹ️
                </button>
              </div>
            </div>

            {/* Messages Scroll View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-center my-2">
                <span className="text-[10px] text-zinc-500 bg-zinc-900/80 px-3 py-1 rounded-full border border-white/5">
                  Today
                </span>
              </div>

              {messages.map((m) => {
                const isMe = m.sender === 'me';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col max-w-[85%] sm:max-w-md ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-xs shadow-md shadow-indigo-600/20'
                          : 'bg-zinc-800/80 text-zinc-200 border border-white/5 rounded-bl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1 px-1 font-mono">
                      {m.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 border-t border-white/5 bg-[#0B0C10]/90 backdrop-blur-md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition"
                  title="Attach media"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Write a Zeno to ${activeChat.name.split(' ')[0]}...`}
                  className="flex-1 bg-zinc-900 border border-white/5 rounded-full px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:border-indigo-500"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 text-white transition active:scale-95 cursor-pointer shadow-md shadow-indigo-600/30"
                  aria-label="Send message"
                >
                  <SendIcon className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-zinc-500">
            <p className="text-sm">Select a conversation or start a new message.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
