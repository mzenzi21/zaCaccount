import { db } from '../../config/firebase';
import { collection, getDocs, query, orderBy, limit, startAfter, where, doc, getDoc } from 'firebase/firestore';


type Invoice = {
    id: string;
    customer_id: string;
    amount: number;
    date: string;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: 'pending' | 'paid';
    createdAt?: Date;
};
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

// Combined flattened interface for table display
type InvoiceWithCustomer = {
  // From Invoice
  id: string;
  amount: number;
  date: string;
  status: string;
  customer_id: string;
  createdAt: Date;
  
  // From Customer
  customer_name: string;
  customer_email: string;
  //customer_image: string;
  customer_firstname: string;
  customer_lastname: string;
  customer_phone: string;
};


//Fetch all Invoice data by getInvoiceData
export async function getInvoiceData(): Promise<{
  invoices: Invoice[];
  //totalInvoice: number;
}> {
  try {
    const querySnapshot = await getDocs(collection(db, "Invoice"));
    const invoices = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        customer_id: data.customer_id || '',
        amount: data.amount || 0,
        createdAt: data.createdAt?.toDate() || new Date(0),
        date:data.date || "",
       status: data.status || "",
      };
    });

    
    
    return { invoices };
  } catch (error) {
    console.error('Failed to fetch Invoice data:', error);
    throw error; // Or return default values
  }
}
//================================END OF FUNCTION==============================

//Function for fetching Invoice by id
export async function getInvoiceById(id: string): Promise<Invoice | null> {
  try {
    const docRef = doc(db, "Invoice", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: id,
        customer_id: data.customer_id || '',
        amount: data.amount || data.invoice || 0,
        createdAt: data.createdAt?.toDate() || new Date(0),
        date:data.date || "",
       status: data.status || "",
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error('Error fetching Invoice by ID:', error);
    throw error; // Or return null
  }
}
//==================================END OF FUNCTION===============================


//Function to fetch data with a certain limit
export const ITEMS_PER_PAGE = 6;

export async function fetchInvoicesWithCustomers(
  searchQuery: string,
  currentPage: number,
): Promise<{ data: InvoiceWithCustomer[]; totalPages: number }> {
  try {
    const invoicesRef = collection(db, 'Invoice');
    
    // Get total count for pagination
    const countQuery = query(invoicesRef);
    const countSnapshot = await getDocs(countQuery);
    const totalPages = Math.ceil(countSnapshot.size / ITEMS_PER_PAGE);

    // Fetch paginated invoices
    let invoicesQuery = query(
      invoicesRef,
      orderBy('createdAt', 'desc'),
      limit(ITEMS_PER_PAGE)
    );

    // Handle pagination for pages after the first
    if (currentPage > 1) {
      const previousQuery = query(
        invoicesRef,
        orderBy('createdAt', 'desc'),
        limit((currentPage - 1) * ITEMS_PER_PAGE)
      );
      const previousSnapshot = await getDocs(previousQuery);
      const lastVisible = previousSnapshot.docs[previousSnapshot.docs.length - 1];
      
      invoicesQuery = query(
        invoicesRef,
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(ITEMS_PER_PAGE)
      );
    }

    const invoicesSnapshot = await getDocs(invoicesQuery);
    const invoices = invoicesSnapshot.docs.map(doc => ({
      id: doc.id,
      amount: doc.data().amount || 0,
      customer_id: doc.data().customer_id,
      date: doc.data().date || '',
      status: doc.data().status || '',
      createdAt: doc.data().createdAt?.toDate() || new Date()
    }));

    // Fetch related customers in batch
    const customerIds = [...new Set(invoices.map(invoice => invoice.customer_id))];
    const customers: Customer[] = [];

    for (const customerId of customerIds) {
      const customerDoc = await getDoc(doc(db, 'Customer', customerId));
      if (customerDoc.exists()) {
        const customerData = customerDoc.data();
        customers.push({
          id: customerDoc.id,
          name: `${customerData.firstname || ''} ${customerData.lastname || ''}`.trim(),
          email: customerData.email || '',
          //image_url: customerData.image_url || '/customers/default-avatar.png',
          firstname: customerData.firstname || '',
          lastname: customerData.lastname || '',
          date: customerData.date || '',
          phone: customerData.phone || ''
        });
      }
    }

    // Combine and flatten the data
    const flattenedData: InvoiceWithCustomer[] = invoices.map(invoice => {
      const customer = customers.find(c => c.id === invoice.customer_id) || {
        id: '',
        name: 'Unknown Customer',
        email: 'unknown@example.com',
        firstname: 'Unknown',
        lastname: 'Customer',
        phone: 'N/A',
        date: ''
      };
    
      return {
        // Invoice fields
        ...invoice,
        
        // Customer fields
        customer_name: customer.name,
        customer_email: customer.email,
        customer_firstname: customer.firstname,
        customer_lastname: customer.lastname,
        customer_phone: customer.phone
      };
    });
     // Add debug log before returning
     console.log('Final combined data with customers:', flattenedData);
    return {
      data: flattenedData,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
}
//======================END OF FUNCTION==================================