"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const QueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
