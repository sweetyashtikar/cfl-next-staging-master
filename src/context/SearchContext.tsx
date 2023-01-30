import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext(null);

export function useSearchContext() {
  return useContext(SearchContext);
}

export const SearchConsumer = SearchContext.Consumer;

export function SearchProvider({ children }: any) {
  const [hits, setHits] = useState([]);

  const value = {
    hits,
    setHits,
  };

  return (
    <SearchContext.Provider value={value as any}>
      {children}
    </SearchContext.Provider>
  );
}
