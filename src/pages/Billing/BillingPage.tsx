import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Invoice, InvoiceItem } from '../../types';
import { Modal } from '../../components/common/Modal';
import {
  Receipt,
  Search,
  Plus,
  Printer,
  Download,
  IndianRupee,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  Trash2,
  Share2
} from 'lucide-react';

export const BillingPage: React.FC = () => {
  const { invoices, patients, addInvoice, payInvoice } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [payModalInvoice, setPayModalInvoice] = useState<Invoice | null>(null);
  const [payAmount, setPayAmount] = useState(0);
  const [payMethod, setPayMethod] = useState<any>('UPI');

  // New Invoice State
  const [patId, setPatId] = useState(patients[0]?.id || '');
  const [discountPct, setDiscountPct] = useState(0);
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'it-1',
      description: 'Specialist Doctor Consultation Fee',
      category: 'Consultation',
      quantity: 1,
      unitPrice: 1200,
      total: 1200
    }
  ]);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `it-${Date.now()}`,
        description: 'Diagnostic Pathology Panel',
        category: 'Laboratory',
        quantity: 1,
        unitPrice: 650,
        total: 650
      }
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleItemChange = (id: string, field: 'description' | 'quantity' | 'unitPrice', val: any) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          const qty = field === 'quantity' ? Number(val) : it.quantity;
          const price = field === 'unitPrice' ? Number(val) : it.unitPrice;
          const desc = field === 'description' ? val : it.description;
          return {
            ...it,
            description: desc,
            quantity: qty,
            unitPrice: price,
            total: qty * price
          };
        }
        return it;
      })
    );
  };

  const subtotal = items.reduce((acc, it) => acc + it.total, 0);
  const discountAmount = (subtotal * discountPct) / 100;
  const taxable = subtotal - discountAmount;
  const taxAmount = (taxable * 18) / 100;
  const grandTotal = taxable + taxAmount;

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const pat = patients.find((p) => p.id === patId) || patients[0];

    const inv = addInvoice({
      patientId: pat.id,
      patientName: pat.name,
      patientPhone: pat.phone,
      patientAddress: pat.address,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      items,
      subtotal,
      discountPercentage: discountPct,
      discountAmount,
      taxPercentage: 18,
      taxAmount,
      grandTotal,
      amountPaid: grandTotal, // auto marked paid for quick demo
      balanceDue: 0,
      paymentMethod: 'UPI',
      paymentStatus: 'Paid'
    });

    setIsNewInvoiceOpen(false);
    setSelectedInvoice(inv);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payModalInvoice) return;
    payInvoice(payModalInvoice.id, Number(payAmount), payMethod);
    setPayModalInvoice(null);
  };

  const filteredInvoices = invoices.filter((i) =>
    i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Billing, Invoices & Revenue Settlement
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            GST compliant invoicing, multi-split itemization, UPI/Card payment receipts
          </p>
        </div>

        <button
          onClick={() => setIsNewInvoiceOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Tax Invoice</span>
        </button>
      </div>

      {/* Invoices List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden no-print">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search invoice number or patient name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs sm:text-sm outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-850/80 text-slate-500 font-bold uppercase text-[11px] border-b">
              <tr>
                <th className="py-3.5 px-4">Invoice # & Date</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Item Breakdown</th>
                <th className="py-3.5 px-4">Grand Total</th>
                <th className="py-3.5 px-4">Status & Mode</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-bold text-slate-900 dark:text-white">{inv.invoiceNumber}</p>
                    <p className="text-[11px] text-slate-400">{inv.date}</p>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{inv.patientName}</p>
                    <p className="text-[11px] text-slate-400">{inv.patientPhone}</p>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="text-slate-600 dark:text-slate-300">{inv.items.length} Line Items</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-xs">{inv.items.map((i) => i.description).join(', ')}</p>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-extrabold text-slate-900 dark:text-white">₹{inv.grandTotal.toLocaleString('en-IN')}</p>
                    {inv.balanceDue > 0 && <span className="text-[10px] text-rose-500 font-bold">Due: ₹{inv.balanceDue.toLocaleString('en-IN')}</span>}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          inv.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {inv.paymentStatus}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">{inv.paymentMethod}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {inv.paymentStatus !== 'Paid' && (
                        <button
                          onClick={() => {
                            setPayModalInvoice(inv);
                            setPayAmount(inv.balanceDue);
                          }}
                          className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold"
                        >
                          Collect ₹
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 rounded-lg text-xs font-bold"
                      >
                        Print Invoice
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Invoice Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title="Tax Invoice Document"
          subtitle="GST & Healthcare Compliant Hospital Invoice"
          maxWidth="4xl"
        >
          <div className="space-y-6">
            <div className="flex justify-end gap-2 no-print">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold"
              >
                <Printer className="w-4 h-4" /> Print Tax Invoice
              </button>
            </div>

            {/* Printable Paper */}
            <div id="printable-area" className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white space-y-6 text-xs">
              {/* Letterhead */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <div>
                  <h2 className="text-xl font-black">MEDICARE PRO HOSPITAL & RESEARCH CENTER</h2>
                  <p className="text-slate-500">GSTIN: 29AAAAA0000A1Z5 • NABH Accredited</p>
                  <p className="text-slate-400">100 Feet Ring Road, Bangalore - 560038 • Ph: +91 (80) 4122-8000</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-brand-600 dark:text-brand-400">{selectedInvoice.invoiceNumber}</span>
                  <p className="text-slate-500">Date: {selectedInvoice.date}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                    {selectedInvoice.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Patient Details */}
              <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <div>
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Billed To</p>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{selectedInvoice.patientName}</p>
                  <p className="text-slate-500">{selectedInvoice.patientPhone}</p>
                  <p className="text-slate-400">{selectedInvoice.patientAddress}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Payment Details</p>
                  <p className="font-bold">Mode: {selectedInvoice.paymentMethod}</p>
                  <p className="text-slate-500">Paid: ₹{selectedInvoice.amountPaid.toLocaleString('en-IN')}</p>
                  <p className="text-slate-500">Due: ₹{selectedInvoice.balanceDue.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 uppercase text-[10px] font-bold text-slate-600">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">Service Description</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Unit Rate (₹)</th>
                    <th className="p-2.5 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {selectedInvoice.items.map((it, idx) => (
                    <tr key={it.id}>
                      <td className="p-2.5">{idx + 1}</td>
                      <td className="p-2.5 font-bold">{it.description}</td>
                      <td className="p-2.5 text-slate-500">{it.category}</td>
                      <td className="p-2.5 text-center">{it.quantity}</td>
                      <td className="p-2.5 text-right">₹{it.unitPrice.toFixed(2)}</td>
                      <td className="p-2.5 text-right font-bold">₹{it.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Summary Calculation */}
              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="w-64 space-y-1.5">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span>₹{selectedInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  {selectedInvoice.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({selectedInvoice.discountPercentage}%):</span>
                      <span>-₹{selectedInvoice.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500">
                    <span>GST (18% Healthcare/Pharma):</span>
                    <span>₹{selectedInvoice.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-black text-base pt-2 border-t text-slate-900 dark:text-white">
                    <span>Grand Total:</span>
                    <span>₹{selectedInvoice.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t flex justify-between items-end text-[10px] text-slate-400">
                <p>This is a computer generated invoice and requires no physical signature.</p>
                <div className="text-right font-bold text-slate-600 dark:text-slate-300">
                  Authorized Signatory (Finance Dept)
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Invoice Modal */}
      {isNewInvoiceOpen && (
        <Modal
          isOpen={isNewInvoiceOpen}
          onClose={() => setIsNewInvoiceOpen(false)}
          title="Create Multi-Service Tax Invoice"
          subtitle="Combine OPD consultations, pharmacy meds, diagnostics & procedures"
          maxWidth="4xl"
        >
          <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Select Patient</label>
              <select
                value={patId}
                onChange={(e) => setPatId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>
                ))}
              </select>
            </div>

            {/* Items list */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-slate-500">Line Items</span>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="font-bold text-brand-600 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Service Line
                </button>
              </div>

              {items.map((it) => (
                <div key={it.id} className="grid grid-cols-12 gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl items-center">
                  <div className="col-span-5">
                    <input
                      type="text"
                      placeholder="Description"
                      value={it.description}
                      onChange={(e) => handleItemChange(it.id, 'description', e.target.value)}
                      className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border rounded-lg"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={it.quantity}
                      onChange={(e) => handleItemChange(it.id, 'quantity', e.target.value)}
                      className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border rounded-lg"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder="Unit Price"
                      value={it.unitPrice}
                      onChange={(e) => handleItemChange(it.id, 'unitPrice', e.target.value)}
                      className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border rounded-lg"
                    />
                  </div>
                  <div className="col-span-1 font-bold text-right">
                    ₹{it.total}
                  </div>
                  <div className="col-span-1 text-right">
                    {items.length > 1 && (
                      <button type="button" onClick={() => handleRemoveItem(it.id)} className="text-rose-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Total calculation strip */}
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-1 text-right">
              <p>Subtotal: <strong>₹{subtotal.toFixed(2)}</strong></p>
              <p>Tax (GST 18%): <strong>₹{taxAmount.toFixed(2)}</strong></p>
              <p className="text-sm font-black text-brand-600 dark:text-brand-400">
                Grand Total: ₹{grandTotal.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button type="button" onClick={() => setIsNewInvoiceOpen(false)} className="px-4 py-2 text-slate-500">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 font-bold text-white bg-brand-600 rounded-xl">
                Generate Invoice & Settle
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Collect Payment Modal */}
      {payModalInvoice && (
        <Modal
          isOpen={!!payModalInvoice}
          onClose={() => setPayModalInvoice(null)}
          title={`Collect Payment — ${payModalInvoice.invoiceNumber}`}
          subtitle={`Patient: ${payModalInvoice.patientName}`}
        >
          <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Amount to Collect (₹)</label>
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-base font-extrabold bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Payment Channel</label>
              <select
                value={payMethod}
                onChange={(e: any) => setPayMethod(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                <option value="UPI">UPI / QR Code Scan</option>
                <option value="Card">Debit / Credit Card POS</option>
                <option value="Cash">Cash Counter</option>
                <option value="Bank Transfer">NEFT / RTGS</option>
                <option value="Insurance">TPA Insurance Cashless</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button type="button" onClick={() => setPayModalInvoice(null)} className="px-4 py-2 text-slate-500">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 font-bold text-white bg-emerald-600 rounded-xl">
                Record Payment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
