import React from 'react' 
import { getRevenueData } from '../../lib/data';

export default async function RevenuePage() {
  const { revenues, totalRevenue } = await getRevenueData();

  
  return (
    <div className="revenue-dashboard">
      <h1>Revenue Dashboard</h1>
      
      {/* Summary Card */}
      <div className="summary-card">
        <h2>Total Revenue</h2>
        <p className="total-amount">{totalRevenue}</p>
      </div>

      {/* Revenue Table */}
      <table className="revenue-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {revenues.map((item) => (
            <tr key={item.id}>
              <td>{item.month}</td>
              <td>${item.revenue_amount.toLocaleString()}</td>
              <td className='py-2 px-4 border flex gap-2'>
                <button type="submit" className='bg-gray-500 text-white px-3 py-1 rounded'>Edit</button>
                <button type="submit" className='bg-red-500 text-white px-3 py-1 rounded'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Optional Chart - would need a charting library */}
      {/* <RevenueChart data={revenues} /> */}
    </div>
  );
}
