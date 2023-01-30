import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import * as Accordion from '@radix-ui/react-accordion';
import { useRouter } from 'next/router';

import Link from '@/components/Link';

export interface IComponentProps {
  course: any;
}

export default function Component({ course }: IComponentProps) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <nav aria-label="Sidebar">
      <Accordion.Root
        type="multiple"
        defaultValue={(() => {
          if (slug) {
            return [
              course.modules?.find((x: any) => x._id === slug[0])
                .parent as string,
            ];
          }
          return course.modules
            ?.filter((x: any) => !x.parent)
            .map((x: any) => x._id) as string[];
        })()}
        className="divide-y divide-gray-200"
      >
        {course.modules
          ?.filter((item: any) => !item.parent)
          .map((module: any) => (
            <Accordion.Item value={module.id} key={module.id} className="py-3">
              <Accordion.Header>
                <Accordion.Trigger className="group w-full">
                  <div className="flex items-start">
                    <div className="flex-1 flex-grow text-left text-lg font-medium text-gray-900">
                      {module.title}
                    </div>
                    <ChevronDownIcon className="ml-2 mt-1 h-5 w-5 transform group-radix-state-open:rotate-180" />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="flex flex-col space-y-1 pt-4">
                {course.modules
                  ?.filter((item: any) => item.parent === module.id)
                  .map((lecture: any) => (
                    <Link
                      key={lecture.id}
                      href={`/accelerator/${lecture.id}`}
                      className="group py-2 pl-3 pr-1 hover:bg-gray-200"
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="mr-2 h-4 w-4 text-blue-600"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          {slug && slug[0] === lecture.id ? (
                            <path
                              fill="currentColor"
                              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-3a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
                            />
                          ) : (
                            <path
                              fill="currentColor"
                              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                            />
                          )}
                        </svg>
                        <div className="flex-1 flex-grow text-left text-gray-600 group-hover:text-blue-600">
                          {lecture.title}
                        </div>
                        <ChevronRightIcon className="ml-2 h-4 w-4 text-gray-400" />
                      </div>
                    </Link>
                  ))}
              </Accordion.Content>
            </Accordion.Item>
          ))}
      </Accordion.Root>
    </nav>
  );
}
