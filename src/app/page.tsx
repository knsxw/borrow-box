// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Borrow Box</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        A peer-to-peer item sharing platform that reduces overconsumption.
        Borrow, lend, and track items in your community with ease.
      </p>

      <div className="flex space-x-4">
        <Link
          href="/items"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
        >
          Browse Items
        </Link>
        <Link
          href="/users"
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition"
        >
          View Users
        </Link>
        <Link
          href="/transactions"
          className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 transition"
        >
          Transactions
        </Link>
      </div>
    </main>
  );
}
