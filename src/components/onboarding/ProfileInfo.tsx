import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { components, InputActionMeta } from 'react-select';
import { toast } from 'react-toastify';

import useCitySearch, { useCityByID } from '@/hooks/useCitySearch';

import Listbox from '@/components/Listbox';

import { NEXT_URL } from '@/config/index';

import SelectInput from '../settings/SelectInput';

interface IPageProps {
  user?: any;
  nextStep?: string;
}

export interface IFormProps {
  firstName: string;
  lastName: string;
  pronouns: string;
  city: string;
  tagline: string;
}

const Input = (props: any) => {
  return <components.Input {...props} autoComplete={'nope'} />;
};

// TODO: implement default city
export default function ProfileInfo({ user, nextStep }: IPageProps) {
  const router = useRouter();

  const [pronouns, setPronouns] = useState(
    user?.profile?.pronouns
      ? { value: user?.profile?.pronouns, label: user?.profile?.pronouns }
      : null
  );
  const [searchText, setSearchText] = useState('');
  const [selectedCity, setSelectedCity] = useState({
    value: '',
    label: '',
    city: '',
  });
  const { data: cities, loading } = useCitySearch(searchText);
  const { data: userCity } = useCityByID(user?.profile?.city);

  const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    // prevent outside click from resetting inputText to ""
    if (
      actionMeta.action !== 'input-blur' &&
      actionMeta.action !== 'menu-close'
    ) {
      setSearchText(newValue);
    }
  };

  const { register, handleSubmit, setValue, formState } = useForm<IFormProps>({
    defaultValues: {
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      pronouns: user?.profile?.pronouns,
      tagline: user?.profile?.tagline,
      city: user?.profile?.city,
    },
  });
  const { isSubmitting, isDirty } = formState;
  const onSubmit: SubmitHandler<IFormProps> = async (updateData) => {
    try {
      await axios({
        method: user?.profile ? 'PUT' : 'POST',
        url: `${NEXT_URL}/api/session/profiles/me`,
        data: updateData,
      });

      router.push(nextStep || '/onboarding');
      toast('Great! Your profile information was saved successfully');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (userCity != undefined) {
    if (
      selectedCity?.value == '' &&
      selectedCity?.label == '' &&
      selectedCity?.city == ''
    ) {
      let selectedOption = {
        value: userCity[0]?.id,
        label: userCity[0]?.regionCode
          ? userCity[0]?.name +
            ', ' +
            userCity[0]?.regionCode +
            ', ' +
            userCity[0]?.country
          : userCity[0]?.name + ', ' + userCity[0]?.country,
        city: userCity[0]?.name,
      };
      setSelectedCity(selectedOption);
    }
  }

  const setTheCity = (city: any) => {
    setValue('city', city, { shouldDirty: true });
  };

  return (
    <div className="w-full max-w-sm lg:w-96">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700"
          >
            First name
          </label>
          <div className="mt-1">
            <input
              {...register('firstName', { required: true })}
              type="text"
              autoComplete="given-name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700"
          >
            Last name
          </label>
          <div className="mt-1">
            <input
              {...register('lastName', { required: true })}
              type="text"
              autoComplete="family-name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700"
          >
            Pronouns
          </label>
          <div className="mt-1">
            <Listbox
              value={pronouns}
              onChange={(newValue) => {
                setPronouns(newValue);
                setValue('pronouns', newValue?.value, { shouldDirty: true });
              }}
              options={[
                { value: 'She/Her', label: 'She/Her' },
                { value: 'He/Him', label: 'He/Him' },
                { value: 'They/Them', label: 'They/Them' },
                { value: "Don't_want_to_share", label: "Don't Want To Share" },
              ]}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <div className="mt-1">
            <SelectInput
              className={
                'w-full rounded-[4px] border-[#cccccc] text-sm placeholder-gray-800 hover:border-[#aaaaaa] '
              }
              selected={selectedCity}
              setTheCity={setTheCity}
            />
            {/* <Select
              instanceId="city"
              classNamePrefix="react-select"
              components={{ DropdownIndicator: null, Input }}
              placeholder={''}
              noOptionsMessage={() =>
                searchText
                  ? 'City not found, please select the closest city to you'
                  : 'Start typing to search for a city'
              }
              onInputChange={handleInputChange}
              inputValue={searchText}
              isLoading={loading}
              value={selectedCity}
              onChange={(newValue: any) => {
                setSelectedCity(newValue);
                setValue('city', newValue?.value, { shouldDirty: true });
              }}
              options={
                cities &&
                cities
                  .map((c: any) => ({
                    value: c.id,
                    label: c.regionCode
                      ? `${c.name}, ${c.regionCode}, ${c.country}`
                      : `${c.name}, ${c.country}`,
                    city: c.name,
                  }))
                  .sort((a: any, b: any) =>
                    a.city.length < b.city.length
                      ? -1
                      : a.city.toLowerCase().indexOf(searchText.toLowerCase()) <
                        b.city.toLowerCase().indexOf(searchText.toLowerCase())
                      ? 1
                      : -1
                  )
              }
              isClearable={true}
            /> */}
          </div>
        </div>
        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700"
          >
            Tagline
          </label>
          <div className="mt-1">
            <input
              {...register('tagline', { required: true })}
              type="text"
              autoComplete="none"
              maxLength={100}
              placeholder="What highlights best describe you?"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
