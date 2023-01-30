import { useRouter } from 'next/router';

interface IPageProps {
  user?: any;
}

export default function ProfileRefund({ user }: IPageProps) {
  const router = useRouter();

  return (
    <>
      <div className="">
        <div className="rounded-md bg-white p-6 shadow md:items-center md:justify-between">
          <h2 className="py-2 px-2 pb-4 text-center font-sans text-xl font-bold">
            Request A Refund
          </h2>
          <iframe
            className="h-[40rem] w-full"
            src="https://jj60uc1m2ed.typeform.com/to/TMkYQiRQ"
            title="cancel profile"
          ></iframe>
        </div>
      </div>
    </>
  );
}
