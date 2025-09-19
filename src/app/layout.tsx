import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-blue-600 p-4 text-white flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/items">Items</Link>
          <Link href="/users">Users</Link>
          <Link href="/transactions">Transactions</Link>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
