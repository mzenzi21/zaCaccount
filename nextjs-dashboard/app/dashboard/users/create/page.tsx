import Form from '@/app/ui/users/create-form';
import Breadcrumbs from '@/app/ui/users/breadcrumbs';
import { getCustomerData } from '@/app/lib/customer/data';
 
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'users', href: '/dashboard/users' },
          {
            label: 'Create User',
            href: '/dashboard/users/create',
            active: true,
          },
        ]}
      />

      {<Form  />}
    </main>
  );
}