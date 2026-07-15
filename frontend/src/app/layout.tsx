import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Preloader } from "@/components/Preloader";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "iPhone Flash Drive | Auto Backup & Free Up Space",
  description: "Plug into your iPhone's Lightning port and back up photos & videos in seconds. Swivel-proof metal build, USB 3.0 speed, 64GB–1TB.",
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Preloader>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
            <Toaster position="bottom-right" toastOptions={{ style: { background: "#FFFFFF", color: "#111111", border: "1px solid #E5E7EB" } }} />
          </ThemeProvider>
        </Preloader>
      </body>
    </html>
  );
}
