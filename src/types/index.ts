export type UserRole = 'admin' | 'doctor' | 'receptionist' | 'nurse' | 'pharmacist' | 'lab_technician';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department?: string;
  phone?: string;
}

export type AppointmentStatus = 'Confirmed' | 'Waiting' | 'In Consultation' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  appointmentNumber: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  department: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM AM/PM
  status: AppointmentStatus;
  tokenNumber: number;
  roomNumber: string;
  type: 'General Consultation' | 'Follow-up' | 'Emergency' | 'Routine Checkup';
  notes?: string;
  fee: number;
  isPaid: boolean;
}

export interface Patient {
  id: string;
  patientId: string; // e.g. "MED-2026-0042"
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  bloodGroup: string;
  address: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  assignedDoctorId: string;
  assignedDoctorName: string;
  department: string;
  lastVisit: string;
  status: 'Active' | 'Inpatient' | 'Discharged' | 'Critical';
  allergies: string[];
  medicalHistory: string[];
  currentMedications: string[];
  avatar: string;
  registeredDate: string;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  department: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  availability: string; // e.g. "Mon - Fri, 09:00 AM - 04:00 PM"
  roomNumber: string;
  avatar: string;
  phone: string;
  email: string;
  status: 'Available' | 'In Surgery' | 'On Leave' | 'Busy';
  todayAppointmentsCount: number;
}

export interface PrescriptionMedicine {
  id: string;
  name: string;
  dosage: string; // e.g. "500mg"
  frequency: string; // e.g. "1-0-1 (After Food)"
  duration: string; // e.g. "5 Days"
  instructions: string;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  department: string;
  date: string;
  diagnosis: string;
  symptoms: string[];
  medicines: PrescriptionMedicine[];
  vitalSigns: {
    bloodPressure: string;
    pulseRate: string;
    temperature: string;
    weight: string;
    spo2: string;
  };
  advice: string;
  followUpDate: string;
}

export interface LabTest {
  id: string;
  testCode: string;
  testName: string;
  category: 'Hematology' | 'Biochemistry' | 'Microbiology' | 'Radiology' | 'Pathology' | 'General';
  price: number;
  tatHours: number; // Turnaround time
  normalRange: string;
  unit: string;
  fastingRequired: boolean;
}

export interface LabOrder {
  id: string;
  orderNumber: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  testName: string;
  testCategory: string;
  date: string;
  sampleStatus: 'Sample Needed' | 'Sample Collected' | 'Processing' | 'Completed' | 'Delivered';
  resultValue?: string;
  normalRange?: string;
  unit?: string;
  remarks?: string;
  technicianName?: string;
  reportUrl?: string;
  price: number;
  paymentStatus: 'Paid' | 'Pending';
}

export interface MedicineInventory {
  id: string;
  name: string;
  genericName: string;
  category: 'Antibiotics' | 'Analgesics' | 'Cardiovascular' | 'Antidiabetic' | 'Vitamins' | 'Respiratory';
  batchNumber: string;
  stockQuantity: number;
  minThreshold: number;
  expiryDate: string;
  supplier: string;
  purchasePrice: number;
  sellingPrice: number;
  rackLocation: string;
  unit: 'Tablets' | 'Syrup' | 'Vials' | 'Capsules' | 'Ointment';
}

export interface InvoiceItem {
  id: string;
  description: string;
  category: 'Consultation' | 'Pharmacy' | 'Laboratory' | 'Room Charges' | 'Procedure' | 'Other';
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientAddress: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  taxPercentage: number;
  taxAmount: number;
  grandTotal: number;
  amountPaid: number;
  balanceDue: number;
  paymentMethod: 'Cash' | 'Card' | 'UPI' | 'Bank Transfer' | 'Insurance';
  paymentStatus: 'Paid' | 'Partially Paid' | 'Unpaid';
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headOfDepartment: string;
  headAvatar: string;
  doctorsCount: number;
  staffCount: number;
  activePatients: number;
  totalBeds: number;
  occupiedBeds: number;
  description: string;
  monthlyRevenue: number;
  iconName: string;
}

export interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Receptionist' | 'Pharmacist' | 'Lab Technician' | 'Accountant' | 'Administrator';
  department: string;
  phone: string;
  email: string;
  shift: 'Morning (8AM - 4PM)' | 'Evening (4PM - 12AM)' | 'Night (12AM - 8AM)' | 'General (9AM - 5PM)';
  attendanceStatus: 'Present' | 'Late' | 'On Leave' | 'Absent';
  joinDate: string;
  salary: number;
  avatar: string;
}

export interface HospitalDocument {
  id: string;
  title: string;
  category: 'Patient Documents' | 'Medical Reports' | 'Insurance' | 'ID Proof' | 'Prescriptions' | 'Discharge Summary';
  patientName: string;
  patientId: string;
  fileType: 'PDF' | 'DOCX' | 'JPG' | 'PNG';
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
}

export interface HospitalNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'appointment' | 'patient' | 'payment' | 'lab' | 'pharmacy' | 'system';
  read: boolean;
}
