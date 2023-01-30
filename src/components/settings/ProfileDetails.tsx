import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { components } from 'react-select';
import Select from 'react-select';
import { toast } from 'react-toastify';

import Listbox from '@/components/Listbox';

import { NEXT_URL } from '@/config/index';
import {
  createObject,
  getObjectID,
  partialUpdateObject,
} from '@/pages/api/algolia/algolia';

interface IPageProps {
  user?: any;
  onboardingData?: any;
}

export interface IFormProps {
  role: string;
  lookingFor: string;
  startupStage: string;
  skills: Array<string>;
  interests: Array<string>;
}

const Input = (props: any) => {
  return <components.Input {...props} autoComplete={'nope'} />;
};

export default function ProfileDetails({ user, onboardingData }: IPageProps) {
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

  const skillsOptions = onboardingData?.skills.map(
    (skill: Record<string, any>) => {
      return { value: skill.name, label: skill.name };
    }
  );
  const [role, setRole] = useState(
    user?.profile?.role
      ? { value: user?.profile?.role, label: user?.profile?.role }
      : null
  );

  const [lookingFor, setLookingFor] = useState(
    user?.profile?.lookingFor
      ? { value: user?.profile?.lookingFor, label: user?.profile?.lookingFor }
      : null
  );

  const [startupStage, setStartupStage] = useState(
    user?.profile?.startupStage
      ? {
          value: user?.profile?.startupStage,
          label: user?.profile?.startupStage,
        }
      : null
  );

  const [selectedSkills, setSelectedSkills] = useState(
    user?.profile?.skills
      ? user?.profile?.skills.map((skill: Record<string, any>) => {
          return { value: skill, label: skill };
        })
      : null
  );

  const [selectedInterests, setSelectedInterests] = useState(
    user?.profile?.interests
      ? user?.profile?.interests.map((interest: Record<string, any>) => {
          return { value: interest, label: interest };
        })
      : null
  );

  const { register, handleSubmit, setValue, formState, getValues } =
    useForm<IFormProps>({
      defaultValues: {
        role: user?.profile?.role,
        lookingFor: user?.profile?.lookingFor,
        startupStage: user?.profile?.startupStage,
        skills: user?.profile?.skills,
        interests: user?.profile?.interests,
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

  const handleSkillChange = (e: any) => {
    setSelectedSkills(e);

    setValue(
      'skills',
      e.map((skill: { value: string; label: string }) => skill.value),
      { shouldDirty: true }
    );
    console.log(getValues('skills'));
    // if (e. ) {
    //   newValue =
    //     selectedSkills != null
    //       ? [...selectedSkills, e.target.value]
    //       : [e.target.value];
    //   setSelectedSkills(newValue);
    // } else {
    //   newValue = selectedSkills?.filter((skill: string) => {
    //     return skill !== e.target.value;
    //   });
    //   setSelectedSkills(newValue);
    // }
    // setValue('skills', newValue, { shouldDirty: true });
  };

  const handleInterestsChange = (e: any) => {
    setSelectedInterests(e);
    setValue(
      'interests',
      e.map((interest: { value: string; label: string }) => interest.value),
      { shouldDirty: true }
    );
    console.log(getValues('interests'));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Professional Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Tell us about your professional experience
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <Listbox
                key="Role"
                value={role}
                onChange={(newValue) => {
                  setRole(newValue);
                  setValue('role', newValue?.value, { shouldDirty: true });
                }}
                placeholder="Your Role"
                options={onboardingData?.roles?.map((i: any) => {
                  return {
                    value: i.name,
                    label: i.name,
                  };
                })}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="lookingfor"
                className="block text-sm font-medium text-gray-700"
              >
                Looking For
              </label>
              <Listbox
                key="lookingfor"
                value={lookingFor}
                onChange={(newValue) => {
                  setLookingFor(newValue);
                  setValue('lookingFor', newValue?.value, {
                    shouldDirty: true,
                  });
                }}
                placeholder="Looking For"
                options={onboardingData?.lookingFor?.map((i: any) => {
                  return {
                    value: i.name,
                    label: i.name,
                  };
                })}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="businessInformation"
                className="block text-sm font-medium text-gray-700"
              >
                Current Business Stage
              </label>
              <Listbox
                key="businessInformation"
                value={startupStage}
                onChange={(newValue) => {
                  setStartupStage(newValue);
                  setValue('startupStage', newValue?.value, {
                    shouldDirty: true,
                  });
                }}
                placeholder="Select Business Stage"
                options={onboardingData?.startupStages?.map((i: any) => {
                  return {
                    value: i.name,
                    label: i.name,
                  };
                })}
              />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="skills"
                className="col-span-1 block text-sm font-medium text-gray-700"
              >
                Skills
              </label>
              <div className="mb-4 flex flex-wrap">
                <Select
                  options={skillsOptions}
                  isMulti
                  defaultValue={selectedSkills}
                  onChange={handleSkillChange}
                />
                {/* {onboardingData?.skills?.map((i: any) => {
                  return (
                    <label
                      key={i.name}
                      className="w-1/5 px-2 py-2 text-sm font-normal"
                    >
                      <input
                        key="interests"
                        type="checkbox"
                        value={i.name}
                        className="mr-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedSkills?.includes(i.name)}
                        onChange={handleSkillChange}
                      />{' '}
                      {i.name} &nbsp;&nbsp;
                    </label>
                  );
                })} */}
              </div>
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="Interests"
                className="col-span-1 block text-sm font-medium text-gray-700"
              >
                Interests
              </label>
              <div className="mb-5 flex flex-wrap">
                <Select
                  options={onboardingData?.interests.map(
                    (interest: { name: string }) => {
                      return { label: interest.name, value: interest.name };
                    }
                  )}
                  isMulti
                  onChange={handleInterestsChange}
                  defaultValue={selectedInterests}
                />
                {/* {onboardingData?.interests?.map((i: any) => {
                  return (
                    <label
                      key={i.name}
                      className="w-1/5 px-2 py-2 text-sm font-normal"
                    >
                      <input
                        key="skills"
                        type="checkbox"
                        value={i.name}
                        className="mr-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedInterests?.includes(i.name)}
                        onChange={handleInterestsChange}
                      />{' '}
                      {i.name} &nbsp;&nbsp;
                    </label>
                  );
                })} */}
              </div>
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
