import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { getCustomerData } from '@/app/lib/customer/data';
 
export default async function Page() {
   const customers = await getCustomerData();
   console.log('data receieved', customers);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />

      {<Form  />}
    </main>
  );
}