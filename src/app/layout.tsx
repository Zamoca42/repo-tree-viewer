import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/util";
import { TreeViewProvider } from "@/context/view-filter";
import { APP_DESCRIPTION, APP_TITLE } from "@/lib/constant";
import { SidebarInset, SidebarProvider } from "@/component/ui/sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  keywords: [
    "GitHub",
    "repository",
    "tree",
    "viewer",
    "ASCII",
    "folder structure",
    "file structure",
  ],
  authors: [{ name: "Zamoca42", url: "https://github.com/Zamoca42" }],
  openGraph: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="oSV9NtTWaNbiQLGBEQoyeABgw0rLEsPLWryHpK-SqCI"
        />
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <TreeViewProvider>
          <SidebarProvider>
            <aside>{sidebar}</aside>
            <SidebarInset>
              <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </TreeViewProvider>
      </body>
    </html>
  );
}
