import { useRouter } from 'next/router';
import qs from 'qs';
import useSWR from 'swr';

import CourseCard from '@/components/learn/CourseCard';

import { sessionGet } from '@/helpers/fetchers';

import { courses } from './data';
import NoCourseResults from './NoCourseResults';
import Error from '../common/Error';
import CourseSkeleton from '../search/SearchSkeleton';

const PAGE_SIZE = 12;

export default function CourseList() {
  const router = useRouter();
  const { page, ...params } = router.query;

  const offset = page ? (parseInt(page.toString()) - 1) * PAGE_SIZE : 0;
  const fetchUrl = `profiles/search?_sort=profilePicture:DESC,legacyProfilePicture:DESC,createdAt:DESC&_limit=${PAGE_SIZE}&_start=${offset}&${qs.stringify(
    params
  )}`; // TODO - Will update the URL later with the course API

  const { data, error } = useSWR(fetchUrl, sessionGet);

  if (!courses && !error) {
    return <CourseSkeleton />;
  }

  if (error) {
    return <Error />;
  }

  if (courses.length <= 0) {
    return <NoCourseResults />;
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
    >
      {courses.map((course: any) => (
        <li
          key={course.id}
          className="col-span-1 flex cursor-pointer flex-col divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <CourseCard course={course} />
        </li>
      ))}
    </ul>
  );
}
