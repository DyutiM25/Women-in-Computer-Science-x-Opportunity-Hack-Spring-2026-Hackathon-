import type { Metadata } from "next";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "WIAL by #21NotSoCool",
  description:
    "Low-bandwidth Next.js MVP for WIAL global and chapter websites.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/images/wial-usa-placeholder-optimized-removebg-preview.png",
        type: "image/png",
        sizes: "220x113",
      },
    ],
    shortcut: [
      {
        url: "/images/wial-usa-placeholder-optimized-removebg-preview.png",
        type: "image/png",
        sizes: "220x113",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  var isLocalhost =
                    window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1';

                  if (isLocalhost) {
                    navigator.serviceWorker.getRegistrations().then(function (registrations) {
                      registrations.forEach(function (registration) {
                        registration.unregister();
                      });
                    });
                    return;
                  }

                  navigator.serviceWorker.register('/sw.js').catch(function (error) {
                    console.error('Service worker registration failed', error);
                  });
                });
              }
            `,
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
