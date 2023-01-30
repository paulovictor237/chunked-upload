"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head />
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
