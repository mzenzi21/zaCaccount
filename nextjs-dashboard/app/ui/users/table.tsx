import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/users/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { fetchInvoicesWithCustomers, ITEMS_PER_PAGE } from '@/app/lib/invoice/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { data: invoices, totalPages } = await fetchInvoicesWithCustomers(query, currentPage);
  // Debug: Check what data you're receiving
  console.log('Table component received:', invoices);
  // Calculate pagination display values
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, invoices.length);
  const totalItems = totalPages * ITEMS_PER_PAGE;

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={invoice.customer_image}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.customer_name}'s profile picture`}
                      /> */}
                      <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {(invoice.customer_firstname?.[0] || '') + (invoice.customer_lastname?.[0] || '') || '?'}
                            </span>
                      </div>
                      <p>{invoice.customer_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.customer_email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      ${invoice.amount.toFixed(2)}
                    </p>
                    <p>{new Date(invoice.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={invoice.customer_image}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.customer_name}'s profile picture`}
                      /> */}
                      <p>{invoice.customer_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.customer_email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href={`?page=${Math.max(1, currentPage - 1)}`}
                className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Previous
              </a>
              <a
                href={`?page=${Math.min(totalPages, currentPage + 1)}`}
                className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startItem}</span> to{' '}
                  <span className="font-medium">{endItem}</span> of{' '}
                  <span className="font-medium">{totalItems}</span> results
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`?page=${Math.max(1, currentPage - 1)}`}
                  className={`relative inline-flex items-center rounded px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Previous
                </a>
                <a
                  href={`?page=${Math.min(totalPages, currentPage + 1)}`}
                  className={`relative inline-flex items-center rounded px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}