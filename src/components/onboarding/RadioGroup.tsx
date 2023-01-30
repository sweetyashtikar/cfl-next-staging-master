import { RadioGroup } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useSessionFetch from '@/hooks/useSessionFetch';

import { NEXT_URL } from '@/config/index';
import { classNames } from '@/helpers/index';

interface IPageProps {
  user?: any;
  nextStep?: string;
  documentKey: string;
  optionsFetchKey: string;
  multiselect?: boolean;
  successMessage?: string;
  buttonText?: string;
}

export default function RadioGroupPage({
  user,
  nextStep,
  documentKey,
  optionsFetchKey,
  multiselect,
  successMessage,
  buttonText,
}: IPageProps) {
  multiselect = !!multiselect;

  const [options, setOptions] = useState<any[]>([]);
  const { data: onboardingData } = useSessionFetch(
    optionsFetchKey ? 'onboarding' : null
  );
  useEffect(() => {
    if (optionsFetchKey && onboardingData) {
      const apiOptions = onboardingData[optionsFetchKey].map((o: any) => ({
        name: o.name,
      }));
      setOptions(apiOptions);
    }
  }, [onboardingData, optionsFetchKey]);

  const router = useRouter();

  // const defaultValue = user[`${documentKey}`]
  //   ? { name: user[`${documentKey}`] }
  //   : {};
  const [selected, setSelected] = useState<any>();
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const isSelected = (value: any) => {
    return selectedOptions.find((el) => el === value) ? true : false;
  };

  const handleDeselect = (value: any) => {
    const selectedOptionsUpdated = selectedOptions.filter((el) => el !== value);
    setSelectedOptions(selectedOptionsUpdated);
  };

  const handleSelect = (value: any) => {
    if (!isSelected(value) && options) {
      const selectedOptionsUpdated = [
        ...selectedOptions,
        options.find((el) => el === value),
      ];
      setSelectedOptions(selectedOptionsUpdated);
    } else {
      handleDeselect(value);
    }
  };

  const updateUser = async () => {
    setUploading(true);
    const hasData = multiselect ? selectedOptions.length > 0 : selected;
    if (hasData) {
      try {
        const saveData: any = {};
        saveData[`${documentKey}`] = multiselect
          ? selectedOptions.map((o: any) => o.name)
          : selected?.name;

        await axios({
          method: 'PUT',
          url: `${NEXT_URL}/api/session/profiles/me`,
          data: saveData,
        });

        router.push(nextStep || '/onboarding');
        toast(successMessage || 'Your information was saved successfully');
      } catch (e: any) {
        toast.error(e.message);
        setUploading(false);
      }
    } else {
      toast.error('Please select at least one option');
      setUploading(false);
    }
  };

  useEffect(() => {
    if (selected) {
      updateUser();
    }
  }, [selected]);

  return (
    <div className="w-full">
      <RadioGroup
        value={selected}
        onChange={multiselect ? handleSelect : setSelected}
      >
        <RadioGroup.Label className="sr-only">Select option</RadioGroup.Label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {options &&
            options.map((option) => {
              return (
                <RadioGroup.Option
                  key={option.name}
                  value={option}
                  className="relative block cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-4 shadow-sm hover:border-gray-400 focus:outline-none sm:flex sm:justify-between"
                >
                  {({ checked }) => {
                    const sel = multiselect ? isSelected(option) : checked;
                    return (
                      <>
                        <RadioGroup.Label
                          as="p"
                          className="font-medium text-gray-900"
                        >
                          {option.name}
                        </RadioGroup.Label>
                        <div
                          className={classNames(
                            sel ? 'border-blue-500' : 'border-transparent',
                            'pointer-events-none absolute -inset-px rounded-lg border-2'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    );
                  }}
                </RadioGroup.Option>
              );
            })}
        </div>
      </RadioGroup>

      {multiselect && (
        <div>
          <button
            type="submit"
            onClick={updateUser}
            disabled={
              uploading ||
              !(multiselect ? selectedOptions.length > 0 : selected)
            }
            className="mt-6 flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
          >
            {buttonText || 'Save'}
          </button>
        </div>
      )}
    </div>
  );
}
