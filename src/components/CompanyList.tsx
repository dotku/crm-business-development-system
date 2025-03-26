import { Building2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Company } from '../lib/storage';

type CompanyListProps = {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
  t: (key: string) => string;
};

export function CompanyList({ companies, onSelectCompany, t }: CompanyListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Building2 className="w-5 sm:w-6 h-5 sm:h-6 text-gray-500" />
        <h2 className="text-lg sm:text-xl font-semibold">{t('companies')}</h2>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="border rounded-lg p-3 sm:p-4 hover:border-blue-500 active:bg-blue-50 cursor-pointer transition-colors"
            onClick={() => onSelectCompany(company)}
          >
            <h3 className="font-medium text-base sm:text-lg">{company.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{company.contact_name}</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mt-2">
              <span className="text-xs text-gray-400 order-2 sm:order-1">
                {t('added')} {format(new Date(company.created_at), 'MMM d, yyyy')}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs w-fit order-1 sm:order-2 ${
                company.status === 'new' ? 'bg-green-100 text-green-800' :
                company.status === 'active' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {t(`status.${company.status}`)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}