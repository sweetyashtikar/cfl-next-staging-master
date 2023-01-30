import {
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  ClipboardIcon,
  ClipboardListIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';

import Link from '@/components/Link';

import { classNames } from '@/helpers/index';

export default function ConnectionsNavigation({ children }: any) {
  const router = useRouter();

  const navigation = [
    {
      name: 'Accepted',
      href: '/connections',
      icon: ClipboardCheckIcon,
      current: router.asPath === '/connections',
    },
    {
      name: 'Pending',
      href: '/connections/pending',
      icon: ClipboardListIcon,
      current: router.asPath === '/connections/pending',
    },
    {
      name: 'Ignored',
      href: '/connections/ignored',
      icon: ClipboardIcon,
      current: router.asPath === '/connections/ignored',
    },
    {
      name: 'Sent',
      href: '/connections/sent',
      icon: ClipboardCopyIcon,
      current: router.asPath === '/connections/sent',
    },
  ];

  return (
    <nav className="space-y-1">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? 'bg-gray-50 text-blue-700 shadow hover:bg-white hover:text-blue-700'
              : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900 hover:shadow',
            'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
          )}
          aria-current={item.current ? 'page' : undefined}
        >
          <item.icon
            className={classNames(
              item.current
                ? 'text-blue-500 group-hover:text-blue-500'
                : 'text-gray-400 group-hover:text-gray-500',
              '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
            )}
            aria-hidden="true"
          />
          <span className="truncate">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
