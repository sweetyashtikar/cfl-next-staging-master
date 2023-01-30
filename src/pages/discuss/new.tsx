import { InformationCircleIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select, { InputActionMeta } from 'react-select';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import DiscussPage from '@/components/discuss/Page';
import { Layout, Meta } from '@/components/layout';
import Link from '@/components/Link';

import { API_URL, NEXT_URL } from '@/config/index';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface IFormProps {
  title: string;
  body: string;
  topics: string[];
}

export default function Discuss() {
  const router = useRouter();

  const [optionsTopics, setOptionsTopics] = useState([]);
  const [topicsInputText, setTopicsInputText] = useState('');
  const [topicsValue, setTopicsValue] = useState([]);

  const { data: loadTopics, error: topicsError } = useSWR(
    `${API_URL}/discussion-topics?_sort=name`,
    fetcher
  );

  useEffect(() => {
    if (loadTopics && !topicsError) {
      setOptionsTopics(
        loadTopics.map((o: any) => ({
          value: o.id,
          label: o.name,
        }))
      );
    }
  }, [loadTopics, topicsError]);

  const { register, handleSubmit, setValue, formState } = useForm<IFormProps>({
    defaultValues: {},
  });
  const { isSubmitting, isDirty } = formState;
  const onSubmit: SubmitHandler<IFormProps> = async (postData) => {
    try {
      const { data: post }: any = await axios.post(
        `${NEXT_URL}/api/session/discussions`,
        postData
      );

      toast('Your post was submitted');
      router.push(`/discuss/${post.slug}`);
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <Layout
      meta={
        <Meta
          title="Ask a question - Discuss - CoFoundersLab"
          description="Ask a question on CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <DiscussPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:rounded-lg">
            <div className="space-y-6 bg-white py-6 px-4 sm:rounded-t-lg sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Ask your question
                </h3>
              </div>

              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon
                      className="h-5 w-5 text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <div className="prose-sm text-sm text-blue-700">
                      <p>
                        We are excited to have you as part of the CoFoundersLab
                        community. To make sure you get the most out of this
                        community discussion tool, here are a few guidelines:
                      </p>
                      <ul>
                        <h5>
                          <b>Highly encouraged</b>
                        </h5>
                        <li>- Post questions related to entrepreneurship.</li>
                        <li>
                          - Check to make sure your question hasn&apos;t been
                          posted already.
                        </li>
                        <li>- Connect with other community members.</li>
                      </ul>
                      <ul>
                        <h5>
                          <b>Not allowed</b>
                        </h5>
                        <li>
                          - Soliciting a CoFounder, adviser, or team member.
                          That&apos;s what the{' '}
                          <Link href="/search" rel="noopener noreferrer">
                            Connect
                          </Link>{' '}
                          section is for.
                        </li>
                        <li>
                          - Promote yourself, your services or solicit business
                          [directly/indirectly].
                        </li>
                        <li>- Post vague questions.</li>
                        <li>- Post questions without description.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-blue-100 p-1.5 text-blue-500 hover:bg-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50"
                      >
                        <span className="sr-only">Dismiss</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="title"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    {...register('title', { required: true })}
                    type="text"
                    placeholder="Ask on CoFoundersLab Discuss"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="body"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Body
                  </label>
                  <textarea
                    {...register('body', { required: true })}
                    autoComplete="none"
                    rows={6}
                    placeholder="Provide additional context and details to help the community understand your question..."
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 ">
                  <label
                    htmlFor="topics"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Topics
                  </label>

                  <Select
                    instanceId="topics"
                    isMulti={true}
                    classNamePrefix="react-select"
                    placeholder={'Search for topics'}
                    noOptionsMessage={() =>
                      topicsInputText
                        ? 'Skill not found'
                        : 'Start typing to search for topics'
                    }
                    inputValue={topicsInputText}
                    value={topicsValue}
                    onInputChange={(
                      newValue: any,
                      actionMeta: InputActionMeta
                    ) => {
                      if (
                        actionMeta.action !== 'input-blur' &&
                        actionMeta.action !== 'menu-close'
                      ) {
                        setTopicsInputText(newValue);
                      }
                    }}
                    onChange={(newValue: any) => {
                      setTopicsValue(newValue);
                      setValue(
                        'topics',
                        newValue.map((x: any) => x.value),
                        { shouldDirty: true }
                      );
                    }}
                    options={optionsTopics}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:rounded-b-lg sm:px-6">
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
              >
                Submit question
              </button>
            </div>
          </div>
        </form>
      </DiscussPage>
    </Layout>
  );
}
