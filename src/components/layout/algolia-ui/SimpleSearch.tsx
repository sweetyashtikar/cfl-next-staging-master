function SimpleSearch({ onFocus }: any) {
  return (
    <>
      <input
        type="search"
        placeholder="Search for CoFounders here..."
        onFocus={onFocus}
        className="ml-3 w-full rounded-lg border border-slate-300 p-2 pl-8 text-sm md:pl-10 md:text-base"
      />
    </>
  );
}

export default SimpleSearch;
