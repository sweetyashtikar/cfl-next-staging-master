import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import qs from 'qs';
import React from 'react';
import { useForm } from 'react-hook-form';

import * as ga from '@/helpers/ga';

export interface IFormProps {
  q: string;
}
export default function SearchBar(props: any) {
  const router = useRouter();
  const queryString = router.asPath.split(/\?/)[1] || '';
  const { page, q, ...params } = qs.parse(queryString);

  const { register, handleSubmit } = useForm<IFormProps>({
    defaultValues: { q: q?.toString() || '' },
  });

  const onSubmit = (data: IFormProps) => {
    ga.event('search', {
      search_term: data.q,
    });

    router.push(`/search?${qs.stringify({ ...router.query, q: data.q })}`);
  };

  return (
    <form className="flex w-full md:sr-only" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex-grow focus-within:z-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          {...register('q')}
          className="block w-full rounded rounded-l-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:block sm:text-sm"
          placeholder="Search for something here..."
        />
      </div>
      {props.header ? (
        ''
      ) : (
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      )}
    </form>
  );
}
