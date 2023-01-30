import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { components, InputActionMeta } from 'react-select';
import { toast } from 'react-toastify';

import useCitySearch from '@/hooks/useCitySearch';

import { NEXT_URL } from '@/config/index';

interface IPageProps {
  user?: any;
}

export interface IFormProps {
  password: string;
  passwordConfirmation: string;
}

const Input = (props: any) => {
  return <components.Input {...props} autoComplete={'nope'} />;
};

export default function PasswordUpdate({ user }: IPageProps) {
  const router = useRouter();

  const [pronouns, setPronouns] = useState(
    user?.profile?.pronouns
      ? { value: user?.profile?.pronouns, label: user?.profile?.pronouns }
      : null
  );
  const [searchText, setSearchText] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const { data: cities, loading } = useCitySearch(searchText);

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
    defaultValues: {},
  });
  const { isSubmitting, isDirty } = formState;
  const onSubmit: SubmitHandler<IFormProps> = async (updateData) => {
    try {
      await axios({
        method: user?.profile ? 'PUT' : 'POST',
        url: `${NEXT_URL}/api/session/profiles/me`,
        data: updateData,
      });

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
              Password Update
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Keep your password safe by updating it here
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                {...register('password', { required: true })}
                type="password"
                autoComplete="new-password"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
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
