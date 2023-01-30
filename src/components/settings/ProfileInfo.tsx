import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { components, InputActionMeta } from 'react-select';
import { toast } from 'react-toastify';

import useCitySearch, { useCityByID } from '@/hooks/useCitySearch';

import Listbox from '@/components/Listbox';

import { NEXT_URL } from '@/config/index';

import SelectInput from './SelectInput';
import {
  createObject,
  getObjectID,
  partialUpdateObject,
} from '../../pages/api/algolia/algolia';

interface IPageProps {
  user?: any;
}

export interface IFormProps {
  firstName: string;
  lastName: string;
  pronouns: string;
  city: string;
  tagline: string;
  email: string;
  linkedinUrl: string;
  twitterUrl: string;
}

const Input = (props: any) => {
  return <components.Input {...props} autoComplete={'nope'} />;
};

// TODO: implement default city
export default function ProfileInfo({ user }: IPageProps) {
  const router = useRouter();

  //Algolia Update Client API
  const updateAlgoliaProfile = async (id: string, data: object) => {
    const objectID: string = await getObjectID(id);

    if (!objectID) {
      user.profile.connections = [];
      const newObjectID: string = await createObject(user.profile);
    } else {
      await partialUpdateObject(objectID, data);
    }
  };

  const [pronouns, setPronouns] = useState(
    user?.profile?.pronouns
      ? { value: user?.profile?.pronouns, label: user?.profile?.pronouns }
      : null
  );
  const [email, setEmail] = useState(user?.email ? user?.email : null);
  const [changeEmailToken, setchangeEmailToken] = useState(
    user?.changeEmailToken ? user?.changeEmailToken : null
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

  const {
    register,
    handleSubmit,
    setValue,
    formState,
    formState: { errors },
    reset,
  } = useForm<IFormProps>({
    defaultValues: {
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      pronouns: user?.profile?.pronouns,
      tagline: user?.profile?.tagline,
      city: user?.profile?.city,
      email: user.email,
      linkedinUrl: user?.profile?.linkedinUrl,
      twitterUrl: user?.profile?.twitterUrl,
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
      //Getting ObjectID and Updating Data to Algolia
      updateAlgoliaProfile(user.id, updateData);

      toast('Great! Your profile information was saved successfully');
      router.reload();
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Tell us a few details about you
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                {...register('firstName', { required: true })}
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                {...register('lastName', { required: true })}
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Pronouns
              </label>
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
                  {
                    value: "Don't_want_to_share",
                    label: "Don't Want To Share",
                  },
                ]}
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                {...register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 disabled:bg-gray-200 disabled:text-gray-500 sm:text-sm"
              />
              {changeEmailToken && (
                <p className="text-sm text-red-600">
                  Please verify this Email ID, check inbox for verification
                  Email.
                </p>
              )}
              {formState?.errors?.email?.type == 'required' && (
                <p className="text-sm text-red-600">Email is required</p>
              )}
              {formState?.errors?.email?.type == 'pattern' && (
                <p className="text-sm text-red-600">
                  Please enter a valid Email
                </p>
              )}
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
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
                        : a.city
                            .toLowerCase()
                            .indexOf(searchText.toLowerCase()) <
                          b.city.toLowerCase().indexOf(searchText.toLowerCase())
                        ? 1
                        : -1
                    )
                }
                isClearable={true}
              /> */}
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Tagline
              </label>
              <input
                {...register('tagline', { required: true })}
                type="text"
                autoComplete="none"
                maxLength={100}
                placeholder="What highlights best describe you?"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors?.tagline?.type == 'required' && (
                <p className="text-sm text-red-600">
                  {'Profile tagline is required'}
                </p>
              )}
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Linkedin Url
              </label>
              <input
                {...register('linkedinUrl', {
                  required: false,
                  pattern: {
                    value:
                      /http(s)?:\/\/([\w]+\.)?linkedin\.com\/[a-zA-Z0-9_-]+\/?/,
                    message:
                      'Please enter a valid Linkedin url eg. (https://linkedin.com/<slug>)',
                  },
                })}
                type="text"
                autoComplete="none"
                maxLength={100}
                placeholder="Linkedin Url ie. (https://linkedin.com/)"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors?.linkedinUrl?.type == 'required' && (
                <p className="text-sm text-red-600">
                  {'Linkedin profile url is required'}
                </p>
              )}
              {errors?.linkedinUrl?.type == 'pattern' && (
                <p className="text-sm text-red-600">
                  {errors?.linkedinUrl?.message}
                </p>
              )}
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Twitter Url
              </label>
              <input
                {...register('twitterUrl', {
                  required: false,
                  pattern: {
                    value:
                      /http(s)?:\/\/([\w]+\.)?twitter\.com\/[a-zA-Z0-9_-]+\/?/,
                    message:
                      'Please enter a valid twitter url eg. (https://twitter.com/<slug>)',
                  },
                })}
                type="text"
                autoComplete="none"
                maxLength={100}
                placeholder="Twitter Url ie. (https://twitter.com/)"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors?.twitterUrl?.type == 'required' && (
                <p className="text-sm text-red-600">
                  {'Twitter profile url is required'}
                </p>
              )}
              {errors?.twitterUrl?.type == 'pattern' && (
                <p className="text-sm text-red-600">
                  {errors?.twitterUrl?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
