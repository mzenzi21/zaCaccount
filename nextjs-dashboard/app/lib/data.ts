import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

type Revenue = {
  id: string;
  month: string;
  revenue_amount: number;
};

export async function getRevenueData(): Promise<{
  revenues: Revenue[];
  totalRevenue: number;
}> {
  try {
    const querySnapshot = await getDocs(collection(db, "Revenue"));
    const revenues = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        month: data.month || '',
        revenue_amount: data.revenue_amount || data.revenue || 0
      };
    });
    
    const totalRevenue = revenues.reduce((sum, item) => sum + item.revenue_amount, 0);
    
    return { revenues, totalRevenue };
  } catch (error) {
    console.error('Failed to fetch revenue data:', error);
    throw error; // Or return default values
  }
}