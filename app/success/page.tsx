import Stripe from "stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

// Notice the Promise type here - required for Next.js 15/16
export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  // In Next.js 15/16, we MUST await searchParams
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) {
    console.error("No session ID found, redirecting to home.");
    redirect("/");
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error("Stripe retrieval failed:", error);
    redirect("/");
  }

  if (session.payment_status !== "paid") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white text-center">
        <div>
          <h1 className="text-2xl font-bold text-red-500">Payment Pending</h1>
          <p className="text-slate-400 mt-2">Your payment hasn't been confirmed yet.</p>
          <Link href="/" className="mt-6 inline-block text-blue-400 underline">Try again</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="absolute top-0 h-80 w-full bg-green-600/10 blur-[120px]" />
      
      <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/50 p-8 text-center shadow-2xl backdrop-blur-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
          <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-white">Success, Tesla!</h1>
        <p className="mt-2 text-slate-400">Your FollowPack Pro subscription is now active.</p>
        
        <div className="mt-8 rounded-xl bg-slate-800/50 p-4 text-left text-sm text-slate-300 border border-slate-700/50">
          <p><span className="text-slate-500">Customer:</span> {session.customer_details?.email}</p>
          <p><span className="text-slate-500">Status:</span> <span className="text-green-400 font-mono">Active</span></p>
        </div>

        
        <Link 
          href={`/dashboard?email=${encodeURIComponent(session.customer_details?.email || '')}`} 
          className="mt-8 block w-full text-center rounded-xl bg-white py-4 font-bold text-black transition-all hover:bg-slate-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}