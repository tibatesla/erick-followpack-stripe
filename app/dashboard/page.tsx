import Link from "next/link";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  // Await the params in Next.js 16 to read the URL query
  const params = await searchParams;
  
  // Fallback to "User" if no email is found in the URL
  const userEmail = params.email || "User";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-white">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/50 p-10 shadow-2xl backdrop-blur-md">
        
<header className="mb-8 flex flex-col items-start gap-4 border-b border-slate-800 pb-6 md:mb-10 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold md:text-3xl">FollowPack Pro Dashboard</h1>
          
          {/* Automatically showing the email passed from Stripe */}
          <div className="flex w-full max-w-full items-center gap-3 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300 md:w-auto">
            <div className="h-2 w-2 shrink-0 rounded-full bg-green-500"></div>
            <span className="truncate">{userEmail}</span>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Placeholder Dashboard Cards */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6">
            <h3 className="text-lg font-semibold text-blue-400">Growth Tools</h3>
            <p className="mt-2 text-sm text-slate-400">Access your automated workflows.</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6">
            <h3 className="text-lg font-semibold text-blue-400">Analytics</h3>
            <p className="mt-2 text-sm text-slate-400">View your real-time stats.</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6">
            <h3 className="text-lg font-semibold text-blue-400">Settings</h3>
            <p className="mt-2 text-sm text-slate-400">Manage your subscription.</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 underline">
            Log out / Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}