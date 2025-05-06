import { db } from '../../config/firebase';
import { collection, doc, getDoc,getDocs, QuerySnapshot } from 'firebase/firestore';

//Function for fetching all customer data
type Customer = {
  id: string;
  date: string;
  name: string;
  email: string;
  firstname: string;
  lastname: string;
  middlename?: string;
  phone: string;
  createdAt?: Date;
};
  
  export async function getCustomerData(): Promise<{ customers: Customer[];}>
  {
    try {
      const querySnapshot = await getDocs(collection(db, "Customer"));
      const customers = querySnapshot.docs.map(doc => {
      const data = doc.data();
  
      return {
          id: data.id,
          name: `${data.firstname || ''} ${data.lastname || ''}`.trim(),
          email: data.email || '',
          //image_url: customerData.image_url || '/customers/default-avatar.png',
          firstname: data.firstname || '',
          lastname: data.lastname || '',
          date: data.date || '',
          phone: data.phone || ''
      }
      });
       console.log(customers);
      return {customers};
      
      
  
    } catch (error) {
      console.error('Failed to fetch revenue data:', error);
      throw error; // Or return default values
    }
     
  }

  //Function for fetching customer by id
  export async function getCustomerById(id: string): Promise<Customer | null> {
    try {
      const docRef = doc(db, "Customer", id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: data.id,
          name: `${data.firstname || ''} ${data.lastname || ''}`.trim(),
          email: data.email || '',
          //image_url: customerData.image_url || '/customers/default-avatar.png',
          firstname: data.firstname || '',
          lastname: data.lastname || '',
          date: data.date || '',
          phone: data.phone || ''
          
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