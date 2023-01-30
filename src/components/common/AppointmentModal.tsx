import Script from 'next/script';

interface IProps {
  open: boolean;
  handleClose: () => void;
  bookingUrl?: string;
}

const AppointmentModal = (props: IProps) => {
  const { bookingUrl, open, handleClose } = props;

  return (
    <div
      id="defaultModal"
      tab-index="-1"
      aria-hidden="true"
      className={
        (open ? '' : 'hidden') +
        ' h-modal fixed top-0 right-0 left-0 z-50 w-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full'
      }
    >
      <div className="absolute left-[50%] top-[50%] h-full w-full max-w-7xl translate-x-[-50%] translate-y-[-50%] p-4 md:h-auto">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="flex items-start justify-between rounded-t p-4 pb-0">
            <button
              type="button"
              onClick={handleClose}
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <Script src="https://sdk.undock.com/ui-kit.js"></Script>
          <div className="space-y-6 p-6 pt-0">
            {bookingUrl && (
              // @ts-ignore
              <undock-settings-inline
                target={bookingUrl}
                use-shadow="false"
                border-radius="0"
                max-width="1280px"
                min-height="800px"
              >
                {/*@ts-ignore */}
              </undock-settings-inline>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
