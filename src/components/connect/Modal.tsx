import { Dialog, Transition } from '@headlessui/react';
import { LinkIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { Fragment, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { NEXT_URL } from '@/config/index';
import * as ga from '@/helpers/ga';

export interface IConnectModalProps {
  open: boolean;
  handleClose: any;
  profile?: any;
  setIsRequestSent?: any;
}

export interface IFormProps {
  message: string;
  profile: string;
}

export default function ConnectModal(props: IConnectModalProps) {
  const { open, handleClose, profile, setIsRequestSent } = props;
  const cancelButtonRef = useRef(null);

  const { register, handleSubmit, formState, reset } = useForm<IFormProps>({
    defaultValues: {
      message: '',
      profile: profile.id,
    },
  });
  const { isSubmitting, isDirty } = formState;
  const onSubmit: SubmitHandler<IFormProps> = async (data) => {
    try {
      await axios.post(`${NEXT_URL}/api/session/connections/connect`, data);
      reset();
      handleClose(false);
      toast('Your connection request was sent');
      ga.event('connection_request', {
        event_category: 'connection',
        event_label: 'Connection Requested',
      });
      if (setIsRequestSent) {
        setIsRequestSent(true);
      }
    } catch (e: any) {
      toast.warning(e.response?.data?.message || e.message);
    }
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
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
            >
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <LinkIcon
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Invite {profile.firstName} to connect
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text- text-gray-500">
                      CoFoundersLab members are more likely to respond when a
                      personal note is included
                    </p>
                  </div>
                  <div className="mt-3">
                    <textarea
                      {...register('message')}
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
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
