"use client";

import { ReactNode } from "react";
import { FavoritesProvider as FavoritesProviderImpl } from "../../src/context/FavoritesContext";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  return <FavoritesProviderImpl>{children}</FavoritesProviderImpl>;
};

