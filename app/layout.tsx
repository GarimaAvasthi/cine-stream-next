import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { FavoritesProvider } from "./providers/FavoritesProvider";

export const metadata: Metadata = {
  title: "Cine-Stream",
  description: "Discover and save your favorite movies with Cine-Stream.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          <div className="app-shell">
            <Navbar />
            <main className="page-content">{children}</main>
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}
