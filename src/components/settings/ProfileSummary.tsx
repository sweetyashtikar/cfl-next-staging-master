import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { NEXT_URL } from '@/config/index';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { useEffect, useState } from 'react';

import 'react-quill/dist/quill.snow.css';

import {
  createObject,
  getObjectID,
  partialUpdateObject,
} from '@/pages/api/algolia/algolia';

interface IPageProps {
  user?: any;
}

export interface IFormProps {
  summary: string;
}

export default function ProfileSummary({ user }: IPageProps) {
  const router = useRouter();
  const [summaryLength, setSummaryLength] = useState(0);

  const { register, handleSubmit, setValue, formState } = useForm<IFormProps>({
    defaultValues: {
      summary: user?.profile?.summary,
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

  const { isSubmitting, isDirty, errors } = formState;
  const onSubmit: SubmitHandler<IFormProps> = async (updateData) => {
    try {
      setValue('summary', updateData.summary, { shouldDirty: true });
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

  useEffect(() => {
    register('summary', { required: true, minLength: 200 });
  }, []);

  const onEditorStateChange = (val: string) => {
    setValue('summary', val, { shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Summary
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information is displayed on your public profile page
            </p>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <ReactQuill
                value={user?.profile?.summary || ''}
                placeholder="Present yourself to our community"
                onChange={onEditorStateChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors?.summary?.type == 'minLength' && (
                <div className="text-red-600">
                  Minimum 200 characters required.
                </div>
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
