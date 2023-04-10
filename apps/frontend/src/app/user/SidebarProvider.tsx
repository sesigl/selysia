"use client";

import React, { createContext, useState } from "react";

export const SidebarContext = createContext<SidebarContextType>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
});
type SidebarContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
};

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const store: SidebarContextType = {
    sidebarOpen: sidebarOpen,
    setSidebarOpen: setSidebarOpen,
  };

  return (
    <SidebarContext.Provider value={store}>{children}</SidebarContext.Provider>
  );
}
