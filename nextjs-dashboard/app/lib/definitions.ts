// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Company = {
  id: string;
  businessProfile?: BusinessProfile;
  businessType?: string;
  companyProfile?: CompanyProfile;
  owners?: Owner[];
  representatives?: Representative[];
  staffIds?: string[];
  chargesEnabled?: boolean;
  country?: string;
  defaultCurrency?: string;
  detailsSubmitted?: boolean;
  email?: string;
  payoutsEnabled?: boolean;
  branding?: Branding;
  tosAcceptance?: TosAcceptance;
  displayName?: string;
  timezone?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
 };

 export type  Department = {
  id: string;
  name: string;
  companyName: string;
  phone: string;

 }
 
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

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};
 
 export type BusinessProfile = {
  mcc?: string;
  name?: string;
  productDescription?: string;
  supportAddress?: Address;
  supportEmail?: string;
  supportPhone?: string;
  supportUrl?: string;
 };
 
 export type CompanyProfile = {
  name?: string;
  phone?: string;
  taxId?: string;
  registrationNumber?: string; // Optional business registration number
  address?: Address;
  businessType?: string;
  businessSize?: string;
  businessExperience?: string;
  businessPhone?: string;
  businessEmail?: string;
  estimatedAnnualQuota?: number;
  supportingDocumentsId?: string;//
 };
 
 
 export type Store = {
  id: string;
  name: string;
  companyId: string;
  registrationNumber?: string;
  taxRegistrationNumber?: string;
  address?: Address;
  managerName?: string;
  email?: string;
  phone?: string;
  mobileNumber?: string;
  faxNumber?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: Date;
  updatedAt?: Date;
 };

 export type Revenue = {
  id: string;
  month: string;
  revenue_amount: number;
  date: string;
  createdAt: Date;
};
 
 
 export type Owner = {
  id: string;
  address?: Address;
  dob?: Date;
  email?: string;
  firstName?: string;
  idNumber?: string;
  lastName?: string;
  phone?: string;
  identificationNumber?: string;
  verificationDocuments?: { [key: string]: string };
 };
 
 
 export type Representative = {
  id: string;
  address?: Address;
  dob?: Date;
  email?: string;
  firstName?: string;
  idNumber?: string;
  lastName?: string;
  phone?: string;
  relationshipExecutive?: string;
  relationship?: { [key: string]: string };
  identificationNumber?: string;
  verificationDocuments?: { [key: string]: string };
 };
 
 
 export type Address = {
  id?: string;
  unit?: string
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  primary?: boolean;
 }
 
 
 export type Branding = {
  iconUrl?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
 };
 
 
 export type TosAcceptance = {
  date?: Date;
  ip?: string;
  userAgent?: string;
 };
 
 
 export type User = {
  id: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  gender?: string;
  birthdate: Date;
  role: 'dealer' | 'store-manager' | 'business-manager' | 'store-clerk' | 'salesperson' | 'admin';
  accessLevel: string;
  department?: string;
  companyId: string;
  storeId?: string;
  storeName?: string;
  address?: Address;
  imageUrl?: string;
  companyProfile?: CompanyProfile;//
  status: 'active' | 'inactive' | 'waiting-approval' | 'approved' | 'rejected';
  balance?: number;
  userType?: 'customer' | 'staff'
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
 };
 