import { CalendarIcon } from '@heroicons/react/outline';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import useUser from '@/hooks/useUser';

import Loader from '@/components/common/Loader';

import { API_URL } from '@/config';

interface IUpcomingEvents {
  isLarge?: boolean;
}

interface IEvents {
  location: string;
  id: string | number;
  title: string;
  body: string;
  slug: string;
  url?: string;
  startDate: string;
}

const UpcomingEvents = (props: IUpcomingEvents) => {
  const { isLarge = false } = props;
  const { loggedOut } = useUser();

  const [events, setEvents] = useState<IEvents[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios(
          `${API_URL}/events?_sort=startDate:ASC&_limit=3&startDate_gte=${new Date().toISOString()}`
        );
        setEvents(response.data as IEvents[]);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="rounded-xl border bg-white py-3">
      <div className="flex  items-center justify-between border-b-2 px-6 pb-3">
        <span className="md:text-2sm text-sm font-bold text-GrayScale">
          Upcoming Events
        </span>
        {!loggedOut && events?.length > 0 && !isLoading && (
          <Link href="/events" target="blank">
            <small className="cursor-pointer  font-[500] text-primaryBlue">
              See All
            </small>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="mt-4 mb-2">
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        </div>
      ) : (
        <>
          {!loggedOut && events?.length > 0 ? (
            <div className="p-6 pb-0">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="mb-4 cursor-pointer rounded-lg bg-gray-100 p-3"
                >
                  <>
                    {console.log(event.url)}
                    <div
                      className={`flex ${
                        isLarge
                          ? 'gap-3 md:flex-col lg:flex-row xl:gap-5'
                          : 'flex-col gap-2'
                      }`}
                    >
                      <div className="h-8 w-8 xl:h-14 xl:w-14">
                        <CalendarIcon
                          className="h-8 w-8 text-blue-400 xl:h-14 xl:w-14"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <span className="heading-text block pt-1 text-xs font-medium xl:text-sm">
                          {event.title}
                        </span>
                        <small className="body-text text-xs">
                          {moment(event.startDate).format(
                            'MMMM Do YYYY, h:mm A z'
                          )}
                        </small>
                      </div>
                    </div>
                    <Link
                      href={
                        loggedOut
                          ? '/login'
                          : event.url ||
                            event.location ||
                            `/events/${event.slug}`
                      }
                    >
                      <a
                        className="mt-2 block w-full rounded-2xl border border-blue-400 py-1 px-4 text-center text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Add to calendar
                      </a>
                    </Link>
                  </>
                </div>
              ))}
            </div>
          ) : (
            <h3 className="text-md mt-4 mb-2 text-center font-normal text-gray-500">
              No events found
            </h3>
          )}
        </>
      )}
    </div>
  );
};

export default UpcomingEvents;
