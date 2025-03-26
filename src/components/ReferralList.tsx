import { Users, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import type { Referral } from '../lib/storage';
import { storage } from '../lib/storage';

type ReferralListProps = {
  referrals: Referral[];
  onDelete: (id: string) => void;
  t: (key: string) => string;
};

export function ReferralList({ referrals, onDelete, t }: ReferralListProps) {
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(t('confirmDeleteReferral'))) {
      try {
        storage.deleteReferral(id);
        onDelete(id);
        toast.success(t('success.referralDeleted'));
      } catch {
        toast.error(t('errors.deleteFailed'));
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Users className="w-5 sm:w-6 h-5 sm:h-6 text-gray-500" />
        <h2 className="text-lg sm:text-xl font-semibold">{t('recentReferrals')}</h2>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {referrals.map((referral) => (
          <div key={referral.id} className="border rounded-lg p-3 sm:p-4 group">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
              <div>
                <h3 className="font-medium text-base sm:text-lg">{referral.referrer_name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{referral.referrer_email}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleDelete(referral.id, e)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title={t('deleteReferral')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <span className={`px-2 py-1 rounded-full text-xs w-fit ${
                  referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  referral.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {t(`status.${referral.status}`)}
                </span>
              </div>
            </div>
            {referral.notes && (
              <p className="text-sm text-gray-600 mt-2 sm:mt-3">{referral.notes}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              {t('added')} {format(new Date(referral.created_at), 'MMM d, yyyy')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}