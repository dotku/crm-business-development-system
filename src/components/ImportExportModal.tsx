import { Download, Upload, X } from 'lucide-react';
import { storage } from '../lib/storage';
import {
  downloadCSV,
  exportCompaniesToCSV,
  exportReferralsToCSV,
  parseCompaniesCSV,
  parseReferralsCSV,
} from '../lib/csv';

type ImportExportModalProps = {
  onClose: () => void;
  onDataChange: () => void;
  t: (key: string) => string;
};

export function ImportExportModal({ onClose, onDataChange, t }: ImportExportModalProps) {
  const handleExportCompanies = () => {
    const companies = storage.getCompanies();
    const csv = exportCompaniesToCSV(companies);
    downloadCSV(csv, 'companies.csv');
  };

  const handleExportReferrals = () => {
    const referrals = storage.getReferrals();
    const csv = exportReferralsToCSV(referrals);
    downloadCSV(csv, 'referrals.csv');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'companies' | 'referrals') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      if (type === 'companies') {
        const companies = parseCompaniesCSV(text);
        companies.forEach(company => {
          if (company.name && company.contact_name && company.contact_email) {
            storage.addCompany({
              name: company.name,
              contact_name: company.contact_name,
              contact_email: company.contact_email
            });
          }
        });
      } else {
        const referrals = parseReferralsCSV(text);
        referrals.forEach(referral => {
          if (referral.company_id && referral.referrer_name && referral.referrer_email) {
            storage.addReferral({
              company_id: referral.company_id,
              referrer_name: referral.referrer_name,
              referrer_email: referral.referrer_email,
              notes: referral.notes || ''
            });
          }
        });
      }
      onDataChange();
      onClose();
    } catch (error) {
      console.error('Error importing CSV:', error);
      alert(t('errors.importFailed'));
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t('importExport')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Export Section */}
          <div>
            <h3 className="font-medium mb-3">{t('export')}</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleExportCompanies}
                className="btn btn-secondary flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t('exportCompanies')}
              </button>
              <button
                onClick={handleExportReferrals}
                className="btn btn-secondary flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t('exportReferrals')}
              </button>
            </div>
          </div>

          {/* Import Section */}
          <div>
            <h3 className="font-medium mb-3">{t('import')}</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="btn btn-secondary flex items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                {t('importCompanies')}
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={e => handleFileUpload(e, 'companies')}
                />
              </label>
              <label className="btn btn-secondary flex items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                {t('importReferrals')}
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={e => handleFileUpload(e, 'referrals')}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
