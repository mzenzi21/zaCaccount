'use client';

import { usePathname } from 'next/navigation';

import {
  UserGroupIcon,
  UserIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  DocumentPlusIcon,
  PrinterIcon,
  CurrencyEuroIcon,
  DocumentChartBarIcon,
  TvIcon,
  BookOpenIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {name: 'Users',href: '/dashboard/users',icon: UserIcon},
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon},
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Inventory', href: '/dashboard/inventory', icon: DocumentPlusIcon},
  { name: 'CRM', href: '/dashboard/crm', icon: BookOpenIcon},
  { name: 'Reports', href: '/dashboard/reports', icon: PrinterIcon},
  { name: 'Expenses', href: '/dashboard/expenses', icon: CurrencyDollarIcon},
  { name: 'Products', href: '/dashboard/products', icon: TvIcon},
  { name: 'Analytics', href: '/dashboard/analytics', icon: DocumentChartBarIcon},

];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
