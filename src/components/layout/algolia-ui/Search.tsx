// import algoliasearch and InstantSearch
import algoliasearch from 'algoliasearch/lite';
import { useState } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';

import Hits from './Hits';
import SearchBox from './SearchBox';
import SimpleSearch from './SimpleSearch';

// Initialize the Algolia client
const searchClient = algoliasearch(
  'B6XHF6BHBR',
  '8e740d8331e8338dd599d0348ea392b0'
);

const Search = () => {
  const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(false);

  const onFocusSearchInput = () => {
    setIsSearchEnabled(true);
  };

  return (
    <>
      {!isSearchEnabled ? (
        <SimpleSearch onFocus={onFocusSearchInput} />
      ) : (
        <InstantSearch
          searchClient={searchClient} // this is the Algolia client
          indexName="profiles" // this is your index name
        >
          <SearchBox />
          <Hits />
        </InstantSearch>
      )}
    </>
  );
};

export default Search;
