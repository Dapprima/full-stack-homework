import React from "react";
import Box from "@mui/material/Box";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import Navbar from "@/components/Navbar";
import MuiAppThemeProvider from "@/components/MuiThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";

import "./globals.css";

export const metadata = {
  title: "Alison Full Stack Assessment",
  description:
    "A web application for number pair calculations and grade management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <MuiAppThemeProvider>
            <Navbar />
            <Box component="main" sx={{ p: 3 }}>
              <ErrorBoundary>{children}</ErrorBoundary>
            </Box>
          </MuiAppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
