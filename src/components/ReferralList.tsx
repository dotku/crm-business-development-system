import React from 'react';
import { Users } from 'lucide-react';
import { format } from 'date-fns';
import type { Referral } from '../lib/storage';

type ReferralListProps = {
  referrals: Referral[];
  t: (key: string) => string;
};

export function ReferralList({ referrals, t }: ReferralListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-gray-500" />
        <h2 className="text-xl font-semibold">{t('recentReferrals')}</h2>
      </div>
      <div className="space-y-4">
        {referrals.map((referral) => (
          <div key={referral.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{referral.referrer_name}</h3>
                <p className="text-sm text-gray-500">{referral.referrer_email}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                referral.status === 'approved' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {t(`status.${referral.status}`)}
              </span>
            </div>
            {referral.notes && (
              <p className="text-sm text-gray-600 mt-2">{referral.notes}</p>
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