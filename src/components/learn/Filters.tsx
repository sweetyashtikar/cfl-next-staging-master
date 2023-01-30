import { Disclosure } from '@headlessui/react';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import useUser from '@/hooks/useUser';

import Link from '@/components/Link';

import { courseFilterData } from './data';
import FiltersSkeleton from './FiltersSkeleton';

export interface ICourseFilterProps {
  prefix?: string;
  courseFiltersData: any;
}

export interface IFormProps {
  types: string[];
}

function CourseFilters({ prefix, courseFiltersData }: ICourseFilterProps) {
  const router = useRouter();
  const [optionsType, setOptionsType] = useState([]);

  const queryString = router.asPath.split(/\?/)[1] as string;
  const { ...params } = qs.parse(queryString);

  const defaultValues = {
    ...{
      types: [],
    },
    ...params,
  };

  const { register, watch } = useForm<IFormProps>({
    defaultValues,
  });

  const allFilters: any = [
    {
      id: 'type',
      name: 'Types',
      options: optionsType,
    },
  ];

  useEffect(() => {
    const subscription = watch((data) => {
      router.push(`/learn?${qs.stringify(data)}`);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (courseFiltersData) {
      setOptionsType(
        courseFiltersData.types.map((type: any) => ({
          value: type.name,
          label: type.name,
        }))
      );
    }
  }, [courseFiltersData]);

  const resetFilters = () => {
    allFilters.map((section: any) =>
      section.options.map((option: any, optionIdx: number) => {
        const element = document.getElementById(
          `${prefix || ''}filter-${section.id}-${optionIdx}`
        ) as HTMLInputElement;
        if (element) {
          element.checked = false;
        }
      })
    );
  };

  const renderFilterList = (filters: any) => (
    <>
      {filters.map((section: any) => (
        <Disclosure
          as="div"
          key={section.id}
          defaultOpen={true}
          className="mb-2 border-b border-gray-300 py-5 lg:mb-0 lg:border-none"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-start justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-bold text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-2 flex items-center md:sr-only">
                    {open ? (
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-3">
                <div className="space-y-3">
                  {section.renderFilter ? (
                    <section.renderFilter />
                  ) : (
                    section.options.map((option: any, optionIdx: number) => (
                      <div key={option.value} className="flex items-start">
                        <input
                          // @ts-ignore
                          {...register(`${section.id}[]`)}
                          type="checkbox"
                          id={`${prefix || ''}filter-${
                            section.id
                          }-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          className="h-4 w-4 rounded-full border-blue-600 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`${prefix || ''}filter-${
                            section.id
                          }-${optionIdx}`}
                          className="ml-3 -mt-1 text-sm text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );

  return (
    <form className="lg:grid lg:h-48 lg:grid-cols-9 lg:gap-x-4 lg:overflow-hidden xl:gap-x-6">
      {renderFilterList(allFilters)}

      <div className="flex flex-row items-end justify-start space-x-3 lg:py-5 xl:py-6">
        <Link
          href="/learn"
          className="rounded-md border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          onClick={resetFilters}
        >
          Reset
        </Link>
      </div>
    </form>
  );
}

export default function LoadCourseFilters({ prefix }: { prefix?: string }) {
  // TODO - Will change it to course-filter when the API is ready
  // const { data: courseFiltersData, error: onboardingError } = useSessionFetch('onboarding');

  const { data: courseFiltersData, error: onboardingError } = courseFilterData;

  const { user } = useUser();

  if (!user || (!courseFiltersData && !onboardingError)) {
    return <FiltersSkeleton />;
  }

  return (
    <CourseFilters prefix={prefix} courseFiltersData={courseFiltersData} />
  );
}
