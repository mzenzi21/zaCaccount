import React from 'react' 
import { getRevenueData, getRevenueById } from '../../lib/revenue/data';
import Link from 'next/link';

export default async function RevenuePage() {
  const { revenues, totalRevenue } = await getRevenueData();

  const revenueId = "Icq6m4woCYtBgKbD69Sa";
  

  const var_revenue = (await getRevenueById(revenueId)) || {
    id: revenueId,
    month: "N/A",
    date: "N/A",
    createdAt: new Date(0),
    revenue_amount: 0,
  };
  

  return (
    <div className="revenue-dashboard">
      <h1>Revenue Dashboard</h1>
      
      {/* Summary Card */}
      <div className="summary-card">
        <h2>Total Revenue</h2>
        <p className="total-amount">${totalRevenue}</p>
      </div>

      {/* Revenue Table */}
      <table className="revenue-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue</th>
            { <th>date</th>}
            <th className='py-2 px-4 border flex gap-6'>Actions
            <button type="submit" className='bg-green-500 text-white px-3 py-1 rounded'>
              <Link
              href="/dashboard/revenue/create"
              >
               Create Revenue
            </Link>
            </button>
            </th>
          </tr>
        </thead>
        <tbody>
        {revenues.map((item) => (
            <tr key={item.id}>
              <td>{item.month}</td>
              <td>${item.revenue_amount.toLocaleString()}</td>
              <td>{item.date}</td>
              <td className='py-2 px-4 border flex gap-2'>
                <button type="submit" className='bg-gray-500 text-white px-3 py-1 rounded'>Edit</button>
                <button type="submit" className='bg-red-500 text-white px-3 py-1 rounded'>Delete</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      

    
       {/* <h1>{var_revenue.revenue_amount}</h1>
       <h1>{var_revenue.month}</h1> */}
      
      {/* Optional Chart - would need a charting library */}
      {/* <RevenueChart data={revenues} /> */}
    </div>
  );
}
