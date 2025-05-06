import { db } from '../../config/firebase';
import { collection, doc, query, where,getDoc,getDocs, QuerySnapshot } from 'firebase/firestore';

type Revenue = {
  id: string;
  month: string;
  date: string;
  createdAt: Date;
  revenue_amount: number;
};
//Fetch all revenue data by getRevenueData
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
        date:data.date || "",
        createdAt: data.createdAt?.toDate() || new Date(0), // Convert Firestore Timestamp to Date
        revenue_amount: Number(data.revenue_amount || data.revenue || 0),
      };
    });

    const totalRevenue = revenues.reduce((sum, item) => sum + item.revenue_amount, 0);
    
    return { revenues, totalRevenue };
  } catch (error) {
    console.error('Failed to fetch revenue data:', error);
    throw error; // Or return default values
  }
}

//Function for fetching revenue by id
export async function getRevenueById(id: string): Promise<Revenue | null> {
  try {
    const docRef = doc(db, "Revenue", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        month: data.month || '',
        date: data.date || '',
        createdAt: data.createdAt?.toDate() || new Date(0), // Convert Firestore Timestamp to Date
        revenue_amount: data.revenue_amount || data.revenue || 0
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error('Error fetching revenue by ID:', error);
    throw error; // Or return null
  }
}

//fetch Revenue by month
export async function getRevenueByMonth(month: string): Promise<Revenue[]> {
  try {
    const q = query(collection(db, "Revenue"), where("month", "==", month));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      month: doc.data().month || '',
      date: doc.data().date || "",
      createdAt: doc.data().createdAt?.toDate() || new Date(0),
      revenue_amount: doc.data().revenue_amount || doc.data().revenue || 0
    }));
  } catch (error) {
    console.error('Error fetching revenue by month:', error);
    throw error;
  }
}