"use client";

import { useEffect } from "react";

export const useInfiniteScroll = (callback: () => void, loading: boolean) => {
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, loading]);
};

