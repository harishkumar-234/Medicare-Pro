import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { MedicineInventory } from '../../types';
import { Modal } from '../../components/common/Modal';
import {
  Pill,
  Search,
  Plus,
  AlertTriangle,
  Package,
  Layers,
  Calendar,
  IndianRupee,
  CheckCircle2,
  Trash2,
  RefreshCw
} from 'lucide-react';

export const PharmacyPage: React.FC = () => {
  const { medicines, addMedicine, updateMedicineStock } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Drug Form
  const [name, setName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [category, setCategory] = useState<any>('Antibiotics');
  const [batchNumber, setBatchNumber] = useState('BAT-2026-');
  const [stockQuantity, setStockQuantity] = useState(100);
  const [minThreshold, setMinThreshold] = useState(30);
  const [expiryDate, setExpiryDate] = useState('2027-12-31');
  const [supplier, setSupplier] = useState('Sun Pharma Laboratories');
  const [purchasePrice, setPurchasePrice] = useState(80);
  const [sellingPrice, setSellingPrice] = useState(115);
  const [rackLocation, setRackLocation] = useState('Rack A-05');
  const [unit, setUnit] = useState<any>('Tablets');

  // KPI calculations
  const totalMedicinesCount = medicines.length;
  const lowStockCount = medicines.filter((m) => m.stockQuantity > 0 && m.stockQuantity <= m.minThreshold).length;
  const outOfStockCount = medicines.filter((m) => m.stockQuantity === 0).length;
  const expiringSoonCount = medicines.filter((m) => m.expiryDate.startsWith('2026')).length;

  const handleCreateMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addMedicine({
      name,
      genericName: genericName || name,
      category,
      batchNumber,
      stockQuantity: Number(stockQuantity),
      minThreshold: Number(minThreshold),
      expiryDate,
      supplier,
      purchasePrice: Number(purchasePrice),
      sellingPrice: Number(sellingPrice),
      rackLocation,
      unit
    });

    setIsAddModalOpen(false);
    setName('');
  };

  const filteredMedicines = medicines.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.batchNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = categoryFilter === 'all' || m.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Pharmacy & Formulary Inventory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time drug stock tracking, batch-wise expiry monitoring, and purchase procurement
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Medicine</span>
        </button>
      </div>

      {/* 4 KPI Inventory Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card">
          <span className="text-xs text-slate-400 font-semibold">Total Formulary Drugs</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{totalMedicinesCount} SKUs</h3>
          <p className="text-[11px] text-brand-600 font-semibold mt-1">Across 6 medical categories</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card">
          <span className="text-xs text-amber-500 font-semibold">Low Stock Threshold</span>
          <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{lowStockCount} Items</h3>
          <p className="text-[11px] text-slate-400 mt-1">Below minimum reorder limit</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card">
          <span className="text-xs text-rose-500 font-semibold">Out of Stock</span>
          <h3 className="text-2xl font-extrabold text-rose-600 mt-1">{outOfStockCount} Items</h3>
          <p className="text-[11px] text-slate-400 mt-1">Urgent purchase order required</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card">
          <span className="text-xs text-indigo-500 font-semibold">Expiring in 90 Days</span>
          <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">{expiringSoonCount} Batches</h3>
          <p className="text-[11px] text-slate-400 mt-1">First-Expired-First-Out (FEFO)</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by brand name, generic formula or batch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="all">All Drug Categories</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Analgesics">Analgesics</option>
          <option value="Cardiovascular">Cardiovascular</option>
          <option value="Antidiabetic">Antidiabetic</option>
          <option value="Vitamins">Vitamins</option>
        </select>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-850/80 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Medicine Details</th>
                <th className="py-3.5 px-4">Batch & Location</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4">MRP Price</th>
                <th className="py-3.5 px-4 text-right">Quick Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredMedicines.map((med) => (
                <tr key={med.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{med.name}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs">{med.genericName}</p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{med.batchNumber}</p>
                    <span className="text-[10px] text-slate-400">{med.rackLocation}</span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          med.stockQuantity === 0
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : med.stockQuantity <= med.minThreshold
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {med.stockQuantity} {med.unit}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className={`font-semibold ${med.expiryDate.startsWith('2026') ? 'text-amber-500 font-bold' : 'text-slate-600 dark:text-slate-400'}`}>
                      {med.expiryDate}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-extrabold text-slate-900 dark:text-white">₹{med.sellingPrice.toFixed(2)}</p>
                    <span className="text-[10px] text-slate-400">Buy: ₹{med.purchasePrice.toFixed(2)}</span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => updateMedicineStock(med.id, 50)}
                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-lg text-xs font-bold transition-all"
                        title="Add 50 Units to Stock"
                      >
                        +50 Stock
                      </button>
                      <button
                        onClick={() => updateMedicineStock(med.id, -10)}
                        disabled={med.stockQuantity <= 0}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-lg text-xs font-semibold transition-all disabled:opacity-30"
                        title="Dispense 10 Units"
                      >
                        -10 Dispense
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Medicine Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Medicine To Inventory"
          subtitle="Record batch code, pricing and rack location"
        >
          <form onSubmit={handleCreateMedicine} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Azithral 500mg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Generic Name</label>
                <input
                  type="text"
                  placeholder="e.g. Azithromycin 500mg"
                  value={genericName}
                  onChange={(e) => setGenericName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Analgesics">Analgesics</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Antidiabetic">Antidiabetic</option>
                  <option value="Vitamins">Vitamins</option>
                  <option value="Respiratory">Respiratory</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Batch Number</label>
                <input
                  type="text"
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Initial Quantity</label>
                <input
                  type="number"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Selling Price MRP (₹)</label>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Rack Location</label>
                <input
                  type="text"
                  value={rackLocation}
                  onChange={(e) => setRackLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-xs text-slate-500">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-brand-600 rounded-xl">
                Add to Stock
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
