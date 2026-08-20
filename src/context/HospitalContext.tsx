import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Patient,
  Doctor,
  Appointment,
  Prescription,
  LabTest,
  LabOrder,
  MedicineInventory,
  Invoice,
  Department,
  StaffMember,
  HospitalDocument,
  HospitalNotification
} from '../types';
import {
  initialPatients,
  initialDoctors,
  initialAppointments,
  initialPrescriptions,
  initialLabTests,
  initialLabOrders,
  initialMedicines,
  initialInvoices,
  initialDepartments,
  initialStaff,
  initialDocuments,
  initialNotifications
} from '../data/demoData';

interface HospitalContextType {
  // Data
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  labTests: LabTest[];
  labOrders: LabOrder[];
  medicines: MedicineInventory[];
  invoices: Invoice[];
  departments: Department[];
  staff: StaffMember[];
  documents: HospitalDocument[];
  notifications: HospitalNotification[];

  // Token Queue
  currentTokenNumber: number;
  currentServingDoctorId: string;
  nextPatientToken: () => void;
  prevPatientToken: () => void;
  callToken: (token: number) => void;
  holdToken: (token: number) => void;

  // Actions
  addPatient: (patient: Omit<Patient, 'id' | 'patientId' | 'registeredDate'>) => Patient;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;

  addAppointment: (appointment: Omit<Appointment, 'id' | 'appointmentNumber' | 'tokenNumber'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  cancelAppointment: (id: string) => void;

  addPrescription: (prescription: Omit<Prescription, 'id' | 'prescriptionNumber'>) => Prescription;

  addLabOrder: (order: Omit<LabOrder, 'id' | 'orderNumber'>) => LabOrder;
  updateLabOrderStatus: (id: string, status: LabOrder['sampleStatus'], resultValue?: string, remarks?: string) => void;

  addMedicine: (medicine: Omit<MedicineInventory, 'id'>) => MedicineInventory;
  updateMedicineStock: (id: string, deltaQuantity: number) => void;

  addInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => Invoice;
  payInvoice: (id: string, amount: number, method: Invoice['paymentMethod']) => void;

  addDocument: (doc: Omit<HospitalDocument, 'id' | 'uploadDate'>) => void;
  deleteDocument: (id: string) => void;

  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (title: string, message: string, type: HospitalNotification['type']) => void;

  // Toast System
  toasts: Array<{ id: string; title: string; message?: string; type: 'success' | 'error' | 'info' | 'warning' }>;
  showToast: (title: string, message?: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Helper for localStorage initial load
  const loadStored = <T,>(key: string, defaultVal: T): T => {
    const saved = localStorage.getItem(`medicare_${key}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultVal;
      }
    }
    return defaultVal;
  };

  const [patients, setPatients] = useState<Patient[]>(() => loadStored('patients', initialPatients));
  const [doctors, setDoctors] = useState<Doctor[]>(() => loadStored('doctors', initialDoctors));
  const [appointments, setAppointments] = useState<Appointment[]>(() => loadStored('appointments', initialAppointments));
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => loadStored('prescriptions', initialPrescriptions));
  const [labTests] = useState<LabTest[]>(() => loadStored('labTests', initialLabTests));
  const [labOrders, setLabOrders] = useState<LabOrder[]>(() => loadStored('labOrders', initialLabOrders));
  const [medicines, setMedicines] = useState<MedicineInventory[]>(() => loadStored('medicines', initialMedicines));
  const [invoices, setInvoices] = useState<Invoice[]>(() => loadStored('invoices', initialInvoices));
  const [departments] = useState<Department[]>(() => loadStored('departments', initialDepartments));
  const [staff, setStaff] = useState<StaffMember[]>(() => loadStored('staff', initialStaff));
  const [documents, setDocuments] = useState<HospitalDocument[]>(() => loadStored('documents', initialDocuments));
  const [notifications, setNotifications] = useState<HospitalNotification[]>(() => loadStored('notifications', initialNotifications));

  // Queue state
  const [currentTokenNumber, setCurrentTokenNumber] = useState<number>(24);
  const [currentServingDoctorId] = useState<string>('doc-3');

  // Toasts
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; message?: string; type: 'success' | 'error' | 'info' | 'warning' }>>([]);

  // Sync to local storage
  useEffect(() => { localStorage.setItem('medicare_patients', JSON.stringify(patients)); }, [patients]);
  useEffect(() => { localStorage.setItem('medicare_appointments', JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { localStorage.setItem('medicare_prescriptions', JSON.stringify(prescriptions)); }, [prescriptions]);
  useEffect(() => { localStorage.setItem('medicare_labOrders', JSON.stringify(labOrders)); }, [labOrders]);
  useEffect(() => { localStorage.setItem('medicare_medicines', JSON.stringify(medicines)); }, [medicines]);
  useEffect(() => { localStorage.setItem('medicare_invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('medicare_documents', JSON.stringify(documents)); }, [documents]);
  useEffect(() => { localStorage.setItem('medicare_notifications', JSON.stringify(notifications)); }, [notifications]);

  const showToast = (title: string, message?: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addNotification = (title: string, message: string, type: HospitalNotification['type'] = 'system') => {
    const notif: HospitalNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      type,
      read: false
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  // Queue actions
  const nextPatientToken = () => {
    const nextVal = currentTokenNumber + 1;
    setCurrentTokenNumber(nextVal);
    showToast('Next Token Called', `Now serving Token #${nextVal.toString().padStart(3, '0')}`, 'info');
    addNotification('Token Called', `Token #${nextVal.toString().padStart(3, '0')} called to Room 04`, 'appointment');
  };

  const prevPatientToken = () => {
    if (currentTokenNumber > 1) {
      setCurrentTokenNumber((prev) => prev - 1);
    }
  };

  const callToken = (token: number) => {
    setCurrentTokenNumber(token);
    showToast(`Token #${token.toString().padStart(3, '0')} Called`, 'Patient alerted to consultation room', 'info');
  };

  const holdToken = (token: number) => {
    showToast(`Token #${token.toString().padStart(3, '0')} on Hold`, 'Patient moved to waiting queue', 'warning');
  };

  // Patient Actions
  const addPatient = (newPatData: Omit<Patient, 'id' | 'patientId' | 'registeredDate'>): Patient => {
    const serial = (patients.length + 1).toString().padStart(4, '0');
    const newPat: Patient = {
      ...newPatData,
      id: `pat-${Date.now()}`,
      patientId: `MED-2026-${serial}`,
      registeredDate: new Date().toISOString().split('T')[0]
    };
    setPatients((prev) => [newPat, ...prev]);
    showToast('Patient Registered', `${newPat.name} (ID: ${newPat.patientId}) added successfully`, 'success');
    addNotification('New Patient Registration', `${newPat.name} enrolled in ${newPat.department}`, 'patient');
    return newPat;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast('Patient Updated', 'Medical record updated successfully', 'success');
  };

  const deletePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    showToast('Patient Removed', 'Patient record has been archived', 'info');
  };

  // Appointment Actions
  const addAppointment = (aptData: Omit<Appointment, 'id' | 'appointmentNumber' | 'tokenNumber'>): Appointment => {
    const nextToken = appointments.filter((a) => a.date === aptData.date).length + 1;
    const serial = Math.floor(100 + Math.random() * 900);
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      appointmentNumber: `APT-${aptData.date.replace(/-/g, '')}-${serial}`,
      tokenNumber: nextToken,
    };
    setAppointments((prev) => [newApt, ...prev]);
    showToast('Appointment Booked', `Booked for ${newApt.patientName} with ${newApt.doctorName} (Token #${nextToken})`, 'success');
    addNotification('New Appointment Scheduled', `${newApt.patientName} scheduled for ${newApt.date} at ${newApt.time}`, 'appointment');
    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    showToast('Status Updated', `Appointment status changed to "${status}"`, 'info');
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a)));
    showToast('Appointment Cancelled', 'Slot released successfully', 'warning');
  };

  // Prescription Actions
  const addPrescription = (rxData: Omit<Prescription, 'id' | 'prescriptionNumber'>): Prescription => {
    const serial = Math.floor(1000 + Math.random() * 9000);
    const newRx: Prescription = {
      ...rxData,
      id: `rx-${Date.now()}`,
      prescriptionNumber: `RX-2026-${serial}`
    };
    setPrescriptions((prev) => [newRx, ...prev]);
    showToast('Prescription Generated', `Prescription #${newRx.prescriptionNumber} created for ${newRx.patientName}`, 'success');
    addNotification('Digital Rx Issued', `Dr. ${newRx.doctorName} created prescription for ${newRx.patientName}`, 'appointment');
    return newRx;
  };

  // Lab Actions
  const addLabOrder = (orderData: Omit<LabOrder, 'id' | 'orderNumber'>): LabOrder => {
    const serial = Math.floor(1000 + Math.random() * 9000);
    const newOrder: LabOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `LAB-2026-${serial}`
    };
    setLabOrders((prev) => [newOrder, ...prev]);
    showToast('Lab Order Created', `${newOrder.testName} requested for ${newOrder.patientName}`, 'success');
    addNotification('New Lab Test Requisition', `${newOrder.testName} booked for ${newOrder.patientName}`, 'lab');
    return newOrder;
  };

  const updateLabOrderStatus = (id: string, status: LabOrder['sampleStatus'], resultValue?: string, remarks?: string) => {
    setLabOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, sampleStatus: status, resultValue: resultValue || ord.resultValue, remarks: remarks || ord.remarks } : ord))
    );
    showToast('Lab Order Updated', `Status updated to "${status}"`, 'info');
    if (status === 'Completed') {
      addNotification('Lab Report Ready', `Diagnostic report is ready for patient review`, 'lab');
    }
  };

  // Pharmacy Actions
  const addMedicine = (medData: Omit<MedicineInventory, 'id'>): MedicineInventory => {
    const newMed: MedicineInventory = {
      ...medData,
      id: `med-${Date.now()}`
    };
    setMedicines((prev) => [newMed, ...prev]);
    showToast('Medicine Added', `${newMed.name} added to pharmacy inventory`, 'success');
    return newMed;
  };

  const updateMedicineStock = (id: string, deltaQuantity: number) => {
    setMedicines((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newQty = Math.max(0, m.stockQuantity + deltaQuantity);
          return { ...m, stockQuantity: newQty };
        }
        return m;
      })
    );
    showToast('Stock Updated', 'Inventory stock adjusted', 'info');
  };

  // Invoice Actions
  const addInvoice = (invData: Omit<Invoice, 'id' | 'invoiceNumber'>): Invoice => {
    const serial = Math.floor(1000 + Math.random() * 9000);
    const newInv: Invoice = {
      ...invData,
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${serial}`
    };
    setInvoices((prev) => [newInv, ...prev]);
    showToast('Invoice Created', `Invoice #${newInv.invoiceNumber} generated for ${newInv.patientName}`, 'success');
    addNotification('New Invoice Generated', `Invoice ₹${newInv.grandTotal.toLocaleString('en-IN')} created for ${newInv.patientName}`, 'payment');
    return newInv;
  };

  const payInvoice = (id: string, amount: number, method: Invoice['paymentMethod']) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          const newPaid = inv.amountPaid + amount;
          const newBalance = Math.max(0, inv.grandTotal - newPaid);
          const newStatus: Invoice['paymentStatus'] = newBalance === 0 ? 'Paid' : 'Partially Paid';
          return {
            ...inv,
            amountPaid: newPaid,
            balanceDue: newBalance,
            paymentStatus: newStatus,
            paymentMethod: method
          };
        }
        return inv;
      })
    );
    showToast('Payment Recorded', `₹${amount.toLocaleString('en-IN')} recorded successfully via ${method}`, 'success');
    addNotification('Payment Received', `₹${amount.toLocaleString('en-IN')} received via ${method}`, 'payment');
  };

  // Document Actions
  const addDocument = (docData: Omit<HospitalDocument, 'id' | 'uploadDate'>) => {
    const newDoc: HospitalDocument = {
      ...docData,
      id: `docu-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setDocuments((prev) => [newDoc, ...prev]);
    showToast('Document Uploaded', `${newDoc.title} stored in medical vault`, 'success');
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    showToast('Document Removed', 'File deleted from vault', 'info');
  };

  // Notification actions
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notifications Marked Read', 'All notifications marked as read', 'info');
  };

  return (
    <HospitalContext.Provider
      value={{
        patients,
        doctors,
        appointments,
        prescriptions,
        labTests,
        labOrders,
        medicines,
        invoices,
        departments,
        staff,
        documents,
        notifications,
        currentTokenNumber,
        currentServingDoctorId,
        nextPatientToken,
        prevPatientToken,
        callToken,
        holdToken,
        addPatient,
        updatePatient,
        deletePatient,
        addAppointment,
        updateAppointmentStatus,
        cancelAppointment,
        addPrescription,
        addLabOrder,
        updateLabOrderStatus,
        addMedicine,
        updateMedicineStock,
        addInvoice,
        payInvoice,
        addDocument,
        deleteDocument,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
