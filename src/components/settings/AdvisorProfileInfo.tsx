import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useCityByID } from '@/hooks/useCitySearch';

import { NEXT_URL } from '@/config';

import SelectInput from './SelectInput';

interface IPageProps {
  user?: any;
}

export interface IFormProps {
  firstName: string;
  lastName: string;
  title: string;
  companyName: string;
  website: string;
  city: string;
  professionalBackground: string;
  topics: string;
  otherAreas: string;
}

// TODO: implement default city
export default function ProfileInfo({ user }: IPageProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState,
    formState: { errors },
    reset,
  } = useForm<IFormProps>({
    defaultValues: {
      firstName: user?.advisor_profile?.firstName,
      lastName: user?.advisor_profile?.lastName,
      title: user?.advisor_profile?.title,
      companyName: user?.advisor_profile?.companyName,
      website: user?.advisor_profile?.website,
      city: user?.advisor_profile?.city,
      professionalBackground: user?.advisor_profile?.professionalBackground,
      topics: user?.advisor_profile?.topics,
      otherAreas: user?.advisor_profile?.otherAreas,
    },
  });
  const { data: advisorCity } = useCityByID(user?.advisor_profile?.city);
  const [selectedCity, setSelectedCity] = useState({
    value: '',
    label: '',
    city: '',
  });
  const { isSubmitting, isDirty } = formState;
  const onSubmit: SubmitHandler<IFormProps> = async (updateData) => {
    try {
      await axios({
        method: user.advisor_profile ? 'PUT' : 'POST',
        url: `${NEXT_URL}/api/session/advisor-profiles/` + user.advisor_profile,
        data: updateData,
      });
      reset(updateData);
      toast('Great! Your profile information was saved successfully');
      // router.reload();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (advisorCity != undefined) {
    if (
      selectedCity?.value == '' &&
      selectedCity?.label == '' &&
      selectedCity?.city == ''
    ) {
      let selectedOption = {
        value: advisorCity[0]?.id,
        label: advisorCity[0]?.regionCode
          ? advisorCity[0]?.name +
            ', ' +
            advisorCity[0]?.regionCode +
            ', ' +
            advisorCity[0]?.country
          : advisorCity[0]?.name + ', ' + advisorCity[0]?.country,
        city: advisorCity[0]?.name,
      };
      setSelectedCity(selectedOption);
    }
  }

  register('city', { required: true });

  const setTheCity = (city: any) => {
    setValue('city', city, { shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* @ts-ignore */}
      {/* <undock-scheduling-modal participant-email="dima@undock.com" participant-name="Dima Kolodko" text="Schedule a meeting" target="https://dev.undock.com/partner/profile/artem/t/demo?profileUrl=artem&integrationId=61168199348abc03fb0a1747" bg-color="black" text-color="white" ></undock-scheduling-modal> */}
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Advisor Information
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
              {errors?.firstName?.type == 'required' && (
                <p className="text-sm text-red-600">
                  {'First name is required'}
                </p>
              )}
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
              {errors?.lastName?.type == 'required' && (
                <p className="text-sm text-red-600">
                  {'Last name is required'}
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
              {errors?.city?.type == 'required' && (
                <p className="text-sm text-red-600">{'City is required'}</p>
              )}
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                {...register('companyName', { required: false })}
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors?.companyName?.type == 'required' && (
                <p className="text-sm text-red-600">
                  {'Company Name is required'}
                </p>
              )}
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Website
              </label>
              <input
                {...register('website', {
                  required: false,
                  // pattern: {
                  //   value:
                  //     /http(s)?:\/\/([\w]+\.)?[a-z0-9\.-]\.[a-zA-Z0-9_-]+\/?/,
                  //   message:
                  //     'Please enter a valid website url.',
                  // }
                })}
                type="text"
                autoComplete="company-website"
                placeholder="https://example.com"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors?.website?.type == 'required' && (
                <p className="text-sm text-red-600">{'Website is required'}</p>
              )}
              {errors?.website?.type == 'pattern' && (
                <p className="text-sm text-red-600">
                  {errors?.website?.message}
                </p>
              )}
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                {...register('title', { required: true })}
                type="text"
                autoComplete="none"
                maxLength={100}
                placeholder="Title"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors?.title?.type == 'required' && (
                <p className="text-sm text-red-600">{'Title is required'}</p>
              )}
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Professional Background
              </label>
              <textarea
                {...register('professionalBackground', { required: true })}
                autoComplete="none"
                maxLength={100}
                placeholder="Professional Background"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors?.professionalBackground?.type == 'required' && (
                <p className="text-sm text-red-600">
                  {'Professional Background is a required field'}
                </p>
              )}
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Topics I can help you with
              </label>
              <textarea
                {...register('topics', { required: true })}
                autoComplete="none"
                maxLength={100}
                placeholder="Topics I can help you with"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors?.topics?.type == 'required' && (
                <p className="text-sm text-red-600">
                  {'Topics is a required field'}
                </p>
              )}
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Other areas I can help you with
              </label>
              <textarea
                {...register('otherAreas', { required: false })}
                autoComplete="none"
                maxLength={100}
                placeholder="Other Areas I can help you with"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors?.otherAreas?.type == 'required' && (
                <p className="text-sm text-red-600">
                  {'Other Areas is a required field'}
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
