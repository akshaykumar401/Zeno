import { useAuth } from '../../hooks/CustomLoginHook.jsx';
import { UserButton } from '@clerk/react';

const Home = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight font-serif">Zeno</h1>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-slate-600">
              {user.primaryEmailAddress?.emailAddress || user.fullName || user.username}
            </span>
          )}
          <UserButton />
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Zeno</h2>
          <p className="text-slate-600 mb-6">
            You are successfully authenticated with Clerk.
          </p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium transition cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
