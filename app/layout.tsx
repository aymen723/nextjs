"use client";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import StateController from "@/components/StateController";
import { SearchQueryProvider } from "@/util/contexts/SearchQuery";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

// export const metadata: Metadata = {
//   title: "Pharmanity",
//   description: "an application for finding medical products",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="396902336566-ebldppmtslhsgcmq1c5a9tl2r7m3neat.apps.googleusercontent.com">
          <SearchQueryProvider>
            <html lang="en">
              <head>
                <title>PharmaConnect</title>
              </head>
              <body className={roboto.className}>
                <StateController />
                {children}
              </body>
            </html>
          </SearchQueryProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
