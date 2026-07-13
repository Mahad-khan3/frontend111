import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Preloader } from "@/components/Preloader";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "NovaDrive | 2-in-1 Cable Flash Drive",
  description: "Your whole phone, one cable. Lightning & USB-C flash drives with up to 256GB storage.",
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
