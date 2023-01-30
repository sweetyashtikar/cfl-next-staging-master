import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { NEXT_URL } from '@/config/index';
import {
  createObject,
  getObjectID,
  partialUpdateObject,
} from '@/pages/api/algolia/algolia';

interface IPageProps {
  user?: any;
}

export interface IFormProps {
  public: boolean;
}

export default function ProfileSummary({ user }: IPageProps) {
  const router = useRouter();

  const { register, handleSubmit, control, formState } = useForm<IFormProps>({
    defaultValues: {
      public: user?.profile?.public,
    },
  });

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Profile Settings
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose how your profile is presented
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-5">
              <fieldset className="space-y-5">
                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <Controller
                      control={control}
                      name="public"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <input
                          id="settings-public"
                          aria-describedby="settings-public-description"
                          type="checkbox"
                          onBlur={onBlur}
                          onChange={onChange}
                          checked={value}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      )}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="settings-public"
                      className="font-medium text-gray-700"
                    >
                      Public
                    </label>
                    <p
                      id="settings-public-description"
                      className="text-gray-500"
                    >
                      Your profile is visible in search and when accessing via
                      direct link.
                    </p>
                  </div>
                </div>
              </fieldset>
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
