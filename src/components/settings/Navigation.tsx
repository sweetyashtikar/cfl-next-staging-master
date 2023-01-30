import { CreditCardIcon, UserCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

import Link from '@/components/Link';

import { classNames } from '@/helpers/index';

export default function SettingsNavigation({ user, children }: any) {
  const router = useRouter();

  const navigation =
    user?.advisor_profile != null
      ? [
          {
            name: 'Profile',
            href: '/settings/profile',
            icon: UserCircleIcon,
            current: router.asPath === '/settings/profile',
          },
          {
            name: 'Advisor Profile',
            href: '/settings/advisor-profile',
            icon: UserCircleIcon,
            current: router.asPath === '/settings/advisor-profile',
          },
          {
            name: 'Plan & Billing',
            href: '/settings/billing',
            icon: CreditCardIcon,
            current:
              router.asPath === '/settings/billing' ||
              router.asPath === '/settings/cancel-profile' ||
              router.asPath === '/settings/request-refund',
          },
        ]
      : [
          {
            name: 'Profile',
            href: '/settings/profile',
            icon: UserCircleIcon,
            current: router.asPath === '/settings/profile',
          },
          // {
          //   name: 'Password',
          //   href: '/settings/password',
          //   icon: KeyIcon,
          //   current: router.asPath === '/settings/password',
          // },
          {
            name: 'Plan & Billing',
            href: '/settings/billing',
            icon: CreditCardIcon,
            current:
              router.asPath === '/settings/billing' ||
              router.asPath === '/settings/cancel-profile' ||
              router.asPath === '/settings/request-refund',
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
