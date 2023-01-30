import { MailIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Layout, Meta } from '@/components/layout';

import { API_URL } from '@/config/index';

export interface IFormProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const { register, handleSubmit, setValue, reset, formState } =
    useForm<IFormProps>({
      defaultValues: {},
    });
  const { isSubmitting, isDirty } = formState;
  const onSubmit: SubmitHandler<IFormProps> = async (postData) => {
    try {
      await axios.post(`${API_URL}/contacts`, postData);

      toast('Your message was sent');
      reset();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Layout
      meta={
        <Meta
          title="Contact - CoFoundersLab"
          description="Contact CoFoundersLab, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
    >
      <div className="relative h-full border-t border-b border-gray-200 bg-white">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
        </div>
        <div className="relative mx-auto h-full max-w-7xl lg:grid lg:grid-cols-5">
          <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="mx-auto max-w-lg">
              {/* <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <h2 className="inline-block px-3 py-px mb-2 text-sm font-semibold tracking-wider text-white uppercase rounded-full bg-blue-600">
                  Get in touch
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  CoFoundersLab
                </p>
              </div> */}
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Get in touch
              </h2>
              <p className="mt-6 text-lg leading-6 text-gray-500">
                Need help? Get in touch with one of our teams.
              </p>

              <dl className="mt-8 text-base text-gray-500">
                <div>
                  <dt className="sr-only">Postal address</dt>
                  <dd>
                    {/* <a href="https://www.google.com/maps/dir//1925+Century+Park+East,+16th+Floor++Los+Angeles,+CA+90067,+USA/">
                      <img
                        src="/assets/images/staticmap.png"
                        alt="CoFoundersLab"
                      />
                    </a> */}
                    <p> 1925 Century Park East, 16th Floor</p>
                    <p>Los Angeles, CA 90067, USA</p>
                  </dd>
                </div>
                <div className="mt-6">
                  <dt className="sr-only">Phone number</dt>
                  <dd className="flex">
                    {/* <PhoneIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    /> */}
                    {/* <span className="ml-3">+1 (646) 547-1215</span> */}
                  </dd>
                </div>
                <div className="mt-3">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex">
                    <MailIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">contact@cofounderslab.com</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="h-full bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            <div className="mx-auto max-w-lg lg:max-w-none">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-y-6"
              >
                <div>
                  <label htmlFor="full-name" className="sr-only">
                    Full name
                  </label>
                  <input
                    {...register('name', { required: true })}
                    type="text"
                    placeholder="Full name *"
                    autoComplete="name"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    placeholder="Email *"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    {...register('phone', { required: true })}
                    type="text"
                    placeholder="Phone"
                    autoComplete="phone"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    {...register('message', { required: true })}
                    rows={4}
                    placeholder="Message *"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-500">* Required fields</p>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isDirty}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
