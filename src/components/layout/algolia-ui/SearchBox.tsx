// import connectSearchBox
import { useRouter } from 'next/router';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ refine }: any) => {
  const router = useRouter();

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      // The user pressed the Enter key, so perform the search
      event.preventDefault();
      router.push('/search?country=');
    }
  };

  return (
    <>
      <input
        id="algolia_search"
        type="search"
        placeholder="Search for CoFounders here..."
        onChange={(e) => refine(e.currentTarget.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        className="ml-3 w-full rounded-lg border border-slate-300 p-2 pl-8 text-sm md:pl-10 md:text-base"
      />
    </>
  );
};

export default connectSearchBox(SearchBox);
