import { Disclosure } from '@headlessui/react';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { InputActionMeta } from 'react-select';
import AsyncSelect from 'react-select/async';

import useSessionFetch from '@/hooks/useSessionFetch';
import useUser from '@/hooks/useUser';

import Link from '@/components/Link';

import { API_URL, NEXT_URL } from '@/config/index';

import PremiumAccessLink from '../common/PremiumAccessLink';

export interface IProfileFilterProps {
  prefix?: string;
  user: any;
  onboardingData: any;
}

export interface IFormProps {
  role: string[];
  premium: string[];
  city: string;
  country: string;
  startupStage: string[];
  skills: string[];
}

function ProfileFilters({ prefix, user, onboardingData }: IProfileFilterProps) {
  const router = useRouter();
  const premium = user && user.role?.type === 'premium';
  const [optionsRole, setOptionsRole] = useState([]);
  const [optionsStartupStage, setOptionsStartupStage] = useState([]);
  const [optionsSkills, setOptionsSkills] = useState([]);

  const [countryInputText, setCountryInputText] = useState('');
  const [countryValue, setCountryValue] = useState<any | null>(null);

  const [cityInputText, setCityInputText] = useState('');
  const [cityValue, setCityValue] = useState<any | null>(null);

  const [skillsInputText, setSkillsInputText] = useState('');
  const [skillsValue, setSkillsValue] = useState([]);

  const queryString = router.asPath.split(/\?/)[1] as string;
  const { page: pageParam, ...params } = qs.parse(queryString);

  const defaultValues = {
    ...{
      role: [],
      premium: [],
      city: '',
      country: user && user?.profile?.countryCode,
      startupStage: [],
      skills: [],
    },
    ...params,
  };

  const { register, handleSubmit, setValue, getValues, reset, watch } =
    useForm<IFormProps>({
      defaultValues,
    });

  useEffect(() => {
    const subscription = watch((data) => {
      router.push(`/search?${qs.stringify(data)}`);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (onboardingData) {
      setOptionsRole(
        onboardingData.roles.map((o: any) => ({
          value: o.name,
          label: o.name,
        }))
      );
      setOptionsStartupStage(
        onboardingData.startupStages.map((o: any) => ({
          value: o.name,
          label: o.name,
        }))
      );
      setOptionsSkills(
        onboardingData.skills.map((o: any) => ({
          value: o.name,
          label: o.name,
        }))
      );
    }
  }, [onboardingData]);

  const renderLocationFilter = () => {
    return (
      <Disclosure
        as="div"
        defaultOpen={true}
        className="border-b border-gray-300 py-5 lg:border-none"
      >
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-bold text-[#4E5E78]">Location</span>
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
              <div className="space-y-3 text-sm">
                <AsyncSelect
                  instanceId="country"
                  classNamePrefix="react-select"
                  placeholder={'Search by country'}
                  noOptionsMessage={() => 'Search by country'}
                  cacheOptions
                  isClearable={true}
                  inputValue={countryInputText}
                  value={countryValue}
                  onInputChange={(
                    newValue: any,
                    actionMeta: InputActionMeta
                  ) => {
                    if (
                      actionMeta.action !== 'input-blur' &&
                      actionMeta.action !== 'menu-close'
                    ) {
                      setCountryInputText(newValue);
                    }
                  }}
                  onChange={(newValue: any) => {
                    setCountryValue(newValue);
                    setValue('country', newValue?.value, { shouldDirty: true });
                  }}
                  loadOptions={async (inputValue: string) => {
                    const query = inputValue
                      ? qs.stringify({
                          _where: {
                            _or: [{ name_contains: inputValue }],
                          },
                        })
                      : '';
                    const res = await fetch(
                      `${API_URL}/countries?_limit=-1&${query}`
                    );
                    if (res.ok) {
                      const results = await res.json();
                      return results.map((c: any) => {
                        if (c.code === getValues('country')) {
                          setCountryValue({
                            value: c.code,
                            label: c.name,
                          });
                        }
                        return {
                          value: c.code,
                          label: c.name,
                        };
                      });
                    }
                  }}
                />

                <AsyncSelect
                  instanceId="city"
                  classNamePrefix="react-select"
                  placeholder={'Search by city'}
                  noOptionsMessage={() => 'Search by city'}
                  cacheOptions
                  defaultOptions
                  isClearable={true}
                  inputValue={cityInputText}
                  value={cityValue}
                  onInputChange={(
                    newValue: any,
                    actionMeta: InputActionMeta
                  ) => {
                    if (
                      actionMeta.action !== 'input-blur' &&
                      actionMeta.action !== 'menu-close'
                    ) {
                      setCityInputText(newValue);
                    }
                  }}
                  onChange={(newValue: any) => {
                    setCityValue(newValue);
                    setValue('city', newValue?.value, { shouldDirty: true });
                  }}
                  loadOptions={async (inputValue: string) => {
                    if (inputValue) {
                      const query = qs.stringify({
                        _where: {
                          _or: [{ name_contains: inputValue }],
                        },
                      });
                      const res = await fetch(
                        `${NEXT_URL}/api/session/cities?${query}`
                      );
                      if (res.ok) {
                        const results = await res.json();
                        return results.map((c: any) => ({
                          value: c.id,
                          label: c.regionCode
                            ? `${c.name}, ${c.regionCode}, ${c.country}`
                            : `${c.name}, ${c.country}`,
                        }));
                      }
                    } else {
                      if (getValues('city')) {
                        const res = await fetch(
                          `${NEXT_URL}/api/session/cities/${getValues('city')}`
                        );
                        if (res.ok) {
                          const c = await res.json();
                          setCityValue({
                            value: c.id,
                            label: c.regionCode
                              ? `${c.name}, ${c.regionCode}, ${c.country}`
                              : `${c.name}, ${c.country}`,
                          });
                        }
                      }
                    }
                  }}
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  };

  const renderSkillsFilter = () => {
    return (
      <Disclosure
        as="div"
        defaultOpen={true}
        className="border-b border-gray-300 py-5 lg:border-none"
      >
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-bold text-[#4E5E78]">Skills</span>
                <span className="ml-2 flex items-center">
                  {!premium && <PremiumAccessLink />}
                  {open ? (
                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-3">
              <div className="space-y-3 text-sm">
                <Select
                  instanceId="skills"
                  isMulti={true}
                  classNamePrefix="react-select"
                  placeholder={'Search by skills'}
                  noOptionsMessage={() =>
                    skillsInputText
                      ? 'Skill not found'
                      : 'Start typing to search by skills'
                  }
                  inputValue={skillsInputText}
                  value={skillsValue}
                  isDisabled={!premium}
                  onInputChange={(
                    newValue: any,
                    actionMeta: InputActionMeta
                  ) => {
                    if (
                      actionMeta.action !== 'input-blur' &&
                      actionMeta.action !== 'menu-close'
                    ) {
                      setSkillsInputText(newValue);
                    }
                  }}
                  onChange={(newValue: any) => {
                    setSkillsValue(newValue);
                    setValue(
                      'skills',
                      newValue.map((x: any) => x.value),
                      { shouldDirty: true }
                    );
                  }}
                  options={optionsSkills}
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  };

  const renderFilterList = (filters: any) => (
    <>
      {filters.map((section: any) => (
        <Disclosure
          as="div"
          key={section.id}
          defaultOpen={true}
          className={`border-b border-gray-300 py-5 lg:border-none ${
            section.name === 'Startup stage' ? 'col-span-3' : ''
          } ${
            section.name === 'Roles' && section.isPremium && !premium
              ? 'col-span-2'
              : ''
          }`}
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-start justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="mr-2 font-bold text-[#4E5E78]">
                    {section.name}
                  </span>
                  <span className="flex items-center">
                    {section.isPremium && !premium && <PremiumAccessLink />}
                    {open ? (
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-3">
                <div
                  className={`space-y-3 ${
                    section.name === 'Startup stage'
                      ? 'lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0'
                      : ''
                  }`}
                >
                  {section.renderFilter ? (
                    <section.renderFilter />
                  ) : (
                    section.options.map((option: any, optionIdx: number) => (
                      <div
                        key={option.value}
                        className={`flex items-start ${
                          section.name === 'Startup stage' ? '' : ''
                        }`}
                      >
                        <input
                          // @ts-ignore
                          {...register(`${section.id}[]`)}
                          type="checkbox"
                          id={`${prefix}filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          disabled={section.isPremium && !premium}
                          className="h-4 w-4 rounded-full  border-blue-600 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`${prefix}filter-${section.id}-${optionIdx}`}
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
    <form className="lg:grid lg:grid-cols-9 lg:gap-x-4 lg:overflow-hidden xl:gap-x-6">
      {renderFilterList([
        {
          id: 'role',
          name: 'Roles',
          isPremium: true,
          options: optionsRole,
        },
      ])}

      <div className="col-span-2">{renderLocationFilter()}</div>

      {renderFilterList([
        {
          id: 'startupStage',
          name: 'Startup stage',
          isPremium: true,
          options: optionsStartupStage,
        },
      ])}

      <div className="col-span-2">{renderSkillsFilter()}</div>
      <div className="col-span-1">
        <div className="flex flex-row items-end justify-start space-x-3 lg:py-5 xl:py-6">
          <Link
            href={`/search?${qs.stringify({ city: user?.profile?.city })}`}
            className=" mt-[35px] rounded-md border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 xl:mt-[30px]"
          >
            Reset
          </Link>
        </div>
      </div>
    </form>
  );
}

export default function LoadProfileFilters({ prefix }: { prefix?: string }) {
  const { data: onboardingData, error: onboardingError } =
    useSessionFetch('onboarding');
  const { user } = useUser();

  if (!user || (!onboardingData && !onboardingError)) {
    return (
      <>
        <ul role="list" className="flex justify-between">
          {[...Array(4)].map((_, i: number) => (
            <li key={i} className="border-b border-gray-300 py-5">
              <div className="flex h-full animate-pulse flex-col items-start space-y-5">
                <div className="h-6 w-40 rounded-md bg-gray-300"></div>
                <div className="flex w-full space-x-4">
                  <div className="h-4 w-4 rounded-md bg-gray-300"></div>
                  <div className="h-4 w-40 rounded-md bg-gray-300"></div>
                </div>
                <div className="flex w-full space-x-4">
                  <div className="h-4 w-4 rounded-md bg-gray-300"></div>
                  <div className="h-4 w-28 rounded-md bg-gray-300"></div>
                </div>
                <div className="flex w-full space-x-4">
                  <div className="h-4 w-4 rounded-md bg-gray-300"></div>
                  <div className="h-4 w-48 rounded-md bg-gray-300"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <ProfileFilters
      prefix={prefix}
      user={user}
      onboardingData={onboardingData}
    />
  );
}
