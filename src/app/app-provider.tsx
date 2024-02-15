import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/shared/api/query-client";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
