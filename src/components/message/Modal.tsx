import { Dialog, Transition } from '@headlessui/react';
import { MailIcon } from '@heroicons/react/outline';
import axios from 'axios';
import React, { Fragment, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import Link from '@/components/Link';

import { NEXT_URL } from '@/config/index';
import * as ga from '@/helpers/ga';

export interface IConnectModalProps {
  open: boolean;
  handleClose: any;
  profile?: any;
}

export interface IFormProps {
  body: string;
  to: string;
  toUser: string;
}

export default function ConnectModal(props: IConnectModalProps) {
  const { open, handleClose, profile } = props;
  const cancelButtonRef = useRef(null);
  const { loading, user } = useUser();

  const { register, handleSubmit, formState, reset } = useForm<IFormProps>({
    defaultValues: {
      body: '',
      to: profile.id,
      toUser: profile.user,
    },
  });
  const { isSubmitting, isDirty } = formState;
  const onSubmit: SubmitHandler<IFormProps> = async (data) => {
    try {
      await axios.post(`${NEXT_URL}/api/session/messages`, data);
      reset();
      handleClose(false);
      toast('Your message was sent');
      ga.event('message_request', {
        event_category: 'message',
        event_label: 'Message request sent',
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const renderForm = () => (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
    >
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <MailIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg font-semibold leading-6 text-gray-900"
          >
            Send {profile.firstName} a message
          </Dialog.Title>
          <div className="mt-3">
            <textarea
              {...register('body')}
              className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="I would like to connect because..."
              rows={2}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
          disabled={isSubmitting}
        >
          Send
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
          onClick={() => handleClose(false)}
          ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const renderGetPremium = () => (
    <div className="inline-block transform overflow-hidden rounded-lg text-left align-bottom shadow-xl transition-all sm:max-w-sm sm:align-middle md:max-w-2xl">
      <div className="bg-orange-600 md:grid md:grid-cols-2 md:gap-4">
        <div className="relative z-10 px-6 pt-10 pb-12 sm:px-10 sm:pt-10 md:py-16 md:px-16 md:pr-0">
          <div className="lg:self-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Start Your Free Trial Now!</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-orange-200">
              Unlock direct messages, advanced search features and other perks.
            </p>
            <Link
              href="/premium"
              className="mt-8 inline-flex items-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-orange-600 shadow hover:bg-orange-100"
            >
              Start Your Free Trial Now!
            </Link>
          </div>
        </div>
        <div className="aspect-w-5 aspect-h-3 -mt-40 md:-mt-6 md:aspect-w-2 md:aspect-h-1">
          <img
            className="translate-x-24 translate-y-4 transform rounded-md object-cover object-left-top md:translate-x-2 md:translate-y-12"
            src="/assets/images/smart.svg"
            alt="App screenshot"
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div className="flex items-center justify-center py-20">
            <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-600"></div>
          </div>
        </div>
      );
    }
    if (!user || user.role?.type !== 'premium') {
      return renderGetPremium();
    }
    return renderForm();
  };

  if (!profile) return null;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {renderContent()}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
