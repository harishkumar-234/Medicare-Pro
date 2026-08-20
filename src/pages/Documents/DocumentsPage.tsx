import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { HospitalDocument } from '../../types';
import { Modal } from '../../components/common/Modal';
import {
  Files,
  Search,
  Upload,
  FileText,
  Download,
  Trash2,
  Eye,
  FileCode,
  Image,
  Plus
} from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const { documents, patients, addDocument, deleteDocument } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedPreviewDoc, setSelectedPreviewDoc] = useState<HospitalDocument | null>(null);

  // New Doc Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>('Medical Reports');
  const [patId, setPatId] = useState(patients[0]?.id || '');
  const [fileType, setFileType] = useState<any>('PDF');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const pat = patients.find((p) => p.id === patId) || patients[0];

    addDocument({
      title,
      category,
      patientName: pat.name,
      patientId: pat.patientId,
      fileType,
      fileSize: '2.4 MB',
      uploadedBy: 'Clinical Records Vault'
    });

    setIsUploadModalOpen(false);
    setTitle('');
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.patientId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Medical Document Vault & Diagnostics Storage
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Encrypted cloud storage for scan reports, discharge summaries, insurance cards and identity proofs
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 rounded-xl shadow-sm self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search document title or patient ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs sm:text-sm outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="all">All Document Categories</option>
          <option value="Medical Reports">Medical Reports</option>
          <option value="Discharge Summary">Discharge Summary</option>
          <option value="Insurance">Insurance</option>
          <option value="ID Proof">ID Proof</option>
          <option value="Prescriptions">Prescriptions</option>
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 flex items-center justify-center font-bold text-xs">
                  {doc.fileType === 'PDF' ? <FileText className="w-5 h-5" /> : <Image className="w-5 h-5" />}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {doc.fileSize}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">{doc.title}</h3>
                <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">{doc.category}</span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-0.5">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{doc.patientName}</p>
                <p className="text-[11px] text-slate-400">{doc.patientId}</p>
                <p className="text-[10px] text-slate-400 pt-1">Uploaded: {doc.uploadDate}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedPreviewDoc(doc)}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button
                onClick={() => deleteDocument(doc.id)}
                className="text-slate-400 hover:text-rose-500 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <Modal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          title="Upload Medical Document"
          subtitle="Archive patient diagnostics or TPA documents into EHR"
        >
          <form onSubmit={handleUpload} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Document Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Brain MRI T1/T2 Axial Scan Report"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  <option value="Medical Reports">Medical Reports</option>
                  <option value="Discharge Summary">Discharge Summary</option>
                  <option value="Insurance">Insurance</option>
                  <option value="ID Proof">ID Proof</option>
                  <option value="Prescriptions">Prescriptions</option>
                </select>
              </div>

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
            </div>

            <div className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center space-y-2">
              <Upload className="w-8 h-8 mx-auto text-brand-500" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">Drag and drop file here or click to browse</p>
              <p className="text-slate-400 text-[11px]">Supports PDF, DICOM, JPG, PNG up to 25MB</p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button type="button" onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 text-slate-500">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 font-bold text-white bg-brand-600 rounded-xl">
                Store In Vault
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Preview Modal */}
      {selectedPreviewDoc && (
        <Modal
          isOpen={!!selectedPreviewDoc}
          onClose={() => setSelectedPreviewDoc(null)}
          title={`Document Preview — ${selectedPreviewDoc.title}`}
          subtitle={`${selectedPreviewDoc.category} for ${selectedPreviewDoc.patientName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-8 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center space-y-3">
              <FileText className="w-16 h-16 mx-auto text-brand-500" />
              <p className="font-bold text-base text-slate-900 dark:text-white">{selectedPreviewDoc.title}</p>
              <p className="text-slate-500">File Format: {selectedPreviewDoc.fileType} • Size: {selectedPreviewDoc.fileSize}</p>
              <p className="text-slate-400">Patient: {selectedPreviewDoc.patientName} ({selectedPreviewDoc.patientId})</p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedPreviewDoc(null)}
                className="px-4 py-2 bg-brand-600 text-white font-bold rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download Encrypted File
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
